import styles from "./styles.module.css";
import * as React from "react";

export default function Location(props:any) {
    return(
        <>
            <p><span><i className='bx bxs-map'></i>{props.loc}</span></p>
        </>
    );
}
