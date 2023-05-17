import styles from "./styles.module.css"
import FormReserv from "./BookingForm/form/form_reserv";
import * as React from "react";

export default function ModalBooking(props: any) {

    return (
        <>

            <FormReserv
                translate={props.translate}
                code={props.code}
                adultos={props.adultos}
                ninos={props.ninos}
                title={props.title}
                price={props.price}
                date={props.date}
                loc={props.loc}
                currency={props.currency}
                gaEventTracker={props.gaEventTracker}
                accessToken={props.accessToken}
                //idCalendar={props.idCalendar}
            />

        </>
    )
}
