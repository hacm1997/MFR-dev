import styles from "./styles.module.css";
import * as React from "react";

export default function Stars(props:any) {
    return(
        <>
            <p><span><i className='bx bxs-star'></i></span> {props.ratio}</p>
        </>
    );
}
