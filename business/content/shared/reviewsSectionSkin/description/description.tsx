import styles from "./styles.module.css";
export default function Description(props:any){
    return(
        <>
            <p className={styles.description}>{props.content}</p>
        </>
    )
}