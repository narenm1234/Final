import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import ListItemText from "@material-ui/core/ListItemText";
import { Box, Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "30px",
    height: "30px",
    backgroundColor: "#B80F0A",
    borderRadius: "50%",
    fontSize: "12px",
    padding: "10px 20px 13px 12px",
    color: "white",
  },
  sideBarCSS: {
    marginLeft: "16px",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: "96%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: "#ffffff",
    border: "1px solid #ced4da",
    fontSize: 16,
    width: "auto",
    height: "10px",
    padding: "10px 12px",
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);
export default function PurchasedPricingSideBar(props) {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const [accountName, setAccountName] = React.useState("");

  const handleChangeAccountName = (event) => {
    setAccountName(event.target.value);
  };

  const handleClick = () => {
    //setOpen(!open);
  };
  const handleOnChange = (event) => {
    setFilterInput({
      ...filterInput,
      ...{ [event.target.name]: event.target.value },
    });
  };
  const [filterInput, setFilterInput] = useState({
    vin: "",
    yearFrom: "",
    yearTo: "",
    make: "",
    inspectionStatus: "",
    inspectionDateFrom: "",
    inspectionDateTo: "",
    groundingRegion: "",
    auctionCode: "",
  });
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="manualPricingSidebar">
      <ListItem className="notesSectionHeader">Purchase Page</ListItem>
      <ListItem>
        <FormControl component="fieldset">
          <FormLabel component="legend">Vehicle pricing options</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={value}
            onChange={handleChange}
          >
            <Box
              px={2}
              py={1}
              mt={1}
              boxShadow={"0px 0px 4px lightgray"}
              borderRadius={4}
            >
              <FormControlLabel value="1" control={<Radio />} label="Payoff" />
            </Box>
            <Box
              px={2}
              py={1}
              mt={1}
              boxShadow={"0px 0px 4px lightgray"}
              borderRadius={4}
            >
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="Residual + Remaining Payments"
              />
            </Box>
            <Box
              px={2}
              py={1}
              mt={1}
              boxShadow={"0px 0px 4px lightgray"}
              borderRadius={4}
            >
              <FormControlLabel value="3" control={<Radio />} label="Market" />
            </Box>
            <Box
              px={2}
              py={1}
              mt={1}
              boxShadow={"0px 0px 4px lightgray"}
              borderRadius={4}
            >
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="Market + Remaining Payments "
              />
            </Box>
          </RadioGroup>
        </FormControl>
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemText className="manualPricing">Admin. Fee:</ListItemText>
        <ListItemText className="manualPricing">$000,000</ListItemText>
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemText className="manualPricing">Total Fee:</ListItemText>
        <ListItemText className="manualPricing">$000,000</ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText className="manualPricing">
          <Box>Account Nick Name</Box>
          <FormControl variant="outlined" className={classes.formControl}>
            {/* <InputLabel id="demo-simple-select-outlined-label">City</InputLabel> */}
            <Select
              style={{ lineHeight: "2.1em" }}
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={accountName}
              onChange={handleChangeAccountName}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>CITI</MenuItem>
              <MenuItem value={20}>BOFA</MenuItem>
              <MenuItem value={30}>CHASE</MenuItem>
            </Select>
          </FormControl>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText className="manualPricing">
          <Box px={1} mb={2}>
            <Box color={"gray"}>Dealers bank account number </Box>
            <Box color={"black"} p={1} bgcolor={"lightgray"} borderRadius={4}>
              .../0000
            </Box>
          </Box>
        </ListItemText>
      </ListItem>

      <List className="purchasePassBtn">
        <Button className="passButton" color="primary">
          Pass on Vehicle
        </Button>
        <Button
          disabled={!accountName || !value}
          className="purchaseButton"
          color="secondary"
          onClick={props.onPurchaseVehical}
        >
          Purchase Vehicle
        </Button>
      </List>
    </div>
  );
}
