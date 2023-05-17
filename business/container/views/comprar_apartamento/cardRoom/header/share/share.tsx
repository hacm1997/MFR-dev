import * as React from "react";
import styles from "./styles.module.css";

export default function Share(props:any) {
    return(
        <>
            <a className={styles.share} href={props.href}><i className={'bx bxs-share '}></i>{props.translate('section1.share')}</a>
        </>
    )
}
