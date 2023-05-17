import styles from "./styles.module.css";
import FeaturesRoom from "./featuresRoom/featuresRoom";
import {DevApartamento} from "../../../../../service/service";
import SaleCard from "./saleCard/saleCard";

export default function BodyCardSale(props: any) {
    return (
        <>
            <div className={styles.general_2} id="booking">
                <FeaturesRoom data={props.data} chars={props.chars} resource={props.resource} translate={props.translate} lang={props.lang}/>
                <div className={styles.formulario_general}>
                    <SaleCard chars={props.chars} resource={props.resource} translate={props.translate} lang={props.lang}/>
                </div>
            </div>
        </>
    )
}
