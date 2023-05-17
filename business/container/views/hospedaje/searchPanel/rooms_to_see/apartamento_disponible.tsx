import styles from "./styles.module.css"
import {formatNumber} from "../../../../../../service/service";

export default function Apartamento_disponible({data, lang, currency, getDollar, translate, gaEventTracker}: any) {
    const analytic = (name:string) =>{
        gaEventTracker(`Clic en apto ${name}`);
    }

    const content =data.filter((r:any) => (r.characteristics.filter(((char:any) => char.code === "type")).map((obj:any) => obj.value) != "Compra"))
        .map((dt:any,index:any) =>{

        const characteristics = (code:string) => {

            return dt.characteristics.filter(((char:any) => char.code === code)).map((obj:any) => obj.value)

        }
        return(
            <div className={styles.card} key={index}>
                <a onClick={() => analytic(dt.name)} key={index} href={lang === 'en' ? `/en/vista/${dt.resource_id}` : `/vista/${dt.resource_id}`} title="Details"><img className={styles.home_image} title="Apartamento" width={325} height={220} src={characteristics("imagePrincipal")} alt="Apartamento"/></a>

                <div className={styles.content}>
                    <div className={styles.title}>
                        <a onClick={() => analytic(dt.name)} href={lang === 'en' ? `/en/vista/${dt.resource_id}` : `/vista/${dt.resource_id}`} title="Apartamento"><h2>{dt.name || "Apto ##"}</h2></a>
                        <p><i className={'bx bxs-star ' + styles.icon}></i> {dt.rating}</p>
                    </div>
                    <h3>{characteristics("location")}</h3>
                    <p>{translate('aptos.max')}: {Number(characteristics("capacity_adults"))+Number(characteristics("capacity_kids"))} {translate('aptos.people')}</p>
                    <p>{translate('aptos.adults')}: {characteristics("capacity_adults")} - {translate('aptos.kids')}: {characteristics("capacity_kids")}</p>
                    <p>{characteristics("bedrooms")} {translate('aptos.bedroom')}</p>
                    <p>{characteristics("beds")} {translate('aptos.double_bed')}{/*, 2 sofá camas*/}</p>
                    <p>{characteristics("bathrooms")} {translate('aptos.bathrooms')}</p>
                    <h4>{currency === 'USD' || lang === 'en' ? `${Math.round(Number(characteristics("price"))/Number(getDollar))} USD`: `${formatNumber(characteristics("price"))} COP`} <span>/ {translate('aptos.night')}</span></h4>
                </div>

            </div>
        )
    })
    return(
        <>
            {content}
        </>
    )
}
