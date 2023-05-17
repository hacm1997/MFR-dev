import styles from "./styles.module.css";
import Link from "next/link";

export default function Badge(props:any) {
    return(
        <>
            <Link className="navbar-brand" href="/">
                <img className={styles.logo_mfr}
                      src={props.image}
                      alt="Logo | MFR" title="Inmobiliaria MFR"/>
            </Link>
        </>
    );
}
