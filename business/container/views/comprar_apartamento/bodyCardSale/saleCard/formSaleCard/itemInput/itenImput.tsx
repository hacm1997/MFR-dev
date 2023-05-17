import styles from "./styles.module.css";
export default function ItenImput(props: any) {
    return(
        <>
            <input className={styles.input} type={props.type} name={props.name} placeholder={props.placeholder} onChange={props.onChange}/>
        </>
    )
}
