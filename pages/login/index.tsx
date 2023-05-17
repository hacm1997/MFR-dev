import type {NextPage} from 'next'
import {useRouter} from 'next/router'
import styles from './styles.module.css'
import React, {useContext, useEffect} from "react";
import {Cookies, useCookies} from "react-cookie";
import config from "../../infrastructure/config";
import {EventAuthContext} from "../../business/content/contexts/eventAuthContext";


const Home: NextPage = (props) => {
    const Swal = require('sweetalert2')
    const {authEvent, setAuthEvent} = useContext(EventAuthContext);

    const [email, setEmail] = React.useState('');
    const ACCOUNT_URL = 'https://accounts.kru360.com/index.html#/';

    const router = useRouter();
    const [cookies, setCookie, removeCookie] = useCookies();

    const receiveMessage = (event: any): void => {
        console.log('event recived value ', event);
        if (event.origin) {
            setAuthEvent(event);
            if(event.data.token){
                console.log('Here should redirect using kru360 project nestjs redirection');
                router.push('/dashboard');
            }
        }
    };

    useEffect(() => typeof window !== "undefined" ? window.addEventListener('message', receiveMessage, false) : console.log('error'), []);

    useEffect(()=>{
        removeCookie("sessionToken");
    },[cookies.sessionToken])
    const accountLoginUI = () => {
        return (
            <iframe
                className={styles.iframeStyle}
                style={{width: '100%', height: '100%', border: 'none', display: 'initial', zIndex: 99}}
                src={`${ACCOUNT_URL}?appName=MFR&mode=access${email ?
                    '&email=' + email : ''}`}
                title="accounts"
                name="ifr_login"
                allow="fullscreen"
            />
        );
    }

    return (
        <>
            <div className={styles.general}>
                <div className={styles.login}>
                    <div className={styles.iframeContainer}>
                        {accountLoginUI()}
                        {/*<button type="button" disabled={loading} onClick={redirect}>Iniciar sesión</button>*/}
                        {/*<form onSubmit={handleSubmit}>*/}
                        {/*    <img src="/images/logos/logo-mfr-footer.png" alt=""/>*/}
                        {/*    <input onChange={handleUsernameChange} name="usuario" id="usuario" type="text"*/}
                        {/*           placeholder="Usuario"/>*/}
                        {/*    <input onChange={handlePasswordChange} name="password" id="password" type="password"*/}
                        {/*           placeholder="Contraseña"/>*/}
                        {/*    <button type="submit" disabled={loading}>Iniciar sesión</button>*/}
                        {/*</form>*/}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
