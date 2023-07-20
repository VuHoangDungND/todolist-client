import * as contactService from '../services/contactService';

//initial state
let localState = JSON.parse(localStorage.getItem('todolist'));

const initstate = {
    currentList: [],
    isChange: false,
    ...localState,
};

let fetchApi, todoList;

const reducers = (state = initstate, action) => {
    switch (action.type) {
        case 'GET_LIST':
            return {
                ...state,
                currentList: action.payload,
            };

        case 'ADD_LIST':
            fetchApi = async () => await contactService.add(action.payload);

            fetchApi();
            localStorage.setItem('todolist', JSON.stringify(state.currentList));
            return {
                ...state,
                currentList: [...state.currentList, ...action.payload],
            };

        case 'UPDATE_LIST':
            fetchApi = async () => await contactService.update(action.payload);

            fetchApi();

            todoList = state.currentList;
            todoList = todoList.map((todo) => {
                if (todo.id === action.payload.id) return { ...action.payload };
                else return todo;
            });

            localStorage.setItem('todolist', JSON.stringify(todoList));
            return {
                ...state,
                currentList: todoList,
            };

        case 'DELETE_LIST':
            fetchApi = async () => await contactService.del(action.payload);

            fetchApi();

            todoList = state.currentList;
            todoList = todoList.filter((todo) => {
                return todo.id !== action.payload.id;
            });

            localStorage.setItem('todolist', JSON.stringify(todoList));
            return {
                ...state,
                currentList: todoList,
            };

        case 'CHANGE':
            console.log(action.payload);
            return {
                ...state,
                isChange: action.payload,
            };

        default:
            return state;
    }
};

export default reducers;
