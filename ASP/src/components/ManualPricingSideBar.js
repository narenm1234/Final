import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { List, Box } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import Alert from "@material-ui/lab/Alert";
import {
  updatePricingHistory
} from "../service/api";
import ViewFullPricingHistory from "./ViewFullPricingHistory";

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
    width: "100%",
    height: "10px",
    padding: "10px 12px",
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

export default function ManualPricingSideBar(props) {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
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
  // new  //
  const [vehiclePriceForm, setVehiclePriceForm] = useState({
    vehicle_price: "",
    confirm_vehicle_price: "",
    MMR: "",
    hasErr: false,
  });
  const [updatePrisingStatus, setUpdatePrisingStatus] = useState(null);
  const [ViewFullPricingHistoryPop, setViewFullPricingHistoryPop] = useState(false);
  const handleOnChangeVehiclePrice = (event) => {
    if (event.target.name === "confirm_vehicle_price") {
      setVehiclePriceForm({
        ...vehiclePriceForm,
        ...{ [event.target.name]: event.target.value, hasErr: true },
      });
    } else {
      setVehiclePriceForm({
        ...vehiclePriceForm,
        ...{ [event.target.name]: event.target.value },
      });
    }
  };
  const updateDetails = () => {
    vehiclePriceForm.vehicle_price && doUpdateVehiclePrice();
    setTimeout(() => {
      setUpdatePrisingStatus(null);
    }, 4000);
  };

  const doUpdateVehiclePrice = () => {
    if (
      vehiclePriceForm.vehicle_price === vehiclePriceForm.confirm_vehicle_price
    ) {
      var updatePricingHistoryType = {
        priceMethod: "Manual",
        providerName: "test user",
        vehicle_price: vehiclePriceForm.vehicle_price,
        MMR: vehiclePriceForm.MMR,
        vin: props.vin,
      };

      updatePricingHistory(updatePricingHistoryType).then((res) => {
        console.log("updatePricingHistory", res);
        if (res.data === "Success") {
          setUpdatePrisingStatus(true);
        } else {
          setUpdatePrisingStatus(false);
        }
      });
    } else {
      console.log("Vehicle Price and Confirm Vehicle Price is not match");
    }
  };
  return (
    <div className="updatePricingSidebar">
       <ListItem className="notesSectionHeader">Update Pricing</ListItem>
    <ListItem>
        <div>
          <h3>Pricing</h3>
        </div>
      </ListItem>
      <ListItem>
        <FormControl className="mileageFomrControl">
          <InputLabel shrink htmlFor="vin-input">
           Market Price
          </InputLabel>
          <BootstrapInput
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
            placeholder="Enter price"
            id="EntermarketPrice-input"
            name="vehicle_price"
            value={vehiclePriceForm.vehicle_price}
            onChange={handleOnChangeVehiclePrice}
          />
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl className="mileageFomrControl">
          <InputLabel shrink htmlFor="vin-input">
            Re-Enter Market Price
          </InputLabel>
          <BootstrapInput
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
            placeholder="Enter Confirm Price"
            id="reEntermarketPrice-input"
            name="confirm_vehicle_price"
            value={vehiclePriceForm.confirm_vehicle_price}
            onChange={handleOnChangeVehiclePrice}
          />
          {vehiclePriceForm.hasErr &&
            vehiclePriceForm.vehicle_price !==
            vehiclePriceForm.confirm_vehicle_price ? (
            <Box color={"red"} fontSize={12}>
              Confirm price is not matched!
            </Box>
          ) : (
            ""
          )}
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl className="mileageFomrControl">
          <InputLabel shrink htmlFor="vin-input">
            MMR
          </InputLabel>
          <BootstrapInput
            placeholder="Enter MMR"
            id="vin-input"
            name="MMR"
            value={vehiclePriceForm.MMR}
            onChange={handleOnChangeVehiclePrice}
          />
        </FormControl>
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <p className="manualPricing">TFS Carfax Alert Status:</p>
      </ListItem>

      <ListItem>
        <p className="manualPricing">Autograde: 3.0</p>
      </ListItem>
      <ListItem>
        <p className="manualPricing">Grounding Dealer State: TX</p>
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <div>
          <h3>Price History</h3>
        </div>
      </ListItem>
      <ListItem>
        <div className="manualPricingText">
          <p className="manualPricing">Price Entry Date/Time</p>
          <p className="manualPricing">Price: $00,000.00</p>
          <p className="manualPricing">User Name: First, Last</p>
        </div>
      </ListItem>
      <ListItem>
        <div className="manualPricingText">
          <p className="manualPricing">Price Entry Date/Time</p>
          <p className="manualPricing">Price: $00,000.00</p>
          <p className="manualPricing">User Name: First, Last</p>
        </div>
      </ListItem>
      <ListItem>
        <Button
          variant="outlined"          
          className="fullpricinghistorybtn"
          color="primary"
          onClick={() => {
            setViewFullPricingHistoryPop(true);
          }}
        >
          View Full Pricing History
        </Button>
      </ListItem>
      <ListItem>
        {updatePrisingStatus === true && (
          <Alert variant="outlined" severity="success">
            Price updated successfully!
          </Alert>
        )}

        {updatePrisingStatus === false && (
          <Alert variant="outlined" severity="error">
            Price updating failed!
          </Alert>
        )}
      </ListItem>
      <List className="swipeFilterBtn">
        <Button  className="cancelButton" color="primary">
          Cancel
        </Button>
        <Button  onClick={updateDetails}  className="updateButton" color="secondary">
          Update
        </Button>
      </List>
      {ViewFullPricingHistoryPop ?
        <ViewFullPricingHistory
          vin={props.vin}
          open={ViewFullPricingHistoryPop}
          onClose={() => {
            setViewFullPricingHistoryPop(false);
          }}
        ></ViewFullPricingHistory> : ""}
    </div>
  );
}
