import styles from "./styles.module.css";

export default function BtnContact(props:any){
    return(
        <>
            <div className={styles.boton}>
                <a href="#form" title="Botón de contacto">{props.name}</a>
            </div>
        </>
    )
}
