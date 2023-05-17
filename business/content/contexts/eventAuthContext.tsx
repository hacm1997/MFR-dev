import React, {createContext, useEffect, useState} from "react";
import {getDollarPrice} from "../../../service/api/api";

export const EventAuthContext = createContext<any>(null);

export const EventAuthProvider = ({ children }:any) => {

    const [authEvent, setAuthEvent] = useState([]);
    const [statusSession, setStatusSession] = useState(false);
    const [profileInfo, setProfileInfo] = useState([]);
    const [getDollar, setGetDollar] = useState('');
    const [currency, setCurrency] = useState('COP');

    useEffect(()=>{
        getDollarPrice().then((res)=>{
            // console.log("response => ", res.data[res.data.length-1]);
            setGetDollar(res.data[res.data.length-1].valor)

        }).catch((e:Error) => {
            console.log(e)
        })
    },[])
    // console.log(cart)
    // console.log("dolar => ", getDollar)

    return (
        <EventAuthContext.Provider value={{authEvent, setAuthEvent, statusSession, setStatusSession, profileInfo, setProfileInfo, getDollar, setCurrency, currency}}>
            {children}
        </EventAuthContext.Provider>
    );
};
