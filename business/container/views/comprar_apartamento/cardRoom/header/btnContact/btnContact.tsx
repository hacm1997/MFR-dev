import styles from "./styles.module.css";

export default function BtnContact(props:any) {
    return(
        <>
            <div className={styles.boton}>
                <a  className={styles.btn_reservar} href={props.href}>{props.translate('section1.buttonContact')}</a>
            </div>
        </>
    )
}
