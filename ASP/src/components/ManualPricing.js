import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
const useStyles = makeStyles({
    table: {
        width: 950,
    },
    manualStyles: {
        position: 'absolute',
        top: "90px",
        left: "320px",
        margin: '20px',
        width: 950,
    },
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
    },
});

function createVehicleData(VIN, Year, Make, Model_Trim, Grounding_Region, Inspection_Date, Inspection_Status, Action_Code) {
    return { VIN, Year, Make, Model_Trim, Grounding_Region, Inspection_Date, Inspection_Status, Action_Code };
}

const rows = [
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
];

export default function ManualPricing() {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    return (
        <TableContainer component={Paper} className={classes.manualStyles}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">VIN</TableCell>
                        <TableCell align="center">Year</TableCell>
                        <TableCell align="center">Make</TableCell>
                        <TableCell align="center">Model/Trim</TableCell>
                        <TableCell align="center">Grounding Region</TableCell>
                        <TableCell align="center">Inspection Date</TableCell>
                        <TableCell align="center">Inspection Status</TableCell>
                        <TableCell align="center">Action Code</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell align="right">
                                {row.VIN}
                            </TableCell>
                            <TableCell align="right">{row.Year}</TableCell>
                            <TableCell align="right">{row.Make}</TableCell>
                            <TableCell align="right">{row.Model_Trim}</TableCell>
                            <TableCell align="right">{row.Grounding_Region}</TableCell>
                            <TableCell align="right">{row.Inspection_Date}</TableCell>
                            <TableCell align="right">{row.Inspection_Status}</TableCell>
                            <TableCell align="right">{row.Action_Code}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>

            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
