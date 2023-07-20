import axios from 'axios';

const httpRequest = axios.create({
    baseURL: 'http://localhost:5000/api/',
});

export const get = async (path, option = {}) => {
    const respone = await httpRequest.get(path, option);

    return respone;
};

export const post = async (path, data, option = {}) => {
    const respone = await httpRequest.post(path, data, option);

    return respone;
};

export const put = async (path, data, option = {}) => {
    const respone = await httpRequest.put(path, data, option);

    return respone;
};

export default httpRequest;
