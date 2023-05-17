import type {NextPage} from 'next';
import Layout from "../../../business/container/views/dashboard/Component/general/Layout/layou";
import {Cookies} from "react-cookie";
import {useContext, useEffect, useState} from "react";
import config from "../../../infrastructure/config";
import {GoogleOAuthProvider} from "@react-oauth/google";
import GoogleAuthentication from "../../../business/container/views/dashboard/Component/googleAuth/googleAuth";

const Home: NextPage = () => {
    const cookies = new Cookies();
    const [stateAuth, setStateAuth] = useState(false);
    const client_id = config.CLIENT_ID;

    useEffect(()=> {

        if(cookies.get('session') === config.TOKEN_SESSION){
            setStateAuth(true);
        }

    })
    return (
        <>

            <Layout>
                <GoogleOAuthProvider clientId={client_id}>
                    <GoogleAuthentication/>
                </GoogleOAuthProvider>
            </Layout>

        </>
    )
}

export default Home
