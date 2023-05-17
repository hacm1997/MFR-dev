import Layout from "../../business/container/general/layout/layout";
import React, {useEffect, useState} from "react";
import Payments from "../../business/container/views/payments/payment";
import Head from "next/head";
import useAnalyticsEventTracker from "../../service/analytics/useAnalyticsEventTracker";

const Home = () => {
    const gaEventTracker = useAnalyticsEventTracker('Pagos');
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    }
    return (
        <>
            <Layout>
                <Head>
                    <title>Proceso de Pago | Inmobiliaria MFR</title>
                </Head>
                <Payments gaEventTracker={gaEventTracker}/>
            </Layout>
        </>
    )
}

export default Home

