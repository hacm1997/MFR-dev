import styles from "./styles.module.css";
import Descripcion from "../descripcion/descripcion";

export default function Title(props:any){
    return(
        <>
            <div className={styles.title}>
                <h2>{props.title}</h2>
                <Descripcion content={props.content} />

            </div>
        </>
    )
}