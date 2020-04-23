import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    AddTask: {
        marginLeft: "90%"
    }
}));

const SmallAddButton = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Fab 
                size="small" 
                color="primary" 
                aria-label="add" 
                justifyContent="right"
                className={classes.AddTask}
            >
                <AddIcon />
            </Fab>
        </div>
    )
}
export default SmallAddButton;