import callAPI from '../config/api';
import { ILogin } from '../interface/login';

export const login = async (data: ILogin) => {
    const url = 'https://api.myarchery.id//app/v1/auth/login';
    return callAPI({
        url,
        method: 'POST',
        data,
    });
};