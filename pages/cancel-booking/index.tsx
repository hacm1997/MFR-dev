import {NextPage} from "next";
import useTranslation from "next-translate/useTranslation";
import Layout from "../../business/container/general/layout/layout";
import CancelBooking from "../../business/container/views/cancel_booking/cancel";


const Home: NextPage = () => {
    const {t, lang} = useTranslation('home');

    return(
        <>
            <Layout>
                <CancelBooking/>
            </Layout>
        </>
    )
}

export default Home
