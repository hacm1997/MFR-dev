import styles from "./styles.module.css";
import MenuLeft from "../menuLeft/menuLeft";
import Navbar from "../navbar/navbar";
import {useContext, useEffect, useState} from "react";
import {EventAuthContext} from "../../../../../../content/contexts/eventAuthContext";
import {useCookies} from "react-cookie";
import {validationToken} from "../../../../../../../service/api/api";
import SpinnerLoading from "../../../../../../content/spinnerLoad/spinner";

export default function Layout(props: any) {
    const {authEvent, setAuthEvent, statusSession, setStatusSession, profileInfo, setProfileInfo} = useContext(EventAuthContext);
    const [cookies, setCookie, removeCookie] = useCookies();
    const [logSpinner, setLogSpinner] = useState(true);

    useEffect(()=> {

        if(cookies.sessionToken){

            try{
                validationToken(cookies.sessionToken as string).then((res)=>{

                    if(res.status === 200){
                        setStatusSession(true)
                    }
                    setProfileInfo(res.data);
                }).then((e)=>{
                    console.log(e);
                })

            }catch(e:any){
                console.log(e);
            }
        }else{
            try{
                setCookie('sessionToken', authEvent.data.token.token as string, {path: '/', maxAge: 18000})

                if(cookies.sessionToken){
                    validationToken(cookies.sessionToken as string).then((res)=>{

                        if(res.status === 200){
                            setStatusSession(true)
                        }
                        setProfileInfo(res.data);
                    }).then((e)=>{
                        console.log(e);
                    })
                }
            }catch(e:any){
                console.log(e);
                setLogSpinner(false);
            }
        }

    }, [authEvent, statusSession, cookies.sessionToken])

    return (
        <>
            {statusSession ?
                <Navbar/>
            : null}
            {statusSession ?
                <main className={styles.main}>
                    <div className={styles.menu}>
                        <MenuLeft/>
                    </div>
                    <div className={styles.general}>
                        {props.children}
                    </div>
                </main>
            : <SpinnerLoading logSpinner={logSpinner} />}
        </>
    )
}
