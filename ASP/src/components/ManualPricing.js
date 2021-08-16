import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import SwipableFilter from './SwipableFilter';
import ManualPricingSideBar from './ManualPricingSideBar';
const useStyles = makeStyles({
  table: {
    width: 950,
  },
  manualStyles: {
    position: 'absolute',
    top: "175px",
    left: "320px",
    margin: '20px 0',
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

export default function ManualPricing(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [vehicleList, setVehicleList] = useState(rows);

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
              {vehicleList.map((row) => (
                <TableRow key={row.name}>
                  <TableCell align="right">
                    <span className="textStyle">
                      <a className="vin" onClick={() => openConditionReport(row.VIN)}> {row.VIN}</a>
                    </span>
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
            count={vehicleList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </div>
    </>
  );
}
