import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/AuthContext';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paperStyle: {
        width: "25rem",
        height: "20rem",
        margin: "auto",
        marginTop: "100px",
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
    gridContainer: {

    }
}));

const Login = props => {
    const authContext = useContext(AuthContext);
    const { loginUser, error, clearErrors, isAuthenticated } = authContext;
    const classes = useStyles();

    useEffect(() => {
        if(isAuthenticated){
            props.history.push("/");
        }
    }, [isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;

    //set the user logging in 
    const onChange = event => setUser({ ...user, [event.target.name]: event.target.value });

    const onSubmit = event => {
        event.preventDefault();
        loginUser({
            email,
            password
        });
    };

    return (
        <Paper className={classes.paperStyle} elevation={3}>
            <div className={classes.titleContainer}>
                <Typography className={classes.title} align="center" variant="h4">Login</Typography>
            </div>
            <form onSubmit={onSubmit} className={classes.formContainer}>
                <Grid container justify="center" spacing={5} className={classes.gridContainer}>
                    <Grid item>
                        <TextField 
                            label="Username" 
                            name="email" 
                            type="email"
                            value={email}
                            onChange={onChange}
                            fullWidth
                            autoFocus
                        />
                    </Grid>
                    <Grid container justify="center">
                        <Grid item>
                            <TextField 
                                name="password" 
                                label="Password" 
                                type="password" 
                                value={password}
                                onChange={onChange}
                                fullWidth />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container justify="center" style={{ marginTop: '50px' }}>
                    <Button type="submit" variant="outlined" color="primary" style={{ textTransform: "none" }}>Login</Button>
                </Grid>
            </form>
        </Paper>
    )
};
export default Login;