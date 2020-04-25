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
    CLEAR_TASKS,
    CLEAR_ERRORS
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

    //update task
    const updateTask = async(task) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`http://localhost:7000/api/tasks/${task._id}`, task, config);
            dispatch({ type: UPDATE_TASK, payload: res.data });
        } catch (err) {
            dispatch({ type: TASK_ERROR, payload: err.response});
        }
    }

    //Clear Task
    const clearTasks = () => {
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

    //clear errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <TaskContext.Provider
            value={{
                tasks: state.tasks,
                current: state.current,
                error: state.error,
                addTask,
                getTasks,
                clearTasks,
                setCurrent,
                clearCurrent,
                deleteTask,
                updateTask,
                clearErrors
            }}
        >
            { props.children }
        </TaskContext.Provider>
    )
};
export default TaskState;