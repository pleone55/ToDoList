import React, { useReducer } from 'react';
import axios from 'axios';
import TaskContext from './TaskContext';
import TaskReducer from './TaskReducer';
import {
    ADD_TASK,
    TASK_ERROR,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_TASK,
    DELETE_TASK,
    GET_TASKS,
    CLEAR_TASKS
} from '../types';

const TaskState = props => {
    const initialState = {
        tasks: null,
        current: null,
        error: null
    }

    //pull out state and dispatch from reducer to dispatch objects to the reducer
    const[state, dispatch] = useReducer(TaskReducer, initialState);

    //Get Tasks
    const getTasks = async() => {
        try {
            const res = await axios.get('http://localhost:7000/api/tasks');
            dispatch({ type: GET_TASKS, payload: res.data });
        } catch (err) {
            dispatch({ type: TASK_ERROR, payload: err.response.msg });
        }
    };

    //Add Tasks
    const addTask = async(task) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        try {
            const res = await axios.post('http://localhost:7000/api/tasks', task, config);
            dispatch({ type: ADD_TASK, payload: res.data });
        } catch (err) {
            dispatch({ type: TASK_ERROR, payload: err.response.msg });
        }
    };

    //delete task
    const deleteTask = async(id) => {
        try {
            await axios.delete(`http://localhost:7000/api/tasks/${id}`);
            dispatch({ type: DELETE_TASK, payload: id });
        } catch (err) {
            dispatch({ type: TASK_ERROR, payload: err.response.msg });
        }
    };

    //Clear Task
    const clearTask = () => {
        dispatch({ type: CLEAR_TASKS });
    };

    //Set Current Task
    const setCurrent = task => {
        dispatch({ type: SET_CURRENT, payload: task });
    };

    //Clear Current Contact
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT });
    };

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                current: state.current,
                error: state.error,
                addTask,
                getTasks,
                clearTask,
                setCurrent,
                clearCurrent,
                deleteTask
            }}
        >
            { props.children }
        </TaskContext.Provider>
    )
};
export default TaskState;