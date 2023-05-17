import styles from "./styles.module.css";

export default function Title(props: any) {
    return(
        <>
            <h5 className={styles.nosotros}>
                <strong>{props.title}</strong>
            </h5>
        </>
    )
}