import styles from "./styles.module.css";
import Link from "next/link";
import Title from "./title/title";
import ItemsSocialMedia from "./itemsSocialMedia/itemsSocialMedia";
import useTranslation from "next-translate/useTranslation";

export default function SocialMedia() {
    const {t, lang} = useTranslation("common");
    const social_items = t<any>("footer.social.items", {}, { returnObjects: true });

    return(
        <>
            <div className="col-md-3">
                <Title title={t('footer.social.title')}/>
                <div className={styles.rSocial}>

                    {social_items?.map((item:any, index:number) => (
                        <ItemsSocialMedia href={item.link} icon={item.icon} title={item.title} key={index}/>
                    ))}

                </div>
            </div>
        </>
    )
}
