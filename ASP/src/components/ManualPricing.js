import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SwipableFilter from "./SwipableFilter";
import { TableSortLabel } from "@material-ui/core";
import Paginator from "./Pagination";
import SortIcon from "../assets/WebFont/sort.svg";
import { awaitManualPricing } from "../service/api";
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
  tableHeadFont: {
    fontWeight: 600,
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
  Grounding_Region,
  Inspection_Date,
  Inspection_Status,
  Action_Code
) {
  return {
    VIN,
    Year,
    Make,
    Model_Trim,
    Grounding_Region,
    Inspection_Date,
    Inspection_Status,
    Action_Code,
  };
}
const rows = [
  createVehicleData(
    "0704303398645911",
    "2015",
    "CX-5",
    "A1",
    "Florida",
    "01/23/2015",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "6672920469419405",
    "2016",
    "Mazda3",
    "B1",
    "Indiana",
    "04/26/2016",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "7660443910307535",
    "2017",
    "Mazda6",
    "C1",
    "Texas",
    "08/13/2017",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "2769586046735830",
    "2018",
    "MX-5",
    "A2",
    "Texas",
    "12/17/2018",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "2563959933582287",
    "2019",
    "Mazda3",
    "B2",
    "Florida",
    "07/30/2019",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "8309130666254027",
    "2020",
    "Mazda3",
    "C2",
    "Indiana",
    "03/14/2020",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "3180783430963337",
    "2021",
    "Mazda6",
    "A3",
    "Indiana",
    "11/15/2021",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "0087479668724131",
    "2022",
    "CX-5",
    "B3",
    "Texas",
    "10/24/2022",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "0704303398645911",
    "2015",
    "CX-5",
    "A1",
    "Florida",
    "01/23/2015",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "6672920469419405",
    "2016",
    "Mazda3",
    "B1",
    "Indiana",
    "04/26/2016",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "7660443910307535",
    "2017",
    "Mazda6",
    "C1",
    "Texas",
    "08/13/2017",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "2769586046735830",
    "2018",
    "MX-5",
    "A2",
    "Texas",
    "12/17/2018",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "2563959933582287",
    "2019",
    "Mazda3",
    "B2",
    "Florida",
    "07/30/2019",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "8309130666254027",
    "2020",
    "Mazda3",
    "C2",
    "Indiana",
    "03/14/2020",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "3180783430963337",
    "2021",
    "Mazda6",
    "A3",
    "Indiana",
    "11/15/2021",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "0087479668724131",
    "2022",
    "CX-5",
    "B3",
    "Texas",
    "10/24/2022",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "0704303398645911",
    "2015",
    "CX-5",
    "A1",
    "Florida",
    "01/23/2015",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "6672920469419405",
    "2016",
    "Mazda3",
    "B1",
    "Indiana",
    "04/26/2016",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "7660443910307535",
    "2017",
    "Mazda6",
    "C1",
    "Texas",
    "08/13/2017",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "2769586046735830",
    "2018",
    "MX-5",
    "A2",
    "Texas",
    "12/17/2018",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "2563959933582287",
    "2019",
    "Mazda3",
    "B2",
    "Florida",
    "07/30/2019",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "8309130666254027",
    "2020",
    "Mazda3",
    "C2",
    "Indiana",
    "03/14/2020",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "3180783430963337",
    "2021",
    "Mazda6",
    "A3",
    "Indiana",
    "11/15/2021",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "0087479668724131",
    "2022",
    "CX-5",
    "B3",
    "Texas",
    "10/24/2022",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "0704303398645911",
    "2015",
    "CX-5",
    "A1",
    "Florida",
    "01/23/2015",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "6672920469419405",
    "2016",
    "Mazda3",
    "B1",
    "Indiana",
    "04/26/2016",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "7660443910307535",
    "2017",
    "Mazda6",
    "C1",
    "Texas",
    "08/13/2017",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "2769586046735830",
    "2018",
    "MX-5",
    "A2",
    "Texas",
    "12/17/2018",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "2563959933582287",
    "2019",
    "Mazda3",
    "B2",
    "Florida",
    "07/30/2019",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "8309130666254027",
    "2020",
    "Mazda3",
    "C2",
    "Indiana",
    "03/14/2020",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "3180783430963337",
    "2021",
    "Mazda6",
    "A3",
    "Indiana",
    "11/15/2021",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "0087479668724131",
    "2022",
    "CX-5",
    "B3",
    "Texas",
    "10/24/2022",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "0704303398645911",
    "2015",
    "CX-5",
    "A1",
    "Florida",
    "01/23/2015",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "6672920469419405",
    "2016",
    "Mazda3",
    "B1",
    "Indiana",
    "04/26/2016",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "7660443910307535",
    "2017",
    "Mazda6",
    "C1",
    "Texas",
    "08/13/2017",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "2769586046735830",
    "2018",
    "MX-5",
    "A2",
    "Texas",
    "12/17/2018",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "2563959933582287",
    "2019",
    "Mazda3",
    "B2",
    "Florida",
    "07/30/2019",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "8309130666254027",
    "2020",
    "Mazda3",
    "C2",
    "Indiana",
    "03/14/2020",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "3180783430963337",
    "2021",
    "Mazda6",
    "A3",
    "Indiana",
    "11/15/2021",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "0087479668724131",
    "2022",
    "CX-5",
    "B3",
    "Texas",
    "10/24/2022",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "0704303398645911",
    "2015",
    "CX-5",
    "A1",
    "Florida",
    "01/23/2015",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "6672920469419405",
    "2016",
    "Mazda3",
    "B1",
    "Indiana",
    "04/26/2016",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "7660443910307535",
    "2017",
    "Mazda6",
    "C1",
    "Texas",
    "08/13/2017",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "2769586046735830",
    "2018",
    "MX-5",
    "A2",
    "Texas",
    "12/17/2018",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "2563959933582287",
    "2019",
    "Mazda3",
    "B2",
    "Florida",
    "07/30/2019",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "8309130666254027",
    "2020",
    "Mazda3",
    "C2",
    "Indiana",
    "03/14/2020",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "3180783430963337",
    "2021",
    "Mazda6",
    "A3",
    "Indiana",
    "11/15/2021",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "0087479668724131",
    "2022",
    "CX-5",
    "B3",
    "Texas",
    "10/24/2022",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "0704303398645911",
    "2015",
    "CX-5",
    "A1",
    "Florida",
    "01/23/2015",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "6672920469419405",
    "2016",
    "Mazda3",
    "B1",
    "Indiana",
    "04/26/2016",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "7660443910307535",
    "2017",
    "Mazda6",
    "C1",
    "Texas",
    "08/13/2017",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "2769586046735830",
    "2018",
    "MX-5",
    "A2",
    "Texas",
    "12/17/2018",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "2563959933582287",
    "2019",
    "Mazda3",
    "B2",
    "Florida",
    "07/30/2019",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "8309130666254027",
    "2020",
    "Mazda3",
    "C2",
    "Indiana",
    "03/14/2020",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "3180783430963337",
    "2021",
    "Mazda6",
    "A3",
    "Indiana",
    "11/15/2021",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "0087479668724131",
    "2022",
    "CX-5",
    "B3",
    "Texas",
    "10/24/2022",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "0704303398645911",
    "2015",
    "CX-5",
    "A1",
    "Florida",
    "01/23/2015",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "6672920469419405",
    "2016",
    "Mazda3",
    "B1",
    "Indiana",
    "04/26/2016",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "7660443910307535",
    "2017",
    "Mazda6",
    "C1",
    "Texas",
    "08/13/2017",
    "Pending",
    "XYZ"
  ),
  createVehicleData(
    "2769586046735830",
    "2018",
    "MX-5",
    "A2",
    "Texas",
    "12/17/2018",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "2563959933582287",
    "2019",
    "Mazda3",
    "B2",
    "Florida",
    "07/30/2019",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "8309130666254027",
    "2020",
    "Mazda3",
    "C2",
    "Indiana",
    "03/14/2020",
    "Completed",
    "XYZ"
  ),
  createVehicleData(
    "3180783430963337",
    "2021",
    "Mazda6",
    "A3",
    "Indiana",
    "11/15/2021",
    "Pending",
    "XYZ"
  ),
];

export default function ManualPricing(props) {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState([]);
  const [vehicleList, setVehicleList] = useState(rows);
  const [pageCount, setPageCount] = React.useState(10);
  const [manualPricingList, setManualPricingList] = useState([]);
  const [manualPricingListRows, setManualPricingListRows] = useState([]);
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
    getManualPricingDetails();
  }, []);
  async function getManualPricingDetails() {
    let apiResponse = await awaitManualPricing();
    console.log("ManualPricing------->", apiResponse.data);
    setManualPricingListRows(apiResponse.data);
  }
  const handleChangePageCount = (event) => {
    setPageCount(event.target.value);
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const openConditionReport = (VINumber, vehicle) => {
    props.props.history.push("/conditionreportRequests", {
      vin: VINumber,
      pageName: "Manual Pricing",
      purchaseSection: false,
      vehicleDetails: vehicle,
    });
  };

  
  // const openConditionScreen = (VINumber, vehicle) => {
  //   props.history.push("/conditionreport", {
  //     vin: VINumber,
  //     purchaseSection: true,
  //     vehicleDetails: vehicle,
  //   });
  // };

  const fetchDataBasedOnSearchValue = (searchText) => {
    const vehicleListCopy = [...rows];
    if (searchText) {
      const filteredList = vehicleListCopy.filter((row) => {
        return row.VIN.indexOf(searchText) !== -1;
      });
      setVehicleList(filteredList);
    } else {
      setVehicleList(rows);
    }
  };

  const fetchDataBasedOnFilters = (filterInput) => {
    let vehicleListCopy = [...rows];
    if (filterInput.vin) {
      vehicleListCopy = vehicleListCopy.filter((row) => {
        return (
          row.VIN.indexOf(filterInput.vin) !== -1 ||
          (row.Year >= filterInput.yearFrom && row.Year <= filterInput.yearTo)
        );
      });
    }
    if (filterInput.yearFrom && filterInput.yearTo) {
      vehicleListCopy = vehicleListCopy.filter((row) => {
        return (
          row.Year >= filterInput.yearFrom && row.Year <= filterInput.yearTo
        );
      });
    }
    if (filterInput.make) {
      vehicleListCopy = vehicleListCopy.filter((row) => {
        return row.Make.indexOf(filterInput.make) !== -1;
      });
    }
    if (filterInput.inspectionStatus) {
      vehicleListCopy = vehicleListCopy.filter((row) => {
        return (
          row.Inspection_Status.indexOf(filterInput.inspectionStatus) !== -1
        );
      });
    }
    if (filterInput.groundingRegion) {
      vehicleListCopy = vehicleListCopy.filter((row) => {
        return row.Grounding_Region.indexOf(filterInput.groundingRegion) !== -1;
      });
    }
    if (filterInput.auctionCode) {
      vehicleListCopy = vehicleListCopy.filter((row) => {
        return row.Action_Code.indexOf(filterInput.auctionCode) !== -1;
      });
    }
    if (filterInput.inspectionDateFrom && filterInput.inspectionDateTo) {
      vehicleListCopy = vehicleListCopy.filter((row) => {
        const dateTs = Date.parse(row.Inspection_Date);
        return (
          dateTs >= Date.parse(filterInput.inspectionDateFrom) &&
          dateTs <= Date.parse(filterInput.inspectionDateTo)
        );
      });
    }
    setVehicleList(vehicleListCopy);
  };

  const resetFilterList = () => {
    setVehicleList(rows);
  };

  const onChangePage = (data) => {
    console.log("data", data);
    setManualPricingList(data);
  };


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
                    Grounding Region
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
                    Inspection Date
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
                    Inspection Status
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
                    Action Code
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {manualPricingList?.map((row, index) => (
                <TableRow key={index} className={classes.tableRow}>
                  <TableCell align="center">
                    <span className="textStyle">
                      <a
                        className="vin"
                        onClick={() => openConditionReport(row.vin, row)}
                      >
                        {" "}
                        {row.vin}
                      </a>
                    </span>
                  </TableCell>
                  <TableCell align="center">{row.modelYear}</TableCell>
                  <TableCell align="center">{row.make}</TableCell>
                  <TableCell align="center">{row.model}</TableCell>
                  <TableCell align="center">{row.groundingRegion}</TableCell>
                  <TableCell align="center">{row.inspectionDate}</TableCell>
                  <TableCell align="center">{row.inspectionStatus}</TableCell>
                  <TableCell align="center">{row.actionCode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {manualPricingListRows.length != 0 ? (
          <Paginator
            label="Result per page"
            showItemsPerPage={10}
            pages={[10, 20, 30, 40]}
            data={manualPricingListRows}
            onChangePage={onChangePage}
          />
        ) : null}
      </div>
    </>
  );
}
