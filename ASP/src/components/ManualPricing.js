import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import SwipableFilter from './SwipableFilter';
import { Box, FormControl, InputLabel, TableSortLabel, Typography } from '@material-ui/core';
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
  tableHeadFont: {
  fontWeight: 600
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
  createVehicleData("0704303398645911", "2015", "CX-5", "A1", "Florida", "01/23/2015", "Pending", "XYZ"),
  createVehicleData("6672920469419405", "2016", "Mazda3", "B1", "Indiana", "04/26/2016", "Pending", "XYZ"),
  createVehicleData("7660443910307535", "2017", "Mazda6", "C1", "Texas", "08/13/2017", "Pending", "XYZ"),
  createVehicleData("2769586046735830", "2018", "MX-5", "A2", "Texas", "12/17/2018", "Completed", "XYZ"),
  createVehicleData("2563959933582287", "2019", "Mazda3", "B2", "Florida", "07/30/2019", "Completed", "XYZ"),
  createVehicleData("8309130666254027", "2020", "Mazda3", "C2", "Indiana", "03/14/2020", "Completed", "XYZ"),
  createVehicleData("3180783430963337", "2021", "Mazda6", "A3", "Indiana", "11/15/2021", "Pending", "XYZ"),
  createVehicleData("0087479668724131", "2022", "CX-5", "B3", "Texas", "10/24/2022", "Completed", "XYZ"),
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

export default function ManualPricing(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [vehicleList, setVehicleList] = useState(rows);
  const [pageCount, setPageCount] = React.useState(10);

  const handleChangePageCount = (event) => {
    setPageCount(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const openConditionReport = (VINumber) => {
    props.props.history.push('/conditionreportRequests', {
      vin: VINumber,
      pageName: "Manual Pricing",
    })
  }

  const fetchDataBasedOnSearchValue = (searchText) => {
    const vehicleListCopy = [...rows];
    if (searchText) {
      const filteredList = vehicleListCopy.filter(row => {
        return row.VIN.indexOf(searchText) !== -1;
      });
      setVehicleList(filteredList);
    } else {
      setVehicleList(rows);
    }
  }

  const fetchDataBasedOnFilters = (filterInput) => {
    let vehicleListCopy = [...rows];
    if (filterInput.vin) {
      vehicleListCopy = vehicleListCopy.filter(row => {
        return row.VIN.indexOf(filterInput.vin) !== -1 || row.Year >= filterInput.yearFrom && row.Year <= filterInput.yearTo;
      });
    }
    if (filterInput.yearFrom && filterInput.yearTo) {
      vehicleListCopy = vehicleListCopy.filter(row => {
        return row.Year >= filterInput.yearFrom && row.Year <= filterInput.yearTo;
      });
    }
    if (filterInput.make) {
      vehicleListCopy = vehicleListCopy.filter(row => {
        return row.Make.indexOf(filterInput.make) !== -1;
      });
    }
    if (filterInput.inspectionStatus) {
      vehicleListCopy = vehicleListCopy.filter(row => {
        return row.Inspection_Status.indexOf(filterInput.inspectionStatus) !== -1;
      });
    }
    if (filterInput.groundingRegion) {
      vehicleListCopy = vehicleListCopy.filter(row => {
        return row.Grounding_Region.indexOf(filterInput.groundingRegion) !== -1;
      });
    }
    if (filterInput.auctionCode) {
      vehicleListCopy = vehicleListCopy.filter(row => {
        return row.Action_Code.indexOf(filterInput.auctionCode) !== -1;
      });
    }
    if (filterInput.inspectionDateFrom && filterInput.inspectionDateTo) {
      vehicleListCopy = vehicleListCopy.filter(row => {
        const dateTs = Date.parse(row.Inspection_Date);
        return dateTs >= Date.parse(filterInput.inspectionDateFrom) && dateTs <= Date.parse(filterInput.inspectionDateTo);
      });
    }
    setVehicleList(vehicleListCopy);
  }

  const resetFilterList = () => {
    setVehicleList(rows);
  }

  return (
    <>
      <div>
        <SwipableFilter
          fetchDataBasedOnSearchValue={fetchDataBasedOnSearchValue}
          fetchDataBasedOnFilters={fetchDataBasedOnFilters}
          resetFilterList={resetFilterList}
        />

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
                    Grounding Region
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                    Inspection Date
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                    Inspection Status
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  <TableSortLabel active={true} direction={'asc'} onClick={() => { }}>
                    Action Code
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vehicleList.map((row, index) => (
                <TableRow key={index} className={classes.tableRow} >
                  <TableCell align="center" >
                    <span className="textStyle">
                      <a className="vin" onClick={() => openConditionReport(row.VIN)}> {row.VIN}</a>
                    </span>
                  </TableCell>
                  <TableCell align="center" >{row.Year}</TableCell>
                  <TableCell align="center">{row.Make}</TableCell>
                  <TableCell align="center">{row.Model_Trim}</TableCell>
                  <TableCell align="center">{row.Grounding_Region}</TableCell>
                  <TableCell align="center">{row.Inspection_Date}</TableCell>
                  <TableCell align="center">{row.Inspection_Status}</TableCell>
                  <TableCell align="center">{row.Action_Code}</TableCell>
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
