import type {NextPage} from 'next'
import styles from './styles.module.css'
import Layout from "../../../business/container/views/dashboard/Component/general/Layout/layou";
import {Cookies} from "react-cookie";
import {useContext, useEffect, useState} from "react";
import Booking from "../../../business/container/views/dashboard/Component/booking/booking";
import {EventAuthContext} from "../../../business/content/contexts/eventAuthContext";

const Home: NextPage = () => {
    // const cookies = new Cookies();
    const {statusSession, setStatusSession, profileInfo, setProfileInfo} = useContext(EventAuthContext);
    const [stateAuth, setStateAuth] = useState(false);

    // useEffect(()=> {
    //
    //     if(cookies.get('session') === config.TOKEN_SESSION){
    //         setStateAuth(true);
    //     }
    //
    // })
    return (
        <>

            <Layout>
                <Booking/>
            </Layout>

        </>
    )
}

export default Home
