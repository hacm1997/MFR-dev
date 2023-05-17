import styles from "./styles.module.css";
import React from "react";
import useTranslation from "next-translate/useTranslation";

export default function Language(props:any) {
    const {t, lang} = useTranslation();
    return(
        <>
            <div className={styles.lenguaje_navbar}>
                <div className="btn-group">
                    <button className={"btn dropdown-toggle " + styles.btn_nav} type="button"
                            id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <a href={lang === 'es' ? "#" : '/'} title={lang === 'es' ? "Espñaol" : 'English'}>{lang === 'es' ? props.lang1 : props.lang2}</a>
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><a className="dropdown-item" href={lang === 'en' ? "/" : '/en'} title={lang === 'en' ? "Español" : 'English'}>{ lang === 'en' ? props.lang1 : props.lang2}</a></li>
                    </ul>
                </div>
            </div>
        </>
    );
}
