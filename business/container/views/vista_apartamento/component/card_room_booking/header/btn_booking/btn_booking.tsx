import styles from "./styles.module.css";
import * as React from "react";

export default function BtnBooking(props:any) {

    return(
        <>
            <a href="#booking" title="Booking"><button className={"btn " + styles.btn_reservar}>{props.btn_text}</button></a>
        </>
    );
}
