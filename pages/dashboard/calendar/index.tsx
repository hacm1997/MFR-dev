import type {NextPage} from 'next'
import Layout from "../../../business/container/views/dashboard/Component/general/Layout/layou";
import {Cookies} from "react-cookie";
import {useContext, useEffect, useState} from "react";
import config from "../../../infrastructure/config";

import MyCalendar from "../../../business/container/views/dashboard/Component/calendar/calendar";
import {EventAuthContext} from "../../../business/content/contexts/eventAuthContext";

const Home: NextPage = () => {
    const cookies = new Cookies();
    const {statusSession, setStatusSession, profileInfo, setProfileInfo} = useContext(EventAuthContext);
    const [stateAuth, setStateAuth] = useState(false);

    useEffect(() => {

        if (cookies.get('session') === config.TOKEN_SESSION) {
            setStateAuth(true);
        }

    })
    return (
        <>
            {setStatusSession ?
                <Layout>
                    <MyCalendar/>
                </Layout>
            : <h1>No está autorizado</h1>}


        </>
    )
}

export default Home
