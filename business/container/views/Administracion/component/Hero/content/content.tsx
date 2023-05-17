import styles from "./styles.module.css";
import BtnContact from "../btnContant/btnContact";


export default function Content(props:any) {
    return(
        <>
            <div className={styles.content}>
                <h1>{props.translate('section1.title')}</h1>
                <BtnContact translate={props.translate}/>
            </div>
        </>
    )
}