import Layout from "../../../business/container/general/layout/layout";
import React from "react";
import ConfirmationPage from "../../../business/container/views/payments/confirmation/confirmation";
import Head from "next/head";
import useAnalyticsEventTracker from "../../../service/analytics/useAnalyticsEventTracker";

const Home = () => {
    const gaEventTracker = useAnalyticsEventTracker('Confirmación Pagos');
    return (
        <>
            <Layout>
                <Head>
                    <title>Detalles de compra | Inmobiliaria MFR</title>
                </Head>
                <ConfirmationPage gaEventTracker={gaEventTracker} />
            </Layout>
        </>
    )
}

export default Home
