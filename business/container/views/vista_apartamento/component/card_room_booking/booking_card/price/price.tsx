import styles from "./styles.module.css";
import * as React from "react";
import {useContext, useEffect} from "react";
import {EventAuthContext} from "../../../../../../../content/contexts/eventAuthContext";
import {formatNumber} from "../../../../../../../../service/service";

export default function Price(props:any) {
    const {getDollar, currency} = useContext(EventAuthContext);

    useEffect(()=>{
        props.setRealPrice(currency === 'USD' ? `${Math.round(Number(props.defaultPrice !== 'NaN' ? props.defaultPrice :Number(props.noBlanckPrice))/Number(getDollar))}`: `${props.price}`)
    }, [currency])
    useEffect(()=>{
        props.setRealPrice(props.lang === 'en' ? `${Math.round(Number(props.defaultPrice !== 'NaN' ? props.defaultPrice :Number(props.noBlanckPrice))/Number(getDollar))}`: `${props.price}`)
    })
    return(
        <>
            <p><span>{currency === 'USD' || props.lang === 'en' ? `${Math.round(Number(props.defaultPrice !== 'NaN' ? props.defaultPrice :Number(props.noBlanckPrice))/Number(getDollar))} USD`: `${props.price} COP`}</span> / {props.translate('form.night')}</p>
        </>
    );
}
