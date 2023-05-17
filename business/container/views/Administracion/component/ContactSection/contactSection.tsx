import styles from "./styles.module.css"
import LeftArticle from "./Component/LeftArticle/leftArticle";
import FormContainer from "./Component/FormContainer/formContainer";
import useTranslation from "next-translate/useTranslation";

export default function ContactSection(props:any){
    return(
        <>
            <section className={styles.section}>
                <LeftArticle>
                    {props.translate('form.row1.titlep1')} <span>{props.translate('form.row1.titlep2')}</span>
                </LeftArticle>
                <FormContainer translate={props.translate} lang={props.lang}/>
            </section>
        </>
    )
}
