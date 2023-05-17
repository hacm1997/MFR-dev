import React from "react";
import Head from "next/head";
import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";
import Script from "next/script";
import common from "../../../../locales/es/common.json"
import useTranslation from "next-translate/useTranslation";
import styles from "./style.module.css"
import {useRouter} from "next/router";
import useAnalyticsEventTracker from "../../../../service/analytics/useAnalyticsEventTracker";

export default function Layout({children}: any) {
    const gaEventTracker = useAnalyticsEventTracker('Pagos');
    const {t, lang} = useTranslation("common");
    const router = useRouter();
    const wsp_esp = "https://api.whatsapp.com/send?phone=573012164363&text=Hola%20MFR%20%F0%9F%92%9C%E2%9C%A8.%20Estaba%20visitando%20su%20sitio%20web%20y%20estoy%20interesad%40%20en%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20apartamentos%20disponibles%20para%20arriendo%20y%2Fo%20venta.";
    const wsp_eng = "https://api.whatsapp.com/send?phone=573012164363&text=Hi%20MFR%20%F0%9F%92%9C%E2%9C%A8.%20I%20was%20visiting%20your%20website%20and%20I%27m%20interested%20in%20getting%20more%20information%20about%20the%20apartments%20available%20for%20rent%20and%2For%20sale.";

    const analytic = () => {
        gaEventTracker('Clic en WhatsApp')
    }
    return (
        <>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <meta property="og:description" content=""/>
                <meta name="description" content="Nuestro propósito es llevar disponibilidad en el momento oportuno para suplir tu necesidad de encontrar un lugar que integre los paisajes y te transmita paz y felicidad"/>
                <meta name="keyword" content={t('keywords')}/>
                <meta charSet="utf-8"/>
                <meta name="author" content="Inmobiliaria MFR"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>
                <title>{t('title')}</title>
                <meta name="robots" content="index, follow"/>
                <meta name="googlebot" content="index, follow"/>
                <meta name="googlebot-news" content="index, follow"/>
                <meta name="googlebot-image" content="index, follow"/>
                <meta name="googlebot-video" content="index, follow"/>
                <link rel="canonical" href="https://inmobiliariamfr.com"/>
            </Head>
            {router.asPath === 'payment' ? null :
                <a
                    href={lang === 'en' ? wsp_eng : wsp_esp}
                    target="_blank"
                    rel="noreferrer"
                    title="Whatsapp"
                    className={styles.float}
                >
                    <i className='bx bxl-whatsapp'></i>
                </a>
            }
            <Navbar/>
            {children}
            <Footer/>
        </>
    )
}
