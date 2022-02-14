import React, { useEffect, useState } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Box, FormControl, InputLabel, Typography } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputBase from "@material-ui/core/InputBase";

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

function Paginator(props) {
  const { label, data, showItemsPerPage, pages, onChangePage } = props;
  const [pageCount, setPageCount] = useState(showItemsPerPage);
  const [totalData, setTotalData] = useState(data);
  const [noOfPages, setNoOfPages] = useState(1);
  const [skipRecords, setSkipRecords] = useState(0);

  useEffect(() => {
    setNoOfPages(Math.ceil(localStorage.getItem("groundedCount")/ pageCount));
    onChangePage(totalData.slice(skipRecords, pageCount));
  }, [pageCount]);

  const handleChangePageCount = (event) => {
    event.preventDefault();
    event.target && event.target.value && setPageCount(event.target.value);
  }; 

  const onChangePageNumber = (event, page) => {
    event.preventDefault();
    let skip = (page - 1) * pageCount;
    setSkipRecords(skip);

    onChangePage(totalData.slice(skip, skip + pageCount),page);

  };

  return (
    <div>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignItems="center"
        p={2}
        className="custompagination1"
      >
        <Box pr={2}> {label} </Box>
        <Box pr={2}>
          <FormControl>
            {/* <Select
              labelId="demo-customized-select-label"
              id="demo-customized-select"
              value={pageCount}
              onChange={handleChangePageCount}
              input={<BootstrapInput />}
            >
              {pages &&
                pages.map((menuitem, index) => (
                  <MenuItem key={index} value={menuitem}>
                    {" "}
                    {menuitem}
                  </MenuItem>
                ))}
            </Select> */}
          </FormControl>
        </Box>
        <Pagination
          count={noOfPages}
          color="primary"
          variant="outlined"
          onChange={onChangePageNumber}
        />
      </Box>
    </div>
  );
}

export default Paginator;
