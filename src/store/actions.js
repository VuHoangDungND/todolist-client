export const getList = (state) => {
    return {
        type: 'GET_LIST',
        payload: state,
    };
};

export const addList = (state) => {
    return {
        type: 'ADD_LIST',
        payload: state,
    };
};

export const updateList = (state) => {
    return {
        type: 'UPDATE_LIST',
        payload: state,
    };
};

export const deleteList = (state) => {
    return {
        type: 'DELETE_LIST',
        payload: state,
    };
};

export const isChange = (state) => {
    return {
        type: 'CHANGE',
        payload: state,
    };
};
