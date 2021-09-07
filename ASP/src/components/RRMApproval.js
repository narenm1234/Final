import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import { Box, FormControl, InputLabel, TableSortLabel, Typography } from '@material-ui/core';
import SwipableFilterRRM from './SwipableFilterRRM';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Pagination from '@material-ui/lab/Pagination';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';

const useStyles = makeStyles({
    table: {
        border: '1px solid #e1e1e1',
    },
    tableRow: {
        borderBottom: '1px solid #e1e1e1',
    },
    tableHeaderRow: {
        borderTop: '1px solid #e1e1e1',
        borderBottom: '1px solid #e1e1e1',
    },
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
    },
});

function createVehicleData(VIN, Year, Make, Model_Trim, auction, mmr, mmb, percent, priced_rate, priced_by, approve) {
    return { VIN, Year, Make, Model_Trim, auction, mmr, mmb, percent, priced_rate, priced_by, approve };
}

const rows = [
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "auction", "00,0000", "00,0000", "+00", "00/00/000", "Employee Name", true),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "auction", "00,0000", "00,0000", "+00", "00/00/000", "Employee Name", false),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "auction", "00,0000", "00,0000", "+00", "00/00/000", "Employee Name", false),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "auction", "00,0000", "00,0000", "+00", "00/00/000", "Employee Name", false),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "auction", "00,0000", "00,0000", "+00", "00/00/000", "Employee Name", false),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "auction", "00,0000", "00,0000", "+00", "00/00/000", "Employee Name", false),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "auction", "00,0000", "00,0000", "+00", "00/00/000", "Employee Name", false),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "auction", "00,0000", "00,0000", "+00", "00/00/000", "Employee Name", false),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "auction", "00,0000", "00,0000", "+00", "00/00/000", "Employee Name", false),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "auction", "00,0000", "00,0000", "+00", "00/00/000", "Employee Name", false),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "auction", "00,0000", "00,0000", "+00", "00/00/000", "Employee Name", false),
    createVehicleData("0000000000000000", "2021", "Make Name", "Model/Trim", "auction", "00,0000", "00,0000", "+00", "00/00/000", "Employee Name", false),

];

const BootstrapInput = withStyles((theme) => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '5px 26px 5px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

export default function RRMApproval(props) {
    const classes = useStyles();

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [pageCount, setPageCount] = React.useState(10);

    const handleChangePageCount = (event) => {
      setPageCount(event.target.value);
    };
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
            pageName: "RRMApproval",
        })
    }
    return (
        <>
            <div>
                <SwipableFilterRRM />

                <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead className={classes.tableHeaderRow} >
              <TableRow className={classes.tableHeadFont}>
                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                                        VIN
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                                        Year
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                                        Make
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                                        Model/Trim
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                                        Auction
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                                        MMR
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                                        MBP
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                                        %
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                                        Priced rate
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                                        Priced By
                                    </TableSortLabel>
                                </TableCell>
                                <TableCell align="center">
                                    <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                                        Approve
                                    </TableSortLabel>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name} className={classes.tableRow}>
                                    <TableCell align="center">
                                        <span className="textStyle">
                                            <a className="vin" onClick={() => openConditionReport(row.VIN)}> {row.VIN}</a>
                                        </span>
                                    </TableCell>
                                    <TableCell align="center">{row.Year}</TableCell>
                                    <TableCell align="center">{row.Make}</TableCell>
                                    <TableCell align="center">{row.Model_Trim}</TableCell>
                                    <TableCell align="center">{row.auction}</TableCell>
                                    <TableCell align="center">{row.mmr}</TableCell>
                                    <TableCell align="center">{row.mmb}</TableCell>
                                    <TableCell align="center">{row.percent}</TableCell>
                                    <TableCell align="center">{row.priced_rate}</TableCell>
                                    <TableCell align="center">{row.priced_by}</TableCell>
                                    <TableCell align="center">{row.approve}
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={row.approve} onChange={() => {}}
                                                    name="checkedB" color="primary" />
                                            } label="" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box display="flex" justifyContent="flex-end" alignItems="center" p={2} className="cpagination">
          <Box pr={2}>Result per page  </Box>
          <Box pr={2}> <FormControl className={classes.margin}>
            <Select labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={pageCount}
              onChange={handleChangePageCount}
              input={<BootstrapInput />}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
            </Select>
          </FormControl>
          </Box>
          <Pagination count={4} color="primary" variant="outlined" />
        </Box>
            </div>
        </>
    );
}
