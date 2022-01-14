import React, { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { updateMileage, updatePricingHistory } from "../service/api";

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
    width: "auto",
    height: "10px",
    padding: "10px 12px",
    "&:focus": {
      borderColor: theme.palette.primary.main,
    },
  },
}))(InputBase);

export default function UpdateMileagePricing(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [vin, setVin] = React.useState(props?.vin);

  const handleClick = () => {
    //setOpen(!open);
  };

  const [mileageForm, setMileageForm] = useState({
    groundingMileage: null,
    confirmGroundingMileage: null,
    reasonForUpdate: "",
  });
  const [vehiclePriceForm, setVehiclePriceForm] = useState({
    vehicle_price: "",
    confirm_vehicle_price: "",
    region: "",
  });

  const handleOnChangeMileage = (event) => {
    setMileageForm({
      ...mileageForm,
      ...{ [event.target.name]: event.target.value },
    });
  };
  const handleOnChangeVehiclePrice = (event) => {
    setVehiclePriceForm({
      ...vehiclePriceForm,
      ...{ [event.target.name]: event.target.value },
    });
  };

  const updateDetails = () => { 
    mileageForm.groundingMileage && doUpdateMileage();
    vehiclePriceForm.vehicle_price && doUpdateVehiclePrice();
  };

  const doUpdateMileage = () => {
    if (mileageForm.groundingMileage === mileageForm.confirmGroundingMileage) {
      var updateMileageType = {
        adjustedBy: "adjustedBy",
        dealerName: "testdealer",
        groundingMileage: parseInt(mileageForm.groundingMileage),
        reasonForUpdate: mileageForm.reasonForUpdate,
        vin: vin,
      };
      updateMileage(updateMileageType).then((res) => {
        console.log("updateMileage", res);
      });
    } else {
      console.log(
        "Grounding Mileage and Confirm Grounding Mileage is not match"
      );
    }
  };

  const doUpdateVehiclePrice = () => {
    if (
      vehiclePriceForm.vehicle_price === vehiclePriceForm.confirm_vehicle_price
    ) {
      var updatePricingHistoryType = {
        priceMethod: "Manual",
        providerName: "test user",
        vehicle_price: vehiclePriceForm.vehicle_price,
        region:vehiclePriceForm.region,
        vin: vin,
      };

      updatePricingHistory(updatePricingHistoryType).then((res) => {
        console.log("updatePricingHistory", res);
      });
    } else {
      console.log("Vehicle Price and Confirm Vehicle Price is not match");
    }
  };

  return (
    <div className="updatePricingSidebar">
      <ListItem className="notesSectionHeader">Update Mileage/Pricing</ListItem>
      <ListItem>
        <div>
          <h3>Mileage</h3>
        </div>
      </ListItem>

      <ListItem>
        <div className="manualPricing">Original Grounding Mileage</div>
        <div className="manualPricing">000,000 mi</div>
      </ListItem>
      <ListItem>
        <p className="manualPricing">Inspection Mileage</p>
        <p className="manualPricing">000,000 mi</p>
      </ListItem>
      <ListItem>
        <FormControl>
          <InputLabel shrink htmlFor="vin-input">
            Update Grounding Mileage
          </InputLabel>
          <BootstrapInput
            placeholder="Enter price"
            id="EntermarketPrice-input"
            name="groundingMileage"
            value={mileageForm.groundingMileage}
            onChange={handleOnChangeMileage}
          />
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl>
          <InputLabel shrink htmlFor="vin-input">
            Confirm Grounding Mileage
          </InputLabel>
          <BootstrapInput
            placeholder="Enter Price"
            id="reEntermarketPrice-input"
            name="confirmGroundingMileage"
            value={mileageForm.confirmGroundingMileage}
            onChange={handleOnChangeMileage}
          />
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl>
          <InputLabel shrink htmlFor="vin-input">
            Reason for Update
          </InputLabel>
          <BootstrapInput
            placeholder="MMR"
            id="vin-input"
            name="reasonForUpdate"
            value={mileageForm.reasonForUpdate}
            onChange={handleOnChangeMileage}
          />
        </FormControl>
      </ListItem>

      <ListItem>
        <div>
          <h3>Pricing</h3>
        </div>
      </ListItem>

      <ListItem>
        <FormControl>
          <InputLabel shrink htmlFor="vin-input">
            Mileage
          </InputLabel>
          <BootstrapInput
            placeholder="Enter price"
            id="EntermarketPrice-input"
            name="vehicle_price"
            value={vehiclePriceForm.vehicle_price}
            onChange={handleOnChangeVehiclePrice}
          />
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl>
          <InputLabel shrink htmlFor="vin-input">
            Re-Enter Market Price
          </InputLabel>
          <BootstrapInput
            placeholder="Enter Price"
            id="reEntermarketPrice-input"
            name="confirm_vehicle_price"
            value={vehiclePriceForm.confirm_vehicle_price}
            onChange={handleOnChangeVehiclePrice}
          />
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl>
          <InputLabel shrink htmlFor="vin-input">
            MMR
          </InputLabel>
          <BootstrapInput
            placeholder="MMR"
            id="vin-input"
            name="vin"
            value={vehiclePriceForm.reason}
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
      <List className="swipeFilterBtn">
        <Button autoFocus className="cancelButton" color="primary">
          Cancel
        </Button>
        <Button
          autoFocus
          className="updateButton"
          color="secondary"
          onClick={updateDetails}
        >
          Update
        </Button>
      </List>
    </div>
  );
}
