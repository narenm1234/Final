import React, { useState ,useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TableSortLabel } from "@material-ui/core";
import SwipableFilterRRM from "./SwipableFilterRRM";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paginator from "./Pagination";
import SortIcon from "../assets/WebFont/sort.svg";
import Check from "@material-ui/icons/Check";
import {RRMList} from "../service/api"

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
  auction,
  mmr,
  mmb,
  percent,
  priced_rate,
  priced_by,
  approve
) {
  return {
    VIN,
    Year,
    Make,
    Model_Trim,
    auction,
    mmr,
    mmb,
    percent,
    priced_rate,
    priced_by,
    approve,
  };
}

const rows = [
  createVehicleData(
    "0000000000000001",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    true
  ),
  createVehicleData(
    "0000000000000002",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000003",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000004",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000005",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000006",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000007",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000008",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000009",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000010",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000011",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000012",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000013",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    true
  ),
  createVehicleData(
    "0000000000000014",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000015",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000016",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000017",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000018",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000019",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000020",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000021",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000022",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000023",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000024",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000025",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    true
  ),
  createVehicleData(
    "0000000000000026",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000027",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000028",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000029",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000030",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000031",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000032",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000033",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000034",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000035",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000036",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000037",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    true
  ),
  createVehicleData(
    "0000000000000038",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000039",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000040",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000041",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000042",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000043",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000044",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000045",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000046",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000047",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000048",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000049",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    true
  ),
  createVehicleData(
    "0000000000000050",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000051",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000052",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000053",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000054",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000055",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000056",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000057",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000058",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000059",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000060",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000061",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    true
  ),
  createVehicleData(
    "0000000000000062",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000063",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000064",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000065",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000066",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000067",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000068",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000069",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000070",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000071",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
  createVehicleData(
    "0000000000000072",
    "2021",
    "Make Name",
    "Model/Trim",
    "auction",
    "00,0000",
    "00,0000",
    "+00",
    "00/00/000",
    "Employee Name",
    false
  ),
];

export default function RRMApproval(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState([]);
  const [rrmList, setRrmList] = useState([]);
  const [rrmListRows, setRrmListRows] = useState([]);
  //const [pageCount, setPageCount] = React.useState(10);

  /*   const handleChangePageCount = (event) => {
          setPageCount(event.target.value);
      };
      const handleChangePage = (event, newPage) => {
          setPage(newPage);
      };
  
      const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
      }; */

  useEffect(() => {
    getRRMApprovalDetails();
  }, []);
  async function getRRMApprovalDetails() {
    let apiResponse = await RRMList();
    console.log('RRMList------->', apiResponse)
    setRrmListRows(apiResponse.data);
  }
  const openConditionReport = (VINumber) => {
    props.props.history.push("/conditionreportRequests", {
      vin: VINumber,
      pageName: "RRMApproval",
    });
  };
  const onChangePage = (data) => {
    setRrmList(data);
  };

  const onChangeApprove = (row) => {
    // let updatedRowsPerPage = rrmList.map((item) => {
    //   if (item.vin === row.vin) {
    //     item.approve = !item.approve;
    //   }
    //   return item;
    // });
    // setRrmList(updatedRowsPerPage);
  };

  return (
    <>
      <div>
        <SwipableFilterRRM />
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
                    Auction
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
                    MMR
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
                    MBP
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
                    %
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
                    Priced rate
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
                    Priced By
                  </TableSortLabel>
                </TableCell>
                <TableCell align="center">
                  Approve
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rrmList?.map((row, index) => (
                <TableRow key={index} className={classes.tableRow}>
                  <TableCell align="center">
                    <span className="textStyle">
                      <a
                        className="vin"
                        onClick={() => openConditionReport(row.VIN)}
                      >
                        {" "}
                        {row.vin}
                      </a>
                    </span>
                  </TableCell>
                  <TableCell align="center">{row.modelYear}</TableCell>
                  <TableCell align="center">{row.make}</TableCell>
                  <TableCell align="center">{row.model}</TableCell>
                  <TableCell align="center">{row.auction}</TableCell>
                  <TableCell align="center">{row.mmr}</TableCell>
                  <TableCell align="center">{row.mmb}</TableCell>
                  <TableCell align="center">{row.percent}</TableCell>
                  <TableCell align="center">{row.pricedDate}</TableCell>
                  <TableCell align="center">{row.pricedBy}</TableCell>
                  <TableCell align="center">
                    {/* {row.approve} */}
                   <FormControlLabel
                      control={
                        <Checkbox
                          checked={false}
                          onChange={() => onChangeApprove(row)}
                          checkedIcon={<Check className={classes.checkedIcon} />}
                        />
                      }
                      label=""
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
       {rrmListRows.length != 0? <Paginator
          label="Result per page"
          showItemsPerPage={10}
          pages={[10, 20, 30, 40]}
          data={rrmListRows}
          onChangePage={onChangePage}
        /> : null }
      </div>
    </>
  );
}