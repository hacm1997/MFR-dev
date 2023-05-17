import Link from "next/link";
import styles from "./styles.module.css";

export default function ItemsSocialMedia(props: any) {
    return (
        <>
           <div className={styles.ico} key={props.index}>
               <Link href={props.href}>
                   <a target="_blank" title={props.title}>
                       <i className={props.icon}></i>
                   </a>
               </Link>
           </div>
        </>
    )
}
