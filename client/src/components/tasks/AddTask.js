import React, { useState, useContext, useEffect } from 'react';
import TaskContext from '../../context/task/TaskContext';
import AlertContext from '../../context/alert/AlertContext';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InputAdornment from '@material-ui/core/InputAdornment';

import SmallAddButton from '../../layout/SmallAddButton';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    dialog: {
        padding: "10px"
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 100,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

const AddTask = () => {
    const classes = useStyles();
    const[open, setOpen] = useState(false);
    const taskContext = useContext(TaskContext);
    const { addTask, current, clearCurrent, clearErrors, error } = taskContext;
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const[task, setTask] = useState({
        taskName: '',
        completed: false
    });

    useEffect(() => {
        if(error === 'Task is required') {
            setAlert(error, 'error');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error]);

    useEffect(() => {
        if(current !== null){
            setTask(current);
        } else {
            setTask({
                taskName: '',
                completed: false,
                date: new Date()
            });
        }
    }, [taskContext, current]);

    const { taskName } = task;

    //set the new task created
    const onChange = event => setTask({ ...task, [event.target.name]: event.target.value });

    const handleSubmit = event => {
        event.preventDefault();
        if(current === null){
            addTask(task);
        }
        if(taskName === '') {
            setAlert('Please fill in all fields', 'error');
        }
        clearAll();
        handleClose();
    };

    //clear the field
    const clearAll = () => {
        clearCurrent();
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <Dialog 
                open={open} 
                onClose={handleClose} 
                aria-labelledby="form-dialog-title"
                fullWidth
                className={classes.dialog}
            >
                <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a new task to be completed
                    </DialogContentText>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                name="taskName"
                                value={taskName}
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Add Task"
                                type="text"
                                onChange={onChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AssignmentIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </FormControl>
                        <DialogActions>
                            <SmallAddButton onClick={handleClose}/>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>
            <div className={classes.root}>
                <Fab color="primary" aria-label="add" onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </div>
        </div>
    );
}
export default AddTask;