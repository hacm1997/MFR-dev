import styles from "./styles.module.css";
import ItenCard from "../cards/itenCard/itenCard";

export default function Cards() {
    return (
        <>
            <div className={styles.cards}>
                <ItenCard img="/images/dashboard/alquilar.png" title="Hospedajes"
                          count="12"/>
                <ItenCard img="/images/dashboard/venta.png" title="En ventas"
                          count="12"/>
                <ItenCard img="/images/dashboard/disponible.png" title="Disponibles"
                          count="12"/>
                <ItenCard img="/images/dashboard/no-disponible.png" title="No disponibles"
                          count="12"/>
            </div>
        </>
    )
}