import type {NextPage} from 'next'
import Layout from "../../business/container/general/layout/layout";
import Administracion from "../../business/container/views/Administracion/administracion";
import Head from "next/head";
import useTranslation from "next-translate/useTranslation";


const Home: NextPage = () => {
    const {t,lang}=useTranslation("administration")
    return (
        <>
            <Layout>
                <Head >
                    <title> {t('page.title')}| Inmobiliaria MFR</title>
                </Head>
                <Administracion translate={t} lang={lang}/>
            </Layout>
        </>
    )
}

export default Home
