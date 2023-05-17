import styles from "./styles.module.css";

export default function BtnContact(props:any) {
    return(
        <>
            <a className={styles.btn} href="#form">{props.translate('generalButton')}</a>
        </>
    )
}
