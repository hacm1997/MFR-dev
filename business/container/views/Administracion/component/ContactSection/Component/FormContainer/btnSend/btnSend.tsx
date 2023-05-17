import styles from "./styles.module.css";

export default function BtnSend(props:any){
    return(
        <>
            <a href={props.href} target="_blank" title="contact"><button className={styles.btn}>{props.translate('form.row2.button')}</button></a>
        </>
    )
}