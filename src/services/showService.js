import * as httpRequest from '../utils/httpRequest';

export const show = async () => {
    try {
        const res = await httpRequest.get(`/`);
        return res;
    } catch (error) {
        console.log(error);
    }
};
