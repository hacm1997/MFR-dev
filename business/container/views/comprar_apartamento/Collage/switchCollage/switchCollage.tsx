import styles from "../styles.module.css";
import * as React from "react";

export default function SwitchCollage(props:any) {


    return(
        <>
            <div className={styles.botones}>
                <button className={styles.btnFotos} style={props.active} onClick={props.handleApartamento}>{props.translate('for_buy.switch.photos')}</button>
                <button className={styles.btnPlanos} style={props.noActive} onClick={props.handlePlano}>{props.translate('for_buy.switch.blueprints')}</button>
            </div>
        </>
    )
}
