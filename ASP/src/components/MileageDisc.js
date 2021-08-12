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
import SwipableFilterMileage from './SwipableFilterMileage';
const useStyles = makeStyles({
    table: {
        width: 950,
    },
    manualStyles: {
        position: 'absolute',
        top: "150px",
        left: "320px",
        margin: '20px',
        width: 950,
    },
    filterStyles: {
        position: 'absolute',
        top: "90",
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

function createVehicleData(VIN, Year, Make, Model_Trim, region, ground_mileage, inspection_mileage, difference) {
    return { VIN, Year, Make, Model_Trim, region, ground_mileage, inspection_mileage, difference };
}

const rows = [
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00,0000", "00,0000", "00/00/000"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00,0000", "00,0000", "00/00/000"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00,0000", "00,0000", "00/00/000"),

    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00,0000", "00,0000", "00/00/000"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00,0000", "00,0000", "00/00/000"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00,0000", "00,0000", "00/00/000"),

    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00,0000", "00,0000", "00/00/000"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00,0000", "00,0000", "00/00/000"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00,0000", "00,0000", "00/00/000"),

    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00,0000", "00,0000", "00/00/000"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00,0000", "00,0000", "00/00/000"),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "Region Label", "00,0000", "00,0000", "00/00/000"),
];

export default function MileageDisc(props) {
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
    const openConditionReport = (VINumber) => {
        props.props.history.push('/conditionreportRequests', {
            vin: VINumber,
            pageName: "Mileage Discrepencies",
        })
    }
    return (
        <>
            <SwipableFilterMileage />
            <TableContainer component={Paper} className={classes.manualStyles}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">VIN</TableCell>
                            <TableCell align="center">Year</TableCell>
                            <TableCell align="center">Make</TableCell>
                            <TableCell align="center">Model/Trim</TableCell>
                            <TableCell align="center">Region</TableCell>
                            <TableCell align="center">Grounding Mileage</TableCell>
                            <TableCell align="center">Inspection Mileage</TableCell>
                            <TableCell align="center">Differnence</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell align="right">
                                    <span className="textStyle">
                                        <a className="vin" onClick={() => openConditionReport(row.VIN)}> {row.VIN}</a>
                                    </span>
                                </TableCell>
                                <TableCell align="right">{row.Year}</TableCell>
                                <TableCell align="right">{row.Make}</TableCell>
                                <TableCell align="right">{row.Model_Trim}</TableCell>
                                <TableCell align="right">{row.region}</TableCell>
                                <TableCell align="right">{row.inspection_mileage}</TableCell>
                                <TableCell align="right">{row.ground_mileage}</TableCell>
                                <TableCell align="right">{row.difference}</TableCell>
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
        </>
    );
}
