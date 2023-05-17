import type {NextPage} from 'next'
import Layout from "../business/container/general/layout/layout";
import BannerFrase from "../business/content/banner_frase/banner_frase";
import Hospedaje from "../business/container/views/hospedaje/hospedaje";
import TitleHeader from "../business/container/views/hospedaje/header/title_header/title_header";
import Head from "next/head";
import React from "react";
import useTranslation from "next-translate/useTranslation";
import styles from "../business/container/general/layout/style.module.css";
import useAnalyticsEventTracker from "../service/analytics/useAnalyticsEventTracker";


const Home: NextPage = () => {
    const {t, lang} = useTranslation('home');
    const gaEventTracker = useAnalyticsEventTracker('Hospedaje');
    const analytic = () =>{
        gaEventTracker('Clic en cancelar reserva');
    }
    return (
        <>
            <Layout>
                <BannerFrase>
                    <TitleHeader translate={t}/>
                </BannerFrase>
                <Hospedaje translate={t} lang={lang} gaEventTracker={gaEventTracker}/>
                <a
                    href={lang === 'en' ? '/en/cancel-booking' : '/cancel-booking'}
                    rel="noreferrer"
                    title="Cancel reserv"
                    className={styles.float_cancel}
                    onClick={analytic}
                >
                    {t('cancel')}
                </a>
            </Layout>
        </>
    )
}

export default Home
