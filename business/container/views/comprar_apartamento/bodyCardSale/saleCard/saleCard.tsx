import styles from "./styles.module.css";
import Title from "./title/title";
import Description from "./description/description";
import Price from "./price/price";
import FormSaleCard from "./formSaleCard/formSaleCard";

export default function SaleCard(props: any) {
    const characteristics = (code: string) => {
        return props.chars.filter(((char: any) => char.code === code)).map((obj: any) => obj.value)
    }
    return (
        <>
                <Title title={props.translate('for_buy.form.title')}/>
                <Description description={props.translate('for_buy.form.description')}/>
                <Price price={characteristics('price')} translate={props.translate} lang={props.lang}/>
                <FormSaleCard name={props.resource.name} translate={props.translate} lang={props.lang}/>
        </>
    )
}
