import {useRouter} from "next/router";
import Script from "next/script";
import React, {useCallback, useContext, useEffect, useState} from 'react';
import { useEpayco } from 'react-epayco';
import {getBooking, getResource} from "../../../../service/api/api";
import styles from "./styles.module.css"
import {useCookies} from "react-cookie";
import {formatNumber} from "../../../../service/service";
import config from "../../../../infrastructure/config";
import {EventAuthContext} from "../../../content/contexts/eventAuthContext";
import useTranslation from "next-translate/useTranslation";

export default function Payments(props:any) {
    const router = useRouter();
    const {getDollar} = useContext(EventAuthContext);
    const [dataApto, setDataApto] = React.useState('');
    const [chars, setChars] = React.useState([]);
    const [cookies, setCookie] = useCookies();
    const [booking, setBooking] = useState<any>([]);
    const {t, lang} = useTranslation('payment');
    //const [nameIn, setName] = React.useState([]);

    const {
        query: { name, dni, currency },
    } = router as any

    const wsp_link = `https://api.whatsapp.com/send?phone=573158805685&text=Hola%20MFR.%0AMi%20nombre%20es%20${name}%20y%20vengo%20de%20su%20sitio%20web📲%0AEstoy%20interesado%20en%20reservar%20el%20apartamento%20${dataApto}431%2C%20y%20requiero%20información🙌`

    function getResoruceCode(code: string) {
        getResource(code)
            .then((response: any) => {
                setDataApto(
                    response.data.data[0].name,
                );
                setChars(response.data.data[0].characteristics)

            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

    function getBookingDetail(code: string, startDate: string, dni: string){
        getBooking(code, startDate, dni)
            .then((response: any) => {
                setBooking(
                    JSON.parse(response.data.data[0]._props.bookingDetails),
                );
            })
            .catch((e: Error) => {
                console.log(e);
            });
    }

     const { epayco }:any = useEpayco({
        key: '491d6a0b6e992cf924edd8d3d088aff1',
        test: true,

    });

    const handlePay = useCallback(() => {
        props.gaEventTracker("pagar reser. apt "+dataApto);
        const data = {
            name: dataApto,
            description: dataApto,
            amount: Number(booking.price),
            currency: currency?.toString().toLowerCase(),
            country: lang === 'en' ? "us" : "co",
            test: "true",
            external: "false",
            response: lang === 'en' ? `${config.DOMAIN_URL}/en/payment/confirmation` :`${config.DOMAIN_URL}/payment/confirmation`,
            confirmation:  lang === 'en' ? `${config.DOMAIN_URL}/en/payment/confirmation` :`${config.DOMAIN_URL}/payment/confirmation`,
            methodconfirmation: "get"
        };
        epayco.open(data)

    }, [epayco]);

    React.useEffect(() => {

        getResoruceCode(cookies.codeResource)
        // @ts-ignore
        getBookingDetail(cookies.bookingCode, cookies.startDate, dni)

    }, [dni]);

    return (
        <>
        <section className={styles.content}>
            <div className={styles.title}>
                <p>{t('title')}</p>
            </div>

            <div className={styles.table+ " table"}>
                <table>
                    <thead>
                        <tr>
                            <th>{t('name_apto')}</th>
                            <th>{t('price')}</th>
                            <th>{t('consumer_name')}</th>
                            <th>{t('dni')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{dataApto}</td>
                            {/* @ts-ignore}*/}
                            <td>{formatNumber(booking.price)} {" "}{currency}</td>
                            <td>{name}</td>
                            <td>{booking.dni}</td>
                        </tr>
                    </tbody>
                </table>
                <button onClick={handlePay}>{t('button')}</button>
            </div>

        </section>
        <a
            href={wsp_link}
            target="_blank"
            rel="noreferrer"
            title="Whatsapp"
            className={styles.float}
        >
            <i className='bx bxl-whatsapp'></i>
        </a>

        </>
    )
}
