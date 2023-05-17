import React, { useEffect } from "react";
import { useLocalStorage } from "../../../../service/api/hooks";
import config from "../../../../infrastructure/config";

const IframeAuth = () => {
    const [, setTokenItem] = useLocalStorage("token", "");
    const [, setRTokenItem] = useLocalStorage("rtoken", "");
    const [auth, setAuth] = React.useState(false);
    // receive the token from the iframe and save it in the store
    const receiveMessage = (event:any) => {
        console.log("local events => ",event);
        const { token } = event.data;
        if (token?.token) {
            setTokenItem(token.token);
            setRTokenItem(token.rToken);
            setAuth(true);
        }
        // console.log("token => ",token)
    };
    function handleIframeClick(event: MouseEvent) {
        console.log("display event => ", event)
    }

    const iframeEvent = (event:any) => {
        console.log("iframe event => ",event);

        // console.log("token => ",token)
    };

    // listen for messages from the parent window
    useEffect(() => {
        if (typeof window !== "undefined") {
            const input = document.getElementById(
                'iframe',
            ) as HTMLInputElement | null;
            //console.log("input => ",input)
            input?.addEventListener("message", iframeEvent, false);
            window.addEventListener("message", receiveMessage, false);
        }

        return () => {
            if (typeof window !== "undefined") {
                const input = document.getElementById(
                    'iframe',
                ) as HTMLInputElement | null;
                input?.addEventListener("message", iframeEvent, false);
                window.addEventListener("message", receiveMessage, false);
            }
        }
    }, []);

    const redirect = () => {
        if (typeof window !== "undefined") {
            window.location.href=`${config.DOMAIN_URL as string}/dashboard`;
        }
    }


    return  (
        <>
            { !auth ?
                <iframe
                    title="Auth"
                    src="https://accounts.kru360.com/index.html#/?appName=mfr&redirectUrl=http://localhost:3000/dashboard"
                    allow="fullscreen"
                    id="iframe"
                />
            : redirect()}

        </>
    )
}

export default IframeAuth;

