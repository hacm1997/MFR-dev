import styles from './styles.module.css';
import * as React from "react";
import TitleReviews from "./header/title/title";
import ReviewStars from "./header/stars/stars";
import ReviewsCard from "./reviews_content/review_card";
import useTranslation from "next-translate/useTranslation";

export default function ReviewsSection() {
    const {t, lang} = useTranslation("comments");
    const comments_items = t<any>("details", {}, { returnObjects: true });

    return(
        <>
            <div className={styles.content_2}>
                <div className={styles.container_title}>
                    <TitleReviews translate={t}/> <ReviewStars />
                </div>
                <ReviewsCard comments={comments_items} />
            </div>
        </>
    );
}
