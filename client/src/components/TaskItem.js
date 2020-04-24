import React, { useContext } from 'react';
import TaskContext from '../context/task/TaskContext';
import axios from 'axios';

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
        width: "80%",
        margin: "auto",
        marginTop: "10px",
    },
    title: {
        marginTop: "30px",
        marginLeft: "130px"
    },
    tableCell: {
        borderBottom: "none",
        boxShadow: "none",
    },
    body: {
        "&:hover": {
            backgroundColor: "#F0F0F0"
        }
    }
}));

const TaskItem = ({ task }) => {
    const classes = useStyles();
    const taskContext = useContext(TaskContext);
    const { setCurrent, clearCurrent } = taskContext;

    const {_id, taskName, completed} = task;

    const tableHead = [{ name: "Task" }, { name: "Completed" }, { name: "Action" }];

    // const handleChecked = event => {
    //     axios.put("http://localhost:7000/api/tasks/" + id, {
    //         completed
    //     })
    //         .then(response => console.log(response));
    // };

    // const handleDelete = taskId => {
    //     axios.delete("http://localhost:7000/api/tasks/" + taskId)
    // }

    return (
        <>
        <Typography variant="h5" className={classes.title}>Your Tasks</Typography>
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {tableHead.map((head, i) => (
                            <TableCell key={`${head}${i}`} className={classes.tableCell}>
                                {head.name}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow className={classes.body}>
                        <TableCell component="th" scope="row" className={classes.tableCell}>
                            {taskName}
                        </TableCell>
                        <TableCell className={classes.tableCell}>
                            <Checkbox
                                completed={completed}
                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        </TableCell>
                        <TableCell className={classes.tableCell}><DeleteForeverIcon/></TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    </>
    )
};
export default TaskItem;