import styles from "../../../footer.module.css";

export default function Content(props: any) {
    return(
        <>
            <p className={styles.contenido}>{props.content}</p>
        </>
    )
}