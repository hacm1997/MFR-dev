import {useRouter} from "next/router";
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import styles from "../styles.module.css";
import {useCookies} from "react-cookie";
import {createPayment} from "../../../../../service/api/api";
import {formatNumber} from "../../../../../service/service";
import config from "../../../../../infrastructure/config";
import {EventAuthContext} from "../../../../content/contexts/eventAuthContext";
import NotifierEmailBooked from "../../../../../service/notifier";
import useTranslation from "next-translate/useTranslation";

export default function ConfirmationPage(props:any) {
    const {t, lang} = useTranslation('confirmation');
    const router = useRouter();
    const {getDollar} = useContext(EventAuthContext);
    const [dataEpayco, setDataEpayco] = useState<Array<any>>([]);
    const [statusPay, setStatusPay] = useState('');
    const [nameButton, setNameButton] = useState<any>(t('btn_end'));
    const [displayBtn, setDisplayBtn] = useState(true);
    const [displayAlert, setDisplayAlert] = useState(true);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [method, setMethod] = useState('');
    const [factureData, setFactureData] = useState({
        reference: '',
        booking_code: '',
        status: '',
        details: {},
        total: '',
    });
    const search = router.query.ref_payco;

    const path = `https://secure.epayco.co/validation/v1/reference/${search}`;

    const dataPayment = {
        tenant: config.TENANT as string,
        bookingCode: cookies.bookingCode,
        resourceCode: cookies.codeResource,
        userDni: cookies.userDni,
        method: method,
        startDate: cookies.startDate,
        endDate: cookies.endDate,
        facture: {
            reference: factureData.reference,
            booking_code: factureData.booking_code,
            status: factureData.status,
            details: factureData.details,
            total: parseInt(factureData.total)
        }
    }

    const refResponse = () => {
        axios
            .get(path)
            .then(function (response) {

                setDataEpayco([response.data.data])

                setMethod(response.data.data.x_type_payment);
                if(response.data.data.x_response === "Aceptada" || response.data.data.x_response === "Acept") {
                    setFactureData({
                        ...factureData,
                        reference: `${search}`,
                        booking_code: cookies.bookingCode,
                        status: 'paid',
                        details: {dateTransaction: response.data.data.x_fecha_transaccion, epaycoResponse: response.data.data.x_response, reason:response.data.text_response, id_facture: response.data.data.x_id_factura, method:response.data.data.x_type_payment, status:response.data.data.x_response, name:response.data.data.x_description},
                        total: response.data.data.x_amount_ok
                    })
                    setStatusPay('paid');
                    setNameButton(t('btn_end'));
                    setDisplayBtn(true);
                }else if(response.data.data.x_response === "Pendiente"){

                    setFactureData({
                        ...factureData,
                        reference: `${search}`,
                        booking_code: cookies.bookingCode,
                        status: 'pending',
                        details: {dateTransaction: response.data.data.x_fecha_transaccion, epaycoResponse: response.data.data.x_response, reason:response.data.text_response, id_facture: response.data.data.x_id_factura, method:response.data.data.x_type_payment, status:response.data.data.x_response, name:response.data.data.x_description},
                        total: response.data.data.x_amount_ok
                    })
                    setStatusPay('pending');
                    setNameButton(t('btn_end'));
                    setDisplayBtn(true);
                }else{
                    setFactureData({
                        ...factureData,
                        reference: `${search}`,
                        booking_code: cookies.bookingCode,
                        status: 'canceled',
                        details: {dateTransaction: response.data.data.x_fecha_transaccion, epaycoResponse: response.data.data.x_response, reason:response.data.text_response, id_facture: response.data.data.x_id_factura, method:response.data.data.x_type_payment, status:response.data.data.x_response, name:response.data.data.x_description},
                        total: response.data.data.x_amount_ok
                    })
                    setNameButton(t('bnt_again'));
                    setDisplayBtn(false);
                }

            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const savePayment = () => {
        console.log("sending data...");
        createPayment(dataPayment).then((res:any) => {
            if(res.status === 200){
                console.log("¡Payment Success! code status: "+res.status);
                NotifierEmailBooked(dataPayment, search, cookies.bookingCode, cookies.emailUser, t);
            }else{
                console.log("Error! payment no fixed!")
            }
        }).catch(function (e){
            NotifierEmailBooked(dataPayment, search, cookies.bookingCode, cookies.emailUser, t);
            console.log(e)
        });
    }

    const finish = () => {
        if(statusPay === "paid" || statusPay === "pending"){
            props.gaEventTracker('Finalizó pago apto: '+dataPayment.resourceCode)
            removeCookie('bookingCode')
            removeCookie('codeResource')
            removeCookie('userDni')
            window.location.replace('/')
        }else{
            window.location.replace(`/payment?name=${cookies.nameUser}&dni=${cookies.userDni}`);
        }
    }

    const out = () => {
        setDisplayAlert(false);
    }
    const out_end = () => {
        props.gaEventTracker('Finalizó pago apto: '+dataPayment.resourceCode)
        removeCookie('bookingCode');
        removeCookie('codeResource');
        removeCookie('userDni');
        window.location.replace('/');
    }

    useEffect(() => {
        refResponse();
    }, [dataPayment.method]);

    useEffect(()=>{
        if(dataPayment.method){
            savePayment()
        }
    });

    const print = () =>{
        props.gaEventTracker('Descargó recibo: '+dataPayment.resourceCode)
        window.print()
    }

    const reload = () =>{
        window.location.href = window.location.href;
    }

    const content = dataEpayco.map((item:any, index:any) => {

        return(
            <div className={styles.detailsConfirm} key={index}>

                <div>
                    <p># {t('reference')}</p>
                </div>
                <div>
                    <strong>{search}</strong>
                </div>

                <div>
                    <p>{t('facture')}</p>
                </div>
                <div>
                    <strong>{item.x_id_factura}</strong>
                </div>

                <div>
                    <p>{t('date')}</p>
                </div>
                <div>
                    <strong>{item.x_transaction_date}</strong>
                </div>

                <div>
                    <p>{t('commerce')}</p>
                </div>
                <div>
                    <strong>Inmobiliaria MFR</strong>
                </div>

                <div>
                    <p>{t('product')}</p>
                </div>
                <div>
                    <strong>{item.x_description}</strong>
                </div>

                <div>
                    <p>{t('total')}</p>
                </div>
                <div>
                    <strong>${formatNumber(item.x_amount_ok)}</strong>
                </div>

                <div>
                    <p>{t('currency')}</p>
                </div>
                <div>
                    <strong>{item.x_currency_code}</strong>
                </div>

                <div>
                    <p>{t('method')}</p>
                </div>
                <div>
                    <strong>{item.x_type_payment}</strong>
                </div>

                <div>
                    <p>{t('status')}</p>
                </div>
                <div>
                    {item.x_response === "Aceptada" ?
                        <strong style={{color:'green', fontWeight:'bold'}}>{t('list_status.accept')}</strong>
                        :item.x_response === "Fallida" || item.x_response === "Rechazada" ?
                            <strong style={{color:'red', fontWeight:'bold'}}>{`${t('list_status.fail')}/${t('list_status.rejected')}`}</strong>
                            :<strong style={{color:'yellow', fontWeight:'bold'}}>{t('list_status.pending')}</strong>}
                </div>

            </div>
        )
    })

    return (
        <>
            <div className={styles.title_confirmation}>
                <p>{t('summary')}</p>
            </div>

            <div className={styles.containerConfirm}>
                <div>
                    <div className={styles.contentConfirm}>
                        {content}
                    </div>
                </div>
            </div>

            <div className={styles.btn_confirmation}>
                <button onClick={finish}>{nameButton}</button>
                <button onClick={print}>{t('download')}</button>
                <button hidden={displayBtn} onClick={out}>Salir</button>
            </div>
            <hr/>
            <div className={styles.btn_confirmation2}>
                <div>
                    <p style={{textAlign: "center", fontWeight:"bold", width: "400px"}}>
                        {t('msn_info')}
                    </p>
                    <div className={styles.aling_btn}>
                        <button type="button" onClick={reload}>{t('reload')}</button>
                    </div>
                </div>
            </div>

            <div className="alert alert-warning" role="alert" hidden={displayAlert}>
                <p style={{textAlign: 'center'}}>
                    {t('alert1')}<br/>
                    {t('alert1_1')}
                </p>
                <button onClick={out_end} type="button">{t('finish')}</button>
            </div>

        </>
    )
}
