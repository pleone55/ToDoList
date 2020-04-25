import React, { useContext } from 'react';
import AlertContext from '../context/alert/AlertContext';

import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Alerts = () => {
    const alertContext = useContext(AlertContext);
    const { alerts } = alertContext;
    const classes = useStyles();

    return (
        alerts.length > 0 && alerts.map(alert => (
            <div className={classes.root}>
                <Alert key={alert.id} severity={`${alert.type}`}>{alert.msg}</Alert>
            </div>
        ))
    );
};
export default Alerts;