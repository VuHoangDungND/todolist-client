import * as httpRequest from '../utils/httpRequest';

export const add = async (data) => {
    try {
        const res = await httpRequest.post(`/add`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const update = async (data) => {
    try {
        const res = await httpRequest.put(`/update`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};

export const del = async (data) => {
    try {
        const res = await httpRequest.post(`/delete`, data);
        return res;
    } catch (error) {
        console.log(error);
    }
};
