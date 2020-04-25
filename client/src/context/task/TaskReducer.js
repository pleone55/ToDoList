import {
    ADD_TASK,
    GET_TASKS,
    TASK_ERROR,
    CLEAR_TASKS,
    SET_CURRENT,
    CLEAR_CURRENT,
    DELETE_TASK,
    UPDATE_TASK
} from '../types';

export default (state, action) => {
    switch(action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [action.payload, ...state.tasks],
                loading: false
            };
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false
            };
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload),
                loading: false
            };
        case UPDATE_TASK:
            return {
                ...state,
                //for each task map through the array of tasks and find the matching payload id to update
                //else return the task as is
                tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task),
                loading: false,
            };
        case TASK_ERROR:
            return {
                ...state,
                error: action.payload
            };
        case CLEAR_TASKS:
            return {
                ...state,
                tasks: null,
                error: null,
                current: null
            };
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            };
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        default:
            return state;
    }
};