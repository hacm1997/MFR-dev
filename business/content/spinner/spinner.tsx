import styles from './styles.module.css';

const SpinnerView = () => (
    <div>
        <div className={styles.content}>
            <div className={styles.loader}></div>
        </div>
        <div style={{textAlign:"center"}}>
            <p>Procesando...</p>
        </div>
    </div>

);

export default SpinnerView;
