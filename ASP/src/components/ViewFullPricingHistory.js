import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Box, TableSortLabel, Button } from "@material-ui/core";
import SortIcon from "../assets/WebFont/sort.svg";
import { getPricingHistoryByVin } from "../service/api";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });
const useStyles = makeStyles((theme) => ({
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
}));

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  const DialogContent = withStyles((theme) => ({
    root: {
      padding: theme.spacing(2),
    },
  }))(MuiDialogContent);
  
  const DialogActions = withStyles((theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(1),
    },
  }))(MuiDialogActions);

function ViewFullPricingHistory(props) {
    const classes = useStyles();
    const [vin, setVin] = useState(props.vin);
    const [pricingHistory, setPricingHistory] = useState([]);

    useEffect(() => {
        getPricingHistory();
    }, [vin]);

    async function getPricingHistory() {
        let apiResponse = await getPricingHistoryByVin(vin);
        console.log("getVehicalStatusHistory==>", apiResponse);
        if (apiResponse && apiResponse.data) {
            setPricingHistory(apiResponse.data)
        }
    }

    return (
        <div className={classes.root}>
            <Dialog
                onClose={props.onClose}
                maxWidth={"xl"}
                fullWidth={true}
                aria-labelledby="max-width-dialog-title"
                open={props.open}
            >
                <DialogTitle
                    className="viewReportHeader viewPricinghistoryheader"
                    id="customized-dialog-title"
                >
                    Vehicle Pricing History
                </DialogTitle>
                <DialogContent>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead className={classes.tableheaders}>
                                <TableRow>
                                    <TableCell>
                                        <TableSortLabel
                                            active={true}
                                            direction={"asc"}
                                            onClick={() => { }}
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
                                            onClick={() => { }}
                                            IconComponent={() => (
                                                <img src={SortIcon} className="tableSortIcon" />
                                            )}
                                        >
                                            Time
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={true}
                                            direction={"asc"}
                                            onClick={() => { }}
                                            IconComponent={() => (
                                                <img src={SortIcon} className="tableSortIcon" />
                                            )}
                                        >
                                            Original Price
                                        </TableSortLabel>
                                    </TableCell>

                                    <TableCell>
                                        <TableSortLabel
                                            active={true}
                                            direction={"asc"}
                                            onClick={() => { }}
                                            IconComponent={() => (
                                                <img src={SortIcon} className="tableSortIcon" />
                                            )}
                                        >
                                            Updated Price
                                        </TableSortLabel>
                                    </TableCell>
                                    {/* <TableCell> */}
                                        {/* <TableSortLabel
                                            active={true}
                                            direction={"asc"}
                                            onClick={() => { }}
                                            IconComponent={() => (
                                                <img src={SortIcon} className="tableSortIcon" />
                                            )}
                                        >
                                            Strategy  Price
                                        </TableSortLabel> */}
                                    {/* </TableCell> */}
                                    <TableCell>
                                        <TableSortLabel
                                            active={true}
                                            direction={"asc"}
                                            onClick={() => { }}
                                            IconComponent={() => (
                                                <img src={SortIcon} className="tableSortIcon" />
                                            )}
                                        >
                                            Priced By
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell>
                                        <TableSortLabel
                                            active={true}
                                            direction={"asc"}
                                            onClick={() => { }}
                                            IconComponent={() => (
                                                <img src={SortIcon} className="tableSortIcon" />
                                            )}
                                        >
                                            Approved  By
                                        </TableSortLabel>
                                    </TableCell>

                                </TableRow>
                            </TableHead>
                             <TableBody>
                                {pricingHistory &&
                                    pricingHistory.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell>
                                                {row?.asOfDate &&
                                                    moment(row?.asOfDate).format("MM/DD/YYYY")}
                                            </TableCell>
                                            <TableCell>
                                                {row?.asOfDate &&
                                                    moment(row?.asOfDate).format("hh:mm")}
                                            </TableCell>
                                            <TableCell >
                                                {row?.updatedPrice?row.updatedPrice:'-'}
                                            </TableCell>
                                            <TableCell>{row?.vehiclePrice?row.vehiclePrice:'-'}</TableCell>
                                            {/* <TableCell>{row?.account}</TableCell> */}
                                            <TableCell>{row?.providerName?row.providerName:'-'}</TableCell>
                                            <TableCell>{row?.approvedBy?row.approvedBy:'-'}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody> 
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions className="reportFooter">
                    <Button
                        autoFocus
                        variant="contained"
                        className="vehicalHistoryPricingBtn"
                        color="secondary"
                        onClick={props.onClose}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
           
        </div>
    );
}

export default ViewFullPricingHistory;
