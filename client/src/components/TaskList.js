import React, { useContext, useEffect, useState } from 'react';
import TaskContext from '../context/task/TaskContext';
import AlertContext from '../context/alert/AlertContext';
import { Link } from 'react-router-dom';

import Spinner from '../layout/Spinner';
import Moment from 'react-moment';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    table: {
        width: "100%",
    },
    tableContainer: {
        width: "75%",
        margin: "auto",
        marginTop: "10px",
        marginBottom: "10px"
    },
    title: {
        marginTop: "30px",
        marginLeft: "160px"
    },
    tableCell: {
        borderBottom: "none",
        boxShadow: "none",
    },
    body: {
        "&:hover": {
            backgroundColor: "#F0F0F0"
        }
    },
    deleteIcon: {
        "&:hover": {
            cursor: "pointer"
        }
    },
    completedTask: {
        marginLeft: "165px",
    }
}));

const TaskList = () => {
    const taskContext = useContext(TaskContext);
    const { tasks, getTasks, loading, deleteTask, clearCurrent, updateTask, clearErrors } = taskContext;
    const alertContext = useContext(AlertContext);
    const { setAlert } = alertContext;
    const classes = useStyles();

    const tableHead = [{ name: "Task" }, { name: "Completed" }, { name: "Created At" }, { name: "Updated At" }, { name: "Action" }];
    const [task, setTask] = useState({
        completed: false
    });

    useEffect(() => {
        getTasks();
        //eslint-disable-next-line
    }, []);

    if(tasks !== null && tasks.length === 0 && !loading){
        return <h4 style={{marginLeft: "20px"}}>Please add a task to complete</h4>
    }

    const onChange = event => {
        setTask({ ...task, [event.target.name]: event.target.value });
    }

    return (
        <>
        <Typography variant="h5" className={classes.title}>Your Tasks</Typography>
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableHead.map((head, i) => (
                            <TableCell key={`${head}${i}`}>
                                {head.name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks !== null && !loading ? (
                        tasks.map(task => (
                            task.completed !== true ?
                            <TableRow className={classes.body} key={task._id}>
                                <TableCell component="th" scope="row" className={classes.tableCell}>
                                    {task.taskName}
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Checkbox
                                        checked={task.completed}
                                        onClick={() => {task.completed = true; updateTask(task); setAlert('You have successfully completed your task', 'success');
                                        clearErrors();}}
                                        onChange={onChange}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                        name="completed"
                                    />
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Moment format='MMM Do YYYY, h:mm:ss a'>{task.date}</Moment>
                                </TableCell>
                                <TableCell className={classes.tableCell}>
                                    <Moment format='MMM Do YYYY, h:mm:ss a'>{task.updatedAt}</Moment>
                                </TableCell>
                                <TableCell 
                                    className={classes.tableCell}>
                                        <DeleteForeverIcon onClick={() => {deleteTask(task._id); clearCurrent()}} className={classes.deleteIcon}/>
                                </TableCell>
                            </TableRow>
                            : " "
                        ))
                    ) : (
                            <>
                                <h4 style={{margin: "auto"}}>Please Login to View Tasks</h4>
                                <Spinner />
                            </>
                        )
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <Link to='/completed' className={classes.completedTask}>View Completed Tasks</Link>
    </>
    );
}

export default TaskList;
