import styles from "./styles.module.css";

export default function InputImput(props: any) {

    return (
        <>
            <input className={styles.input} type={props.type} name={props.name} placeholder={props.placeholder}  onChange={props.onChange} required/>
        </>
    )
}
