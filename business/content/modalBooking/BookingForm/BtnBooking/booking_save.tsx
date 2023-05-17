import styles from "./styles.module.css"
import React, {useContext, useEffect, useState} from "react";
import Link from "next/link";
import Moment from "moment";
import { postBooking } from './../../../../../service/api/api';
import {Cookies} from "react-cookie";
import config from "../../../../../infrastructure/config";
import Swal from "sweetalert2";
import {EventAuthContext} from "../../../contexts/eventAuthContext";
import useTranslation from "next-translate/useTranslation";

export default function SaveBooking(props: any) {
    const {t, lang} = useTranslation();
    const {getDollar} = useContext(EventAuthContext); //Precio del Dolar para convertir según currency
    const currentTime = Moment().local().format('THH:mm:ss')
    const dateStart = (Moment(props.dates[0],'DD/MM/YYYY').local().format('YYYY-MM-DD'))
    const dateEnd = (Moment(props.dates[1],'DD/MM/YYYY').local().format('YYYY-MM-DD'))
    const finalDateStart = dateStart+currentTime+".000Z"
    const finalDateEnd = dateEnd+currentTime+".000Z"

    const initSaveBooking = {
        tenant: config.TENANT as string,
        user: {
            dni: Date.now().toString().slice(3, 12),
            name: props.nameIn,
            email: props.emailIn,
            cellphone: props.phoneIn,
            details: {
                code: "comment",
                value: "comentario",
                dni: props.dniIn,
                description: props.descriptionIn
            }
        },
        booking: {
            status: 'pending',
            code: '',
            details: {
                name: props.titleIn,
                dni: props.dniIn,
                location: props.loc.toString(),
                time_cron: 30, //cron
                adults: props.adultosIn,
                kids: props.ninosIn,
                description: props.descriptionIn,
                // id_google_calendar: props.idCalendar,
                price: props.priceIn,
                api_key: config.API_KEY as string,
                calendar_id: config.CALENDAR_ID as string,
            },
            resource_code: props.codeIn,
            start_date: finalDateStart,
            end_date: finalDateEnd
        }
    };
    // console.log("initSaveBooking => ", initSaveBooking)
    const handleSubmit = async (ev:any) => {

        var dt = initSaveBooking;

        postBooking(dt).then((res:any) => {
            if(res.status === 200){
                console.log("¡Success! code status: "+res.status);
                console.log(res);
                props.gaEventTracker('Realizó la reserva '+props.titleIn);
                const cookies = new Cookies();
                if (cookies.get('bookingCode') === undefined || cookies.get('db') === undefined) {
                    cookies.set('bookingCode', res.data.data.booking.code, {path: '/'});
                    cookies.set('codeResource', props.codeIn, {path: '/'});
                    cookies.set('userDni', props.dniIn, {path: '/'});
                    cookies.set('startDate', finalDateStart, {path: '/'});
                    cookies.set('endDate', finalDateEnd, {path: '/'});
                    cookies.set('nameUser', props.nameIn, {path: '/'});
                    cookies.set('emailUser', props.emailIn, {path: '/'});
                }

                Swal.fire(
                    {
                        title: `!${props.translate('form_submit.alert.fixed')}!`,
                        text: `${props.translate('form_submit.alert.fixed_msn')}`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }
                ).then((result) => {
                    if (result.isConfirmed && lang === 'en') {
                        window.location.replace(`/en/payment?name=${props.nameIn}&dni=${initSaveBooking.user.dni}&currency=USD`);
                    }else{
                        window.location.replace(`/payment?name=${props.nameIn}&dni=${initSaveBooking.user.dni}&currency=${props.currency}`);
                    }
                })
                window.setTimeout(function() {
                    if(lang === 'en'){
                        window.location.replace(`/en/payment?name=${props.nameIn}&dni=${initSaveBooking.user.dni}&currency=USD`);
                    }else{
                        window.location.replace(`/payment?name=${props.nameIn}&dni=${initSaveBooking.user.dni}&currency=${props.currency}`);
                    }

                }, 7000);
            }
        }).catch((err:any) => {
            console.log(err);

            Swal.fire(
                {
                    title: `!${props.translate('form_submit.alert.error')}!`,
                    text: `${props.translate('form_submit.alert.error_msn')}`,
                    icon: 'error'
                }
            )

        })
        console.log(dt);
        ev.preventDefault();

    };

    return (
        <>

            <div className={styles.btn_save}>
                <button onClick={handleSubmit}>{props.translate('section1.button')}</button>
            </div>

        </>
    )
}
