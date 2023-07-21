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

export const deleteAllList = (state) => {
    return {
        type: 'DELETE_ALL_LIST',
        payload: state,
    };
};

export const addTempList = (state) => {
    return {
        type: 'ADD_TEMP_LIST',
        payload: state,
    };
};

export const removeTempList = (state) => {
    return {
        type: 'REMOVE_TEMP_LIST',
        payload: state,
    };
};

export const ignoreTempList = (state) => {
    return {
        type: 'IGNORE_TEMP_LIST',
        payload: state,
    };
};
