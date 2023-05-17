import styles from "./styles.module.css"
export default function Descripcion(props:any){
    return(
        <>
            <p className={styles.content}>{props.content}</p>
        </>
    )
}