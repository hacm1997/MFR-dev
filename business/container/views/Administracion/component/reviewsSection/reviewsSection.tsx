import styles from "./styles.module.css"
import Title from "./title/title";
import ReviewsContainer from "./reviewsContainer/reviewsContainer";
import BtnContact from "./reviewsContainer/reviewCard/btnContact/btnContact";


export default function ReviewsSection(props:any) {
    return (
        <>
            <section className={styles.section}>
                <Title >
                    {props.translate('opinion.title')} <strong>{props.translate('opinion.title2')}</strong>
                    {/*Su opinión <span>lo dice todo</span>*/}
                </Title>
                <ReviewsContainer/>
                <BtnContact name="Contactar" />

            </section>
        </>
    )
}