import axios from 'axios';
import config from "../../infrastructure/config";

export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVICE_FORM as string,
    headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json',
        xsrfCookie: `tenant=${config.TENANT as string}`,
    },
    withCredentials: true
})
