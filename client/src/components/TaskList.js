import React, { useState } from 'react';
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
    }
}));

function createData(name, completed, action) {
    return { name, completed, action };
}

const rows = [
    createData('Wash Dishes', 'Incomplete', 'Delete'),
    createData('Wash Dishes', 'Incomplete', 'Delete'),
    createData('Wash Dishes', 'Incomplete', 'Delete'),
    createData('Wash Dishes', 'Incomplete', 'Delete'),
]

const TaskList = () => {
    const [checked, setChecked] = useState(true);
    const classes = useStyles();

    const handleChecked = event => {
        setChecked(event.target.value);
    }

    return (
        <>
            <Typography variant="h5" className={classes.title}>Your Tasks</Typography>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Task</TableCell>
                            <TableCell align="center">Completed</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="center">
                                <Checkbox
                                    checked={checked}
                                    onChange={handleChecked}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />
                            </TableCell>
                            <TableCell align="right"><DeleteForeverIcon/></TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default TaskList;
