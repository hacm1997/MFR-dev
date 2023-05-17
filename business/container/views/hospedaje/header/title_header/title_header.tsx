import styles from './styles.module.css';
import * as React from "react";

export default function TitleHeader(props:any) {

    return (
        <>
            <h1 className={styles.title}>{props.translate('title.pt1')} <strong>{props.translate('title.pt2')} <span>{props.translate('title.pt3')}</span> {props.translate('title.pt4')} </strong> {props.translate('title.pt5')}</h1>
        </>
    )
}
