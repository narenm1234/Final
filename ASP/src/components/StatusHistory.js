import React, { useEffect, useState } from "react";
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
import { getVehicalStatusHistory } from "../service/api";
import moment from "moment";

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


export default function StatusHistory(props) {
  const classes = useStyles();
  const [vin, setVin] = useState(props.vin);
  const [statusHistoryData, setStatusHistoryData] = useState([]);

  useEffect(() => {
    getStatusHistory();
  }, [vin]);

  async function getStatusHistory() {
    let apiResponse = await getVehicalStatusHistory(vin);
    console.log("getVehicalStatusHistory==>", apiResponse);
    if (apiResponse && apiResponse.data) {
      setStatusHistoryData(apiResponse.data);
    }
  }

  return (
    <Box>
      <Box display={"flex"} alignItems={"center"} mb={2}>
        <Box className="resultForVin">
          Results for VIN: {vin}
        </Box>
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
            {statusHistoryData &&
              statusHistoryData.map((row, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row?.status}
                  </TableCell>
                  <TableCell>{row?.account}</TableCell>
                  <TableCell>
                    {row?.transactiondate &&
                      moment(row?.transactiondate).format("MM/DD/YYYY")}
                  </TableCell>
                  <TableCell>
                    {row?.transactiondate &&
                      moment(row?.transactiondate).format("hh:mm")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
