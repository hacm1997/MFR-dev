import styles from "./styles.module.css";
import Stars from "./stars/stars";
import Content from "./content/content";
import Title from "./title/title";

export default function ReviewCard(props:any) {
    return (
        <>
            <div className={styles.card}>
                {/*<img src="/images/testimonio/user.jpg" alt="Default profile" title="Default profile"/>*/}
                <div className={styles.content}>
                    <Title title={props.title}/>
                    <Content content={`"${props.coment}"`}/>
                    <Stars/>
                    <Stars/>
                    <Stars/>
                    <Stars/>
                    <Stars/>

                </div>
            </div>
        </>
    )
}