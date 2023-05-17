import styles from "./styles.module.css";
import {useContext} from "react";
import {EventAuthContext} from "../../../../content/contexts/eventAuthContext";
import useTranslation from "next-translate/useTranslation";

export default function Coin(props:any) {

    const {currency, setCurrency} = useContext(EventAuthContext);
    const {t, lang} = useTranslation();

    const handlerCurrency = (event:any) => {
        const value = event.target.value
        setCurrency(value)
    }

    return(
        <>
            {lang === 'es' ?
                <div className={styles.moneda_curr}>
                    <div className={styles.moneda_nav}>
                        <div className="btn-group">
                            <select className={styles.currency} onChange={handlerCurrency}>
                                <option value={props.coin1}>
                                    COP
                                </option>
                                <option value={props.coin2}>USD</option>
                            </select>
                        </div>
                    </div>
                </div>
            :null}
        </>
    );
}
