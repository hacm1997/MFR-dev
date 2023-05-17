import styles from "./styles.module.css";
export default function Star(props: any) {
    return(
        <>
            <div className={styles.star}>
                <i className={props.icon}></i>
            </div>

        </>
    )
}