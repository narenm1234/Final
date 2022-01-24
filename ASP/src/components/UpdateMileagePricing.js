import React, { useEffect, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Divider } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { List, Box } from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import {
  updateMileage,
  updatePricingHistory,
  getClearfaxStatusByVin,
} from "../service/api";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Alert from "@material-ui/lab/Alert";
import CheckIcon from "@material-ui/icons/Check";
import CurrencyFormat from "react-currency-format";

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
  const [vin, setVin] = useState(props?.vin);
  const [clearFixStatus, setClearFixStatus] = useState(null);
  const [updateStatus, setUpdateStatus] = useState(null);
  const [updatePrisingStatus, setUpdatePrisingStatus] = useState(null);
  const [condionVehicleDetails, setCondionVehicleDetails] = React.useState({}); // inspectiondata

  const handleClick = () => {
    //setOpen(!open);
  };
  useEffect(() => {
    getClearfaxStatus();
  }, [vin]);

  useEffect(() => {
    setCondionVehicleDetails(props.condionVehicleDetails);
  }, [props?.condionVehicleDetails]);

  async function getClearfaxStatus() {
    let apiResponse = await getClearfaxStatusByVin(vin);
    console.log("getClearfaxStatusByVin==>", apiResponse);
    if (apiResponse && apiResponse.data) {
      setClearFixStatus(apiResponse.data);
    }
  }

  const [mileageForm, setMileageForm] = useState({
    groundingMileage: null,
    confirmGroundingMileage: null,
    reasonForUpdate: "",
    hasErr: false,
  });
  const [vehiclePriceForm, setVehiclePriceForm] = useState({
    vehicle_price: "",
    confirm_vehicle_price: "",
    region: "",
    hasErr: false,
  });

  const handleOnChangeMileage = (event) => {
    if (event.target.name === "confirmGroundingMileage") {
      setMileageForm({
        ...mileageForm,
        ...{ [event.target.name]: event.target.value, hasErr: true },
      });
    } else {
      setMileageForm({
        ...mileageForm,
        ...{ [event.target.name]: event.target.value },
      });
    }
  };

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
    mileageForm.groundingMileage && doUpdateMileage();
    vehiclePriceForm.vehicle_price && doUpdateVehiclePrice();
    setTimeout(() => {
      setUpdateStatus(null);
      setUpdatePrisingStatus(null);
    }, 4000);
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
        if (res.data === "Success") {
          setUpdateStatus(true);
        } else {
          setUpdateStatus(false);
        }
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
        region: vehiclePriceForm.region,
        vin: vin,
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
      <ListItem className="notesSectionHeader">Update Mileage/Pricing</ListItem>
      <ListItem>
        <div>
          <h3>Mileage</h3>
        </div>
      </ListItem>
      <ListItem>
        <div className="manualPricing">Original Grounding Mileage</div>
        <div className="manualPricing">
          {condionVehicleDetails && condionVehicleDetails?.grounding_mileage ? (
            <CurrencyFormat
              value={condionVehicleDetails?.grounding_mileage}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" MI"}
            />
          ) : (
            ""
          )}
        </div>
      </ListItem>
      <ListItem>
        <p className="manualPricing">Inspection Mileage</p>
        <p className="manualPricing">
          {condionVehicleDetails &&
          condionVehicleDetails?.inspection_mileage ? (
            <CurrencyFormat
              value={condionVehicleDetails?.inspection_mileage}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" MI"}
            />
          ) : (
            ""
          )}
        </p>
      </ListItem>
      <ListItem>
        <FormControl>
          <InputLabel shrink htmlFor="vin-input">
            Update Grounding Mileage
          </InputLabel>
          <BootstrapInput
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
            placeholder="Enter Grounding Mileage"
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
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
            placeholder="Enter Confirm Grounding Mileage"
            id="reEntermarketPrice-input"
            name="confirmGroundingMileage"
            value={mileageForm.confirmGroundingMileage}
            onChange={handleOnChangeMileage}
            borderColor={"red"}
          />
          {mileageForm.hasErr &&
          mileageForm.groundingMileage !==
            mileageForm.confirmGroundingMileage ? (
            <Box color={"red"} fontSize={12}>
              Confirm grounding mileage is not matched!
            </Box>
          ) : (
            ""
          )}
        </FormControl>
      </ListItem>
      <ListItem>
        <FormControl>
          <InputLabel shrink htmlFor="vin-input">
            Reason for Update
          </InputLabel>
          <BootstrapInput
            placeholder="Enter Reason for Update"
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
            Price
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
        <FormControl>
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
        <FormControl>
          <InputLabel shrink htmlFor="vin-input">
            MMR
          </InputLabel>
          <BootstrapInput
            placeholder="Enter MMR"
            id="vin-input"
            name="vin"
            value={vehiclePriceForm.reason}
            onChange={handleOnChangeVehiclePrice}
          />
        </FormControl>
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <Box display={"flex"} alignItems={"center"} width={"100%"}>
          <Box className="manualPricing">TFS Carfax Alert Status:</Box>
          <Box pt={1}>
            <FiberManualRecordIcon
              style={{
                color: clearFixStatus === "Green" ? "#4bca81" : "#cc0000",
              }}
            />
          </Box>
        </Box>
      </ListItem>
     {/* // <ListItem>
        <p className="manualPricing">Autograde: 3.0</p>
      </ListItem> */}
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
      {/* const [updateStatus, setUpdateStatus] = useState(false); const
      [updatePrisingStatus, setUpdatePrisingStatus] = useState(false); */}
      <ListItem>
        {updateStatus === true && (
          <Alert variant="outlined" severity="success">
            Mileage updated successfully!
          </Alert>
        )}
        {updateStatus === false && (
          <Alert variant="outlined" severity="error">
            Mileage updating failed!
          </Alert>
        )}
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
