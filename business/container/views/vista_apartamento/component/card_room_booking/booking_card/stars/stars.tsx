import styles from "../styles.module.css";
import * as React from "react";

export default function Stars(props:any) {
    return(
        <>
            <p className={styles.calificacion}><i className='bx bxs-star'></i>{props.ratio}</p>
        </>
    );
}
