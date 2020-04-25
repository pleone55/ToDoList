import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import AlertContext from '../../context/alert/AlertContext';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        width: "25rem",
        height: "26rem",
        margin: "auto",
        marginTop: "60px",
    },
    titleContainer: {
        backgroundColor: "#3f51b5",
    },
    title: {
        marginBottom: "20px",
        color: "white",
        marginTop: "5px",
        padding: "10px"
    },
    formContainer: {
        marginTop: "20px"
    },
    formField: {
        marginBottom: "5px"
    }
}));

const Register = props => {
    const authContext = useContext(AuthContext);
    const { registerUser, error, clearErrors, isAuthenticated } = authContext;

    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;

    const classes = useStyles();

    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/');
        }
        if(error === 'User already exists'){
            setAlert(error, 'error');
            clearErrors();
        }
        //eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = user;

    const onChange = event => setUser({ ...user, [event.target.name]: event.target.value });

    const onSubmit = event => {
        event.preventDefault();
        if(name === '' || email === '' || password === ''){
            setAlert('Please fill out each field appropiately', 'error')
        } else if(confirmPassword !== password){
            setAlert('Passwords do not match', 'error');
        } else {
            registerUser({
                name,
                email,
                password
            });
        }
    };

    return (
        <Paper className={classes.paperStyle} elevation={3}>
            <div className={classes.titleContainer}>
                <Typography className={classes.title} align="center" variant="h4">Register</Typography>
            </div>
            <form onSubmit={onSubmit} className={classes.formContainer}>
                <Grid container justify="center" spacing={2} className={classes.gridContainer}>
                    <Grid item>
                        <TextField 
                            label="Name" 
                            name="name" 
                            type="text"
                            value={name}
                            onChange={onChange}
                            fullWidth
                            autoFocus
                        />
                    </Grid>
                    <Grid item className={classes.formField}>
                        <TextField 
                            label="Email" 
                            name="email" 
                            type="email"
                            value={email}
                            onChange={onChange}
                            fullWidth
                            autoFocus
                        />
                    </Grid>
                    <Grid container justify="center">
                        <Grid item className={classes.formField}>
                            <TextField 
                                label="Password" 
                                name="password"
                                type="password" 
                                value={password}
                                onChange={onChange}
                                fullWidth />
                        </Grid>
                    </Grid>
                    <Grid container justify="center">
                        <Grid item className={classes.formField}>
                            <TextField 
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password" 
                                value={confirmPassword}
                                onChange={onChange}
                                fullWidth />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '50px' }}>
                    <Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Register</Button>
                </Grid>
            </form>
        </Paper>
    );
};

export default Register;