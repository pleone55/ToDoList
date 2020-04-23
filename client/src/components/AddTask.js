import React, { useState } from 'react';
import axios from 'axios';
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

import SmallAddButton from './layout/SmallAddButton';
import { FormControl } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
        position: "absolute",
        top: "85%",
        left: "90%"
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
    const[taskName, setTaskName] = useState("");
    const [errors, setErrors] = useState([]);

    const handleSubmit = event => {
        event.preventDefault();
        axios.post("http://localhost:7000/api/tasks", {
            taskName
        })
            .then(response => console.log(response))
            .catch(err => {
                const errResponse = err.response.data.errors;
                const errArr = [];
                for(const key of Object.keys(errResponse)){
                    errArr.push(errResponse[key].message)
                }

                setErrors(errArr);
            });
    };

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
                {errors.map((err, i) => <p key={i}>{err}</p>)}
                <DialogTitle id="form-dialog-title">Add New Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Add a new task to be completed
                    </DialogContentText>
                    <form className={classes.form} onSubmit={handleSubmit}>
                        <FormControl className={classes.formControl}>
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Add Task"
                                type="text"
                                onChange={event => {setTaskName(event.target.value)}}
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
                            <SmallAddButton />
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