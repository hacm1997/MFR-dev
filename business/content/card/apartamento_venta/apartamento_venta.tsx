import styles from "./styles.module.css"
import {formatNumber} from "../../../../service/service";
export default function Apartamento_venta({data, translate, lang, currency, getDollar}:any){

    const sales = data.filter((r:any) => (r.characteristics.filter(((char:any) => char.code === "type")).map((obj:any) => obj.value) == "Compra"))
        .map((dt:any,index:any) =>{

            const characteristics = (code:string) => {

                return dt.characteristics.filter(((char:any) => char.code === code)).map((obj:any) => obj.value)

            }

            return(
                <div className={styles.card} key={index}>
                    <img src="/images/apartamentos/portadas/portada.jpg" alt="Apartamento"/>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            <h4>$ {currency === 'USD' || lang === 'en' ? `${Math.round(Number(characteristics("price"))/Number(getDollar))} USD`: `${formatNumber(characteristics("price"))} COP`}</h4>
                        </div>
                        <h3>{characteristics("location")}</h3>
                        <p>{formatNumber(characteristics("area"))}m<sup>2</sup></p>
                        <p>{characteristics("bedrooms")} {translate('aptos.bedroom')}</p>
                        <p>{characteristics("beds")} {translate('aptos.double_bed')}{/*, 2 sofá camas*/}</p>
                        <p>{characteristics("bathrooms")} {translate('aptos.bathrooms')}</p>
                        <a href={lang === 'en' ? `/en/compra-apartamento/${dt.resource_id}` : `/compra-apartamento/${dt.resource_id}`}>{translate('aptos.button')}</a>
                    </div>
                </div>
            )
        }
    )

    return(
        <>
            {sales}
        </>
    )
}
