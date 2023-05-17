import styles from "./styles.module.css";
import * as React from "react";

export default function Title(props:any) {
    return(
        <>
            <div className={styles.h1}>
                <h1>{props.title}</h1>
            </div>

        </>
    );
}
