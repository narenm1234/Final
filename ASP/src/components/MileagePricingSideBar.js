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
import Alert from "@material-ui/lab/Alert";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import {
  updateMileage
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

export default function MileagePricingSideBar(props) {
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
  // new /
  const [mileageForm, setMileageForm] = useState({
    groundingMileage: null,
    confirmGroundingMileage: null,
    reasonForUpdate: "",
    hasErr: false,
  });
  const [updateStatus, setUpdateStatus] = useState(null);
  const [ViewFullPricingHistoryPop, setViewFullPricingHistoryPop] = useState(false);

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

  const updateDetails = () => {
    mileageForm.groundingMileage && doUpdateMileage();
    setTimeout(() => {
      setUpdateStatus(null);
    }, 4000);
  };
  const doUpdateMileage = () => {
    if (mileageForm.groundingMileage === mileageForm.confirmGroundingMileage) {
      var updateMileageType = {
        adjustedBy: "adjustedBy",
        dealerName: "testdealer",
        groundingMileage: parseInt(mileageForm.groundingMileage),
        reasonForUpdate: mileageForm.reasonForUpdate,
        vin: props.vin,
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
  
  return (
      <div className="updatePricingSidebar">
     <ListItem className="notesSectionHeader">Update Mileage</ListItem>
      <ListItem>
        <div>
          <h3>Mileage</h3>
        </div>
      </ListItem>
      <ListItem>
        <div className="manualPricing">Original Grounding Mileage</div>
        <div className="manualPricing">
          {/* {condionVehicleDetails && condionVehicleDetails?.grounding_mileage ? (
            <CurrencyFormat
              value={condionVehicleDetails?.grounding_mileage}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" MI"}
            />
          ) : (
            ""
          )} */}
        </div>
      </ListItem>
      <ListItem>
        <p className="manualPricing">Inspection Mileage</p>
        <p className="manualPricing">
          {/* {condionVehicleDetails &&
            condionVehicleDetails?.inspection_mileage ? (
            <CurrencyFormat
              value={condionVehicleDetails?.inspection_mileage}
              displayType={"text"}
              thousandSeparator={true}
              suffix={" MI"}
            />
          ) : (
            ""
          )} */}
        </p>
      </ListItem>
      <ListItem>
        <FormControl className="mileageFomrControl">
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
        <FormControl className="mileageFomrControl">
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
        <FormControl className="mileageFomrControl">
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
      <List className="swipeFilterBtn">
        <Button className="cancelButton" color="primary">
          Cancel
        </Button>
        <Button  onClick={updateDetails} className="updateButton" color="secondary">
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
