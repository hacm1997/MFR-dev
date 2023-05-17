import styles from "./styles.module.css";
export default function Content(props: any) {
    return(
        <>
            <p className={styles.content}>{props.content}</p>
        </>
    )
}