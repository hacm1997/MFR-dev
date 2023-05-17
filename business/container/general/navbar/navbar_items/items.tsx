import styles from "./styles.module.css";
import React from "react";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import {useRouter} from "next/router";

export default function NavBarItems(props: any) {
    const {t, lang} = useTranslation("common");
    const navbar_items = t<any>("nav", {}, { returnObjects: true });
    const router = useRouter();

    return (
        <>
            <ul className="navbar-nav">
                {navbar_items?.map((item:any, index:number) => (
                    <li className={router.asPath === item.link ? styles.active : styles.item_nav} key={index}>
                        <Link href={item.link}>
                            <a className="nav-link active" aria-current="page" title={item.title}>{item.name}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    );
}
