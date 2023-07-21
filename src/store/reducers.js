import * as contactService from '../services/contactService';

//initial state
let localState = JSON.parse(localStorage.getItem('todolist'));

const initstate = {
    currentList: [],
    temporarilyList: [],
    isIgnore: false,
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
            fetchApi = async () => {
                await contactService.add(action.payload);
            };

            fetchApi();

            localStorage.setItem('todolist', JSON.stringify(state.currentList));
            return {
                ...state,
                currentList: todoList,
            };

        case 'UPDATE_LIST':
            fetchApi = async () => await contactService.update(action.payload);

            fetchApi();

            todoList = state.currentList;
            todoList = todoList.map((todo) => {
                if (todo.id === action.payload.id) return { ...action.payload };
                else return todo;
            });

            return {
                ...state,
                currentList: [...state.currentList, action.payload],
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
                isIgnore: false,
            };

        case 'DELETE_ALL_LIST':
            fetchApi = async () => {
                todoList = state.currentList;
                state.temporarilyList.map(async (todo) => {
                    await contactService.del(todo);
                });

                state.temporarilyList.map((todo) => {
                    todoList = todoList.filter((store) => {
                        return store.id !== todo.id;
                    });
                    return todo;
                });
            };
            fetchApi();

            localStorage.setItem('todolist', JSON.stringify(todoList));
            return {
                ...state,
                currentList: todoList,
                temporarilyList: [],
                isIgnore: false,
            };

        case 'ADD_TEMP_LIST':
            return {
                ...state,
                temporarilyList: [...state.temporarilyList, action.payload],
                isIgnore: false,
            };

        case 'REMOVE_TEMP_LIST':
            todoList = state.temporarilyList;
            todoList = todoList.filter((todo) => {
                return todo.id !== action.payload.id;
            });
            return {
                ...state,
                temporarilyList: todoList,
            };

        case 'IGNORE_TEMP_LIST':
            return {
                ...state,
                isIgnore: true,
            };
        default:
            return state;
    }
};

export default reducers;
