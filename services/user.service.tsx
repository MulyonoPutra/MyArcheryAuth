import callAPI from '../config/api';

export const findUser = () => {
    const url = 'https://api.myarchery.id//app/v1/user?';
    return callAPI({
        url,
        method: 'GET',
        token: true,
    });
};