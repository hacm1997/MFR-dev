import config from "../../infrastructure/config";
import {
    createBooking,
    createPayment,
    credentials,
    PostData,
    PostDataResources,
    updateBooking,
    updateDataResource
} from "./types";
import http from "./http-common";
import httpForm from "./http-common-form";
import axios from "axios";
import {useState} from "react";
import moment from "moment";

const apiVersion = "/api/v2/lead"
const pathResource = '/api/v1/resource';
const pathBooking = '/api/v1/booking';
const pathPayment = '/api/v1/payment';
const pathGoogle = '/api/v1/integration/google';
const pathMicrosoft = '/api/v1/integration/microsoft';

moment.locale("es");
/*GET DATA API WITH AXIOS*/
export function useAllResources() {
    const [dataJson, setDataJson] = useState<Array<any>>([]);
    const configuration = {
        method: 'get',
        url: config.API_URL + pathResource + '/search',
        headers: {
            xsrfCookie: `tenant=${config.TENANT as string}`,
        },
        withCredentials: true
    }
    const getAll = async () => {

        axios.request(configuration).then((response) => {
            setDataJson(response.data.data);
            return response.data;

        }).catch((error) => {
            console.log(error);
        })
    }
    return [dataJson, getAll] as const;
}

export function allResources() {
    return http.get<PostDataResources>(`${pathResource}/search`);
}

/* CREATE RESOURCE */
export function postResource(data: PostDataResources) {

    return http.post<PostDataResources>(pathResource, data);
};

/*GET DATA API WITH AXIOS*/
export function getAllResourcesAvailable() {

    return http.get<PostDataResources>(`${pathResource}/search?status=Available`);

}
/* GET RESOURCE BY STATUS AVILABLE AND CODE */
export function getResource(code: string) {

    return http.get<PostDataResources>(`${pathResource}/search?status=Available&resource_id=${code}`);
}

/* UPDATE RESOURCE BY CODE */
export function updateResource(code: any, data: updateDataResource) {

    return http.put<any>(`${pathResource}/${code}`, data);
}

/* DELETE RESOURCE */
export function deleteResource(code: any) {

    return http.delete<any>(`${pathResource}/${code}`);
}

// Booking Module //
export function getAllBooking() {
    return http.get<createBooking>(`${pathBooking}/2023-01-01T00:00:00.000Z/2023-01-01T00:00:00.000Z`);
}

export function postBooking(data: createBooking) {
    return http.post<createBooking>(pathBooking, data);
}

export function getBooking(code: string, startDate: string, dni: string) {
    return http.get<createBooking>(`${pathBooking}?booking_code=${code}&start_date=${startDate}&dni=${dni}`)
}

export function getBookingAvailable(code: string, startDate: string) {
    return http.get<createBooking>(`${pathBooking}/availability/${code}?start=${startDate}`)
}

export function putBooking(startDate: string, state:string, code: string) {
    return http.put(`${pathBooking}/booked/${code}/${startDate}/${state}`);
}

/* EPAYCO RESPONSE PAYMENTE */
export function getRefEpayco() {
    return http.get<any>('https://secure.epayco.co/validation/v1/reference/83b2c76d595a49dc775cc1c3');
}

// Payment Module //
export function createPayment(data: createPayment) {
    return http.post<createPayment>(pathPayment, data);
}

export function getPayments() {
    return http.get<createPayment>(pathPayment);
}

// AUTHORIZATION GOOGLE //

/* Get token or verify if token exits */
export function googleAuthToken() {
    return http.get<any>(`${pathGoogle}/token`);
}

export function googleAuthConfig() {
    return http.get<any>(`${pathGoogle}/config`);
}

/* GET ACCESS AND REFRESH TOKEN */
export function getTokens(data: any, code: string) {
    const dataToken = {
        code: code,
        client_id: data.clientId as string,
        client_secret: data.clientSecret as string,
        grant_type: 'authorization_code',
        redirect_uri: data.redirectUri as string,
    }
    return axios.post('https://accounts.google.com/o/oauth2/token', dataToken)
}

/* SAVE CREDENTIAL ACCESS */
export function saveCredentialsAccess(data: any, code: string) {
    const initSave = {
        code: code,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiryDate: data.expires_in,
        tokenType: data.token_type
    }
    return http.post<credentials>(`${pathGoogle}/token?code=${code}`, initSave);
}

//GOOGLE CALENDAR//
export function getCalendarEvents(accessToken: string, id_calendar: string) {
    const now = moment.utc().local().add(1, 'day');
    const currentDate = now.toJSON();
    const settings = {
        method: 'get',
        url: `https://www.googleapis.com/calendar/v3/calendars/${id_calendar ?? config.CALENDAR_ID as string}/events?&timeMin=${currentDate}&key=${config.API_KEY as string}`,
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
        },
    }
    return axios(settings);
}

export function getAccessToken() {
    return http.get<any>(`${pathGoogle}/token`);
}

// S3 SERVICE FROM SERVICE FORM //
const configAxiosS3 = {
    headers: {
        'xsrfCookie': `tenant=${config.TENANT as string}`,
        'maxBodyLength': Infinity,
        'Content-Type': 'multipart/form-data'
    }
}
export function s3Service(fileKey: any) {
    return axios.post(`${config.S3_SERVICE}/api/v2/file/upload`, fileKey, configAxiosS3);
}
export function s3ServiceMultiple(fileKey: any) {

    return axios.post(`${config.S3_SERVICE}/api/v2/file/multiple-upload`, fileKey, configAxiosS3);
}
export function deleteImage(fileKey: any) {
    return axios.post(`${config.S3_SERVICE}/api/v2/file/${config.TENANT}/${fileKey}`, configAxiosS3);
}

/* Auth Login and Token validation */
export function validationToken(accessToken: string) {
    const settings = {
        method: 'get',
        url: 'https://auth.s.dev.kru360.com/preference',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Accept': 'application/json',
        },
    }
    return axios(settings);
}

export function getDollarPrice() {
    const nowDefault = moment.utc().local();
    const nowFormatDate = moment(nowDefault).format("YYYY-MM-DD")
    // console.log("date => ",nowFormatDate) ?vigenciadesde=${nowFormatDate}T00:00:00.000
    return axios.get(`${process.env.NEXT_PUBLIC_DOLLAR_API as string}?$limit=20000`)
}

/* MICROSOFT AUTH */
export function microsoftAuthToken() {
    return http.get<any>(`${pathMicrosoft}/token`);
}

export function microsoftAuthConfig() {
    return http.get<any>(`${pathMicrosoft}/config`);
}

export function getMicrosoftTokens(credentials: any, code: string) {
    // const FormData = require('form-data');
    const dataToken = {
        code: code,
        client_id: credentials.clientId as string,
        client_secret: credentials.clientSecret as string,
        grant_type: 'authorization_code',
        redirect_uri: credentials.redirectUri as string,
    }

    return axios.post(`https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MICROSOFT_TENANT as string}/oauth2/v2.0/token`, dataToken);

}

export async function getMicrosoftTokensTest(credentials: any, code: string) {
    let formData = new FormData();
    formData.append('code', code);
    formData.append('client_id', credentials.clientId as string);
    formData.append('grant_type', 'authorization_code');
    formData.append('client_secret', credentials.clientSecret as string);
    formData.append('redirect_uri', credentials.redirectUri as string);
    formData.append('scope', 'https://graph.microsoft.com/user.read+offline_access');

    const url = `https://login.microsoftonline.com/${process.env.NEXT_PUBLIC_MICROSOFT_TENANT as string}/oauth2/v2.0/token`;

    let aux = await axios.post(url, {
        'code': code,
        'client_id': credentials.clientId as string,
        'grant_type': 'authorization_code',
        'client_secret': credentials.clientSecret as string,
        'redirect_uri': credentials.redirectUri as string,
        'scope': 'https://graph.microsoft.com/user.read+offline_access',
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })

    return aux;
    // fetch(url , requestOptions)
    //     .then(response => response.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.error(error));
}


export function saveMicrosoftCredentialsAccess(data: any, code: string) {
    const initSave = {
        code: code,
        accessToken: data.access_token,
        refreshToken: data.refresh_token,
        expiryDate: data.expires_in,
        tokenType: data.token_type
    }
    return http.post<credentials>(`${pathMicrosoft}/token?code=${code}`, initSave);
}

/* FACTURE */
export function getFactureBooked(booking_code:string){
    return http.get(`${pathPayment}/${booking_code}`);
}

/* NOTIFIER FORM */
export function formService(data:PostData){
    return httpForm.post<PostData>(apiVersion, data);
}
