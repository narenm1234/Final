import React, {useState, useEffect} from 'react';
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
  createVehicleData("0000000000002015", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
  createVehicleData("0000000000002016", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
  createVehicleData("0000000000002017", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
  createVehicleData("0000000000002018", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
  createVehicleData("0000000000002019", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
  createVehicleData("0000000000002020", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
  createVehicleData("0000000000002021", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
  createVehicleData("0000000000002022", "2021", "Make Name", "Model/Trim", "Region Label", "00/00/0000", "Status", "XYZ"),
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
      vin: VINumber
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

  return (
    <>
      <div>
        <SwipableFilter
          fetchDataBasedOnSearchValue={fetchDataBasedOnSearchValue}
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
