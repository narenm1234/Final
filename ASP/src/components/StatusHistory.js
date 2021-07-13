import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createVehicleData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createVehicleData("Vehicle Status", "Employee Name/ID", "00/00/2021", "00:00 am/pm"),
    createVehicleData("Vehicle Status", "Employee Name/ID", "00/00/2021", "00:00 am/pm"),
    createVehicleData("Vehicle Status", "Employee Name/ID", "00/00/2021", "00:00 am/pm"),
    createVehicleData("Vehicle Status", "Employee Name/ID", "00/00/2021", "00:00 am/pm"),
    createVehicleData("Vehicle Status", "Employee Name/ID", "00/00/2021", "00:00 am/pm"),
    createVehicleData("Vehicle Status", "Employee Name/ID", "00/00/2021", "00:00 am/pm"),
    createVehicleData("Vehicle Status", "Employee Name/ID", "00/00/2021", "00:00 am/pm"),
    createVehicleData("Vehicle Status", "Employee Name/ID", "00/00/2021", "00:00 am/pm"),
    createVehicleData("Vehicle Status", "Employee Name/ID", "00/00/2021", "00:00 am/pm"),
    createVehicleData("Vehicle Status", "Employee Name/ID", "00/00/2021", "00:00 am/pm"),
    createVehicleData("Vehicle Status", "Employee Name/ID", "00/00/2021", "00:00 am/pm"),
    createVehicleData("Vehicle Status", "Employee Name/ID", "00/00/2021", "00:00 am/pm"),
];

export default function StatusHistory() {
    const classes = useStyles();

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">User/ID</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Time</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.calories}</TableCell>
                            <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
