import {
    ADD_TASK,
    GET_TASKS,
    TASK_ERROR,
    CLEAR_TASKS
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
        default:
            return state;
    }
};