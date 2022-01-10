import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, TableSortLabel } from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import SortIcon from "../assets/WebFont/sort.svg";

const useStyles = makeStyles({
  table: {
    border: "1px solid #e1e1e1",
  },
  tableRow: {
    borderBottom: "1px solid #e1e1e1",
  },
  tableHeaderRow: {
    borderTop: "1px solid #e1e1e1",
    borderBottom: "1px solid #e1e1e1",
    backgroundColor: "#f7f7f8",
  },
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
  },
});

function createVehicleData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createVehicleData(
    "Vehicle Status",
    "Employee Name/ID",
    "00/00/2021",
    "00:00 am/pm"
  ),
  createVehicleData(
    "Vehicle Status",
    "Employee Name/ID",
    "00/00/2021",
    "00:00 am/pm"
  ),
  createVehicleData(
    "Vehicle Status",
    "Employee Name/ID",
    "00/00/2021",
    "00:00 am/pm"
  ),
  createVehicleData(
    "Vehicle Status",
    "Employee Name/ID",
    "00/00/2021",
    "00:00 am/pm"
  ),
  createVehicleData(
    "Vehicle Status",
    "Employee Name/ID",
    "00/00/2021",
    "00:00 am/pm"
  ),
  createVehicleData(
    "Vehicle Status",
    "Employee Name/ID",
    "00/00/2021",
    "00:00 am/pm"
  ),
  createVehicleData(
    "Vehicle Status",
    "Employee Name/ID",
    "00/00/2021",
    "00:00 am/pm"
  ),
  createVehicleData(
    "Vehicle Status",
    "Employee Name/ID",
    "00/00/2021",
    "00:00 am/pm"
  ),
  createVehicleData(
    "Vehicle Status",
    "Employee Name/ID",
    "00/00/2021",
    "00:00 am/pm"
  ),
  createVehicleData(
    "Vehicle Status",
    "Employee Name/ID",
    "00/00/2021",
    "00:00 am/pm"
  ),
  createVehicleData(
    "Vehicle Status",
    "Employee Name/ID",
    "00/00/2021",
    "00:00 am/pm"
  ),
  createVehicleData(
    "Vehicle Status",
    "Employee Name/ID",
    "00/00/2021",
    "00:00 am/pm"
  ),
];

export default function StatusHistory(props) {
  const classes = useStyles();
  const [inspectiondata, setinspectiondata] = useState(props.inspectiondata);

  return (
    <Box>
      <Box display={"flex"} alignItems={"center"} mb={2}>
        <Box className="resultForVin">Results for VIN: {inspectiondata.vin}</Box>
        <Box pl={2} pt={1}>
          <ClearIcon color="secondary" fontSize="small" />
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableheaders}>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={"asc"}
                  onClick={() => {}}
                  IconComponent={() => (
                    <img src={SortIcon} className="tableSortIcon" />
                  )}
                >
                  Status
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={"asc"}
                  onClick={() => {}}
                  IconComponent={() => (
                    <img src={SortIcon} className="tableSortIcon" />
                  )}
                >
                  User/ID
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={"asc"}
                  onClick={() => {}}
                  IconComponent={() => (
                    <img src={SortIcon} className="tableSortIcon" />
                  )}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={true}
                  direction={"asc"}
                  onClick={() => {}}
                  IconComponent={() => (
                    <img src={SortIcon} className="tableSortIcon" />
                  )}
                >
                  Time
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.calories}</TableCell>
                <TableCell>{row.fat}</TableCell>
                <TableCell>{row.carbs}</TableCell>
                {/* <TableCell>{row.protein}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
