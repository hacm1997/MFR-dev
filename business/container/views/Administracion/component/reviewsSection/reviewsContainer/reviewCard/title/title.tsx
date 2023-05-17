import styles from "./styles.module.css";
export default function Title(props: any) {
    return(
        <>
            <h2 className={styles.title}>{props.title}</h2>
        </>
    )
}