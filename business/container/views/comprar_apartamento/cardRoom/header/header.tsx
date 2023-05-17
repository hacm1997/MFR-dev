import styles from "./styles.module.css";
import Title from "./title/title";
import BtnContact from "./btnContact/btnContact";

export default function Header(props:any) {
    return(
        <>
            <div className={styles.info_apartamento}>
                <div className={styles.content}>
                   <Title title={props.data.name} href={props.href} translate={props.translate}/>
                     <BtnContact href="#booking" translate={props.translate}/>
                </div>

            </div>
        </>
    )
}
