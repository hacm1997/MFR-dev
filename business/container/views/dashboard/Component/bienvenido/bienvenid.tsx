import styles from "./styles.module.css";

export default function bienvenido() {
    return (
        <>
            <div className={styles.bienvenido}>
                <h1>¡Bienvenido <span>MFR!</span></h1>
            </div>
        </>
    )
}