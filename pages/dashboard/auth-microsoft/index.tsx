import type {NextPage} from 'next';
import Layout from "../../../business/container/views/dashboard/Component/general/Layout/layou";
import {Cookies} from "react-cookie";
import {useEffect, useState} from "react";
import config from "../../../infrastructure/config";
import MicrosoftAuthentication from "../../../business/container/views/dashboard/Component/microsoftAuth/microsoftAuth";

const Home: NextPage = () => {
    const cookies = new Cookies();
    const [stateAuth, setStateAuth] = useState(false);

    useEffect(()=> {

        if(cookies.get('session') === config.TOKEN_SESSION){
            setStateAuth(true);
        }

    })
    return (
        <>

            <Layout>
                <MicrosoftAuthentication />
            </Layout>

        </>
    )
}

export default Home
