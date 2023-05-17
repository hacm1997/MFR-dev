import styles from "./styles.module.css";
import * as React from "react";

export default function Share(props:any) {
    return(
        <>
            <a href="business/container/views/vista_apartamento/vista_apartamento#"><span><i
                className='bx bxs-share'></i>{props.text}</span></a>
        </>
    );
}
