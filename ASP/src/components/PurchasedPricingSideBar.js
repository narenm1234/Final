import React, { useEffect, useState } from "react";
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
import { getDealerPaymentsData, getPurchaseDetails, onSubmitPayment } from "../service/api";

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
  const [paymentMethods, SetPaymentMethods] = React.useState([]);
  const [accountMaskNumber, setAccountMaskNumber] = React.useState(null);
  const [purchasedData, setPurchasedData] = React.useState({});

  useEffect(async () => {
    let getDealerPaymentsRes = await getDealerPaymentsData();
    console.log("getDealerPaymentsData", getDealerPaymentsRes);
    getDealerPaymentsRes &&
      getDealerPaymentsRes.data &&
      getDealerPaymentsRes.data.PaymentMethod &&
      SetPaymentMethods(getDealerPaymentsRes.data.PaymentMethod);

    let getPurchaseDetailsRes = await getPurchaseDetails(props.vin);
    console.log("getPurchaseDetailsRes:::", getPurchaseDetailsRes);
    setPurchasedData(getPurchaseDetailsRes.data.data);



    let reqObj = {
      "accountId": "8adc9a4170c2d2f80170c56d9be24c8f",
      "accountNumber": "t002-51690",
      "achAbaCode": "111111111",
      "achAccountNumberMask": "**************************2222",
      "achAccountType": "Checking",
      "paymentDetails": [
        {
          "amount": 200,
          "paymentCategory": "Payoff",
          "priceType": "Price"
        },
        {
          "amount": 300,
          "paymentCategory": "Residual",
          "priceType": "Price"
        }
      ],
      "paymentMethodId": "8adcd9eb74353a7101744ee82b2e0cdd",
      "paymentMethodType": "ACH",
      "tenantId": "t002",
      "vin": "JM1GL1XY6L1513120",
      // "vin": "KM3KFADM0L0797963",
    
    }
    let submitPaymentRes = await onSubmitPayment(reqObj);
    console.log("submitPaymentRes:::", submitPaymentRes);

  }, []);

  const handleChangeAccountName = (event) => {
    setAccountName(event.target.value);
    paymentMethods.forEach((item) => {
      if (item.achAccountName == event.target.value) {
        console.log(item);
        setAccountMaskNumber(item.achAccountNumberMask);
      }
    });
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
              <p> ${purchasedData.payOffAmount} </p>
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
              <p>
                {" "}
                $
                {parseInt(parseFloat(purchasedData.remainingPmts).toFixed(2)) +
                  parseInt(
                    parseFloat(purchasedData.residualAmount).toFixed(2)
                  )}{" "}
              </p>
            </Box>
            <Box
              px={2}
              py={1}
              mt={1}
              boxShadow={"0px 0px 4px lightgray"}
              borderRadius={4}
            >
              <FormControlLabel value="3" control={<Radio />} label="Market" />
              <p> ${purchasedData.vehiclePrice} </p>
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
              <p>
                {" "}
                $
                {parseInt(purchasedData.vehiclePrice) +
                  parseInt(purchasedData.remainingPmts)}{" "}
              </p>
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
              {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
              {paymentMethods &&
                paymentMethods.map((opt, index) => (
                  <MenuItem key={index} value={opt.achAccountName}>
                    {opt.achAccountName}
                  </MenuItem>
                ))}
              {/* <MenuItem value={20}>BOFA</MenuItem>
              <MenuItem value={30}>CHASE</MenuItem> */}
            </Select>
          </FormControl>
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText className="manualPricing">
          <Box px={1} mb={2}>
            <Box color={"gray"}>Dealers bank account number </Box>
            <Box color={"black"} p={1} bgcolor={"lightgray"} borderRadius={4}>
              {accountMaskNumber || "****0000"}
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
