import styles from "./styles.module.css";
import Image from "next/image";

export default function ItenCard(props: any) {
    return (
        <>
            <div className={styles.card}>
                <div className={styles.content}>
                    <p>{props.count}</p>
                    <h3>{props.title}</h3>
                </div>
                <div className={styles.icon}>
                    <img width={"80"} height={"80"} src={props.img}></img>
                </div>

            </div>
        </>
    )
}