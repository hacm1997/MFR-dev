import styles from "./styles.module.css";
import React, {useState} from "react";
import Link from "next/link";
import {useCookies} from "react-cookie";

export default function ItemMenu(props: any) {
    const [cookies, setCookie, removeCookie] = useCookies();
    const Logout = () => {
        // setCookie('sessionToken', 'null', {path: '/', maxAge: 360})
        removeCookie("sessionToken");
    }

    let content = <div></div>;
    if(props.href === "/login"){
        content = (
            <Link href={props.href}>
                <a onClick={Logout} className={styles.iten}>{props.children}</a>
            </Link>
        )
    }else {
        content = (
            <Link href={props.href}>
                <a  className={styles.iten}>{props.children}</a>
            </Link>
        )
    }

    return (
        <>
            {content}
        </>
    )
}
