import type {NextPage} from 'next'
import styles from './styles.module.css'
import Layout from "../../../business/container/views/dashboard/Component/general/Layout/layou";
import Dashboard from "../../../business/container/views/dashboard/dashboard";
import {Cookies} from "react-cookie";
import {useEffect, useState} from "react";
import config from "../../../infrastructure/config";


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
                {/*<Dashboard/>*/}
            </Layout>

        </>
    )
}

export default Home
