import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface CallAPIProps extends AxiosRequestConfig {
    token?: boolean
}

export default async function callAPI({ url, method, data, token }: CallAPIProps) {

    let headers = {};

    if (token) {
        const tokenCookies = Cookies.get('token');

        if (tokenCookies) {
            const tokenEncoded = atob(tokenCookies);
            headers = {
                Authorization: `Bearer ${tokenEncoded}`,
            };
        }
    }
    const response = await axios({ url, method, data, headers });

    if (response.status > 300) {
        const res = {
            errors: true,
            message: message,
            data: null,
        };
        return res;
    }

    const { length } = Object.keys(response.data);
    const res = {
        error: null,
        message: 'Success',
        data: length > 1 && response.data ,
    };

    return res;
}