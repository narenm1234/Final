import React, { useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TableSortLabel } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import SwipableFilterMileage from "./SwipableFilterMileage";
import Paginator from "./Pagination";
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
  },
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
  },
});

function createVehicleData(
  VIN,
  Year,
  Make,
  Model_Trim,
  region,
  ground_mileage,
  inspection_mileage,
  difference
) {
  return {
    VIN,
    Year,
    Make,
    Model_Trim,
    region,
    ground_mileage,
    inspection_mileage,
    difference,
  };
}

const rows = [
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
  createVehicleData(
    "0000000000000000",
    "2021",
    "Make Name",
    "Model/Trim",
    "Region Label",
    "00,0000",
    "00,0000",
    "00/00/000"
  ),
];

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "5px 26px 5px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}))(InputBase);

export default function MileageDisc(props) {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState([]);
  const [pageCount, setPageCount] = React.useState(10);

  const handleChangePageCount = (event) => {
    setPageCount(event.target.value);
  };

  const openConditionReport = (VINumber) => {
    props.props.history.push("/conditionreportRequests", {
      vin: VINumber,
      pageName: "Mileage Discrepencies",
    });
  };

  const onChangePage = (data) => {
    setRowsPerPage(data);
  };
  return (
    <>
      <SwipableFilterMileage />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHeaderRow}>
            <TableRow className={classes.tableHeadFont}>
              <TableCell align="center">
                <TableSortLabel
                  active={true}
                  direction={"asc"}
                  onClick={() => {}}
                  IconComponent={() => (
                    <img src={SortIcon} className="tableSortIcon" />
                  )}
                >
                  VIN
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={true}
                  direction={"asc"}
                  onClick={() => {}}
                  IconComponent={() => (
                    <img src={SortIcon} className="tableSortIcon" />
                  )}
                >
                  Year
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={true}
                  direction={"asc"}
                  onClick={() => {}}
                  IconComponent={() => (
                    <img src={SortIcon} className="tableSortIcon" />
                  )}
                >
                  Make
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={true}
                  direction={"asc"}
                  onClick={() => {}}
                  IconComponent={() => (
                    <img src={SortIcon} className="tableSortIcon" />
                  )}
                >
                  Model/Trim
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={true}
                  direction={"asc"}
                  onClick={() => {}}
                  IconComponent={() => (
                    <img src={SortIcon} className="tableSortIcon" />
                  )}
                >
                  Region
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={true}
                  direction={"asc"}
                  onClick={() => {}}
                  IconComponent={() => (
                    <img src={SortIcon} className="tableSortIcon" />
                  )}
                >
                  Grounding Mileage
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={true}
                  direction={"asc"}
                  onClick={() => {}}
                  IconComponent={() => (
                    <img src={SortIcon} className="tableSortIcon" />
                  )}
                >
                  Inspection Mileage
                </TableSortLabel>
              </TableCell>
              <TableCell align="center">
                <TableSortLabel
                  active={true}
                  direction={"asc"}
                  onClick={() => {}}
                  IconComponent={() => (
                    <img src={SortIcon} className="tableSortIcon" />
                  )}
                >
                  Differnence
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsPerPage.map((row) => (
              <TableRow key={row.name} className={classes.tableRow}>
                {/* <TableCell align="center">
                  <span className="textStyle">
                    <a
                      className="vin"
                      onClick={() => openConditionReport(row.VIN)}
                    >
                      {" "}
                      {row.VIN}
                    </a>
                  </span>
                </TableCell>
                <TableCell align="center">{row.Year}</TableCell>
                <TableCell align="center">{row.Make}</TableCell>
                <TableCell align="center">{row.Model_Trim}</TableCell>
                <TableCell align="center">{row.region}</TableCell>
                <TableCell align="center">{row.inspection_mileage}</TableCell>
                <TableCell align="center">{row.ground_mileage}</TableCell>
                <TableCell align="center">{row.difference}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Paginator
          label="Result per page"
          showItemsPerPage={10}
          pages={[10, 20, 30, 40]}
          data={rows}
          onChangePage={onChangePage}
        />
      </TableContainer>
    </>
  );
}
