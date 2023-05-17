import Image from "next/image";
import styles from "./styles.module.css";

export default function Logo() {
    return (
        <>
            <img className={styles.logo} src="../images/dashboard/logo.png" width={50} height={50}/>
        </>
    )
}