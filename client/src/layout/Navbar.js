import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/auth/AuthContext';
import TaskContext from '../context/task/TaskContext';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    loginButton: {
        "&:hover": {
            backgroundColor: "transparent"
        }
    }
}));

const Navbar = () => {
    const userContext = useContext(AuthContext);
    const taskContext = useContext(TaskContext);

    const { isAuthenticated, loadUser, logout, user } = userContext;
    const { clearTasks } = taskContext;
    const classes = useStyles();

    useEffect(() => {
        loadUser();
        //eslint-disable-next-line
    }, []);

    const onLogout = () => {
        logout();
        clearTasks();
    }

    const authLinks = (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Welcome {user && user.name}
                    </Typography>
                    <Button onClick={onLogout} color="inherit" disableRipple className={classes.loginButton}>Logout</Button>
                </Toolbar>
            </AppBar>
        </div>
    );

    const guestLinks = (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Welcome
                    </Typography>
                    <Link to="/register"><Button color="inherit" disableRipple className={classes.loginButton}>Register</Button></Link><span>
                    <Link to="/login"><Button color="inherit" disableRipple className={classes.loginButton}>Login</Button></Link>
                    </span>
                </Toolbar>
            </AppBar>
        </div>
    );

    return (
        <div className={classes.root}>
            {isAuthenticated ? authLinks : guestLinks}
        </div>
    )
}
export default Navbar;