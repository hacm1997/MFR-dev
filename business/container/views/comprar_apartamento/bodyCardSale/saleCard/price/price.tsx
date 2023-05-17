import styles from "./styles.module.css";
import * as React from "react";
import {formatNumber} from "../../../../../../../service/service";
import {useContext} from "react";
import {EventAuthContext} from "../../../../../../content/contexts/eventAuthContext";

export default function Price(props: any) {
    const {getDollar, currency} = useContext(EventAuthContext);
    return(
        <>
            <p className={styles.valor}>{props.translate('for_buy.form.price.text')}</p>
            <p className={styles.precio}>$ {currency === 'USD' || props.lang === 'en' ? `${Math.round(Number(Number(props.price))/Number(getDollar))} USD`: `${formatNumber(props.price)} COP`}</p>
            <span className={styles.condition}>{props.translate('for_buy.form.price.terms')}*</span>
        </>
    )
}
