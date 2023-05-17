import styles from "./styles.module.css";
export default function Title(props:any){
    return(
        <>
           <div className={styles.title}>
               <h2>{props.children}</h2>
           </div>
        </>
    )
}