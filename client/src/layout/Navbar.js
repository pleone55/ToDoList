import React from 'react';
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
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h5" className={classes.title}>
                        Welcome
                    </Typography>
                    <Button color="inherit" disableRipple className={classes.loginButton}>Login</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}
export default Navbar;