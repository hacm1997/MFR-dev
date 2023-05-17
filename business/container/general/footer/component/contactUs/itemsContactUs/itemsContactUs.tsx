import styles from "./styles.module.css";
import Link from "next/link";

export default function ItemsContactUs(props: any) {
    return (
        <>
            <div className={styles.icoCont}>

                    <a title="Contacto">
                        <i className={props.icon}></i>
                    </a>

                <p className={styles.contenidoContacto}>
                    {props.children}
                </p>

            </div>

        </>
    )
}
