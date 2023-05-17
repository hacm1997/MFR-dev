import styles from "./styles.module.css";
import Content from "./content/content"

export default function Hero(props:any) {
    return (
        <>
            <section className={styles.header_banner}>
               <Content translate={props.translate} />
                <div className={styles.apoyo_grafico}>
                    <img src="/images/elemento-grafico-flechas.png" alt="Graphic Arrows" title="Graphic Arrows help"/>
                </div>
            </section>
        </>
    )
}
