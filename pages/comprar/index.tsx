import type {NextPage} from 'next'
import Layout from "../../business/container/general/layout/layout";
import BannerFrase from "../../business/content/banner_frase/banner_frase";
import Vista_disponibles from "../../business/container/views/vista_disponibles/vista_disponibles";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";

const Home: NextPage = () => {
    const {t,lang}=useTranslation("buy")
    return (
        <>
            <Layout>
                <Head>
                    <title> {t('pageTitle')} | Inmobiliaria MFR</title>
                </Head>
                <BannerFrase translate={t} lang={lang}>
                    <h1>{t('title.pt1')} <strong>{t('title.pt2')}</strong> <span>{t('title.pt3')}</span></h1>
                </BannerFrase>
                <Vista_disponibles/>
            </Layout>
        </>
    )
}

export default Home
