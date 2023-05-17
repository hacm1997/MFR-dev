import styles from "./styles.module.css";
import SwiperCore, {Autoplay, Navigation, Pagination} from "swiper";
import Title from "./title/title";
import Description from "./description/description";
import ReviewsContainer from "./reviewsContainer/reviewsContainer";
import useTranslation from "next-translate/useTranslation";

SwiperCore.use([Autoplay, Pagination, Navigation]);

interface SliderProps {
    slides: string[];
}

export default function ReviewsSectionSkin(props: any) {
    const {t, lang} = useTranslation('comments');
    const items_review = t<any>("general.list", {}, { returnObjects: true });

    return (
        <>
            <section className={styles.section}>


                <div className={styles.content_principal}>
                    <div className={styles.content}>
                        <Title title={t('general.title')}/>
                        <Description
                            content={t('general.description')}/>
                    </div>
                    <ReviewsContainer translate={t} items={items_review}/>
                </div>
            </section>

        </>
    )
}
