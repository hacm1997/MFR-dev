import styles from "./styles.module.css";

export default function ItemInput(props:any){
    return(
        <>
            <input className={styles.input} type="text" placeholder={props.placeholder} name={props.name} onChange={props.onChange}/>
        </>
    )
}