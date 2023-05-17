import styles from './styles.module.css';

export default function SpinnerLoading(props:any) {

    return(
        <>
            {props.logSpinner ?
                <div className={styles.principal}>
                    <div className={styles.content}>
                        <div className={styles.loader}></div>
                    </div>
                    <div style={{textAlign:"center"}}>
                        <p>Cargando...</p>
                    </div>
                </div>
            : <h1>No autorizado, por favor inicie sesión</h1>}


        </>
    )
}


