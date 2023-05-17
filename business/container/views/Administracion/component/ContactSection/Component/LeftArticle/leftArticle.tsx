import styles from "./styles.module.css"

export default function LeftArticle(props:any){
    return(
        <>
            <div className={styles.content_form}>
                <h3>
                    {props.children}
                </h3>
                <img className={styles.puntos} src="/images/elemento-grafico-puntos-blancos.png" alt="Apoyo gráfico" title="Apoyo gráfico"/>
                <img className={styles.flechas} src="/images/elemento-grafico-flecha-blacos.png" alt="Arrows white" title="Arrows white"/>
            </div>
        </>
    )
}
