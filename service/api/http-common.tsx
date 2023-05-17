import axios from 'axios';
import config from "../../infrastructure/config";

export default axios.create({
    baseURL: config.API_URL,
    headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json',
        xsrfCookie: `tenant=${config.TENANT as string}`,
    },
    withCredentials: true
})
