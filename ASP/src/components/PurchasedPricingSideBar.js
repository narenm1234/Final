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
import CurrencyFormat from "react-currency-format";
import {
  getDealerPaymentsData,
  getPurchaseDetails,
  onSubmitPayment,
} from "../service/api";

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
  dividerColor: {
    backgroundColor: "#df6060",
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
  const [accountInfo, setAccountInfo] = React.useState({});
  const [paymentMethods, SetPaymentMethods] = React.useState([]);
  const [accountMaskNumber, setAccountMaskNumber] = React.useState(null);
  const [purchasedData, setPurchasedData] = React.useState({});

  // const [value, setValue] = React.useState("");
  const [paymentType, setPaymentType] = React.useState("");
  const [paymentTypeName, setPaymentTypeName] = React.useState("");
  const [paymentTypeFee, setPaymentTypeFee] = React.useState(0);
  const [additionalPaymentTypeName, setAdditionalPaymentTypeName] =
    React.useState("");
  const [additionalPaymentTypeFee, setAdditionalPaymentTypeFee] =
    React.useState(0);
  const [totalFee, setTotalFee] = React.useState(0);
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

  useEffect(async () => {
    console.log("start condition report page  PurchasedPricingSideBar ",new Date());

    let getPurchaseDetailsRes = await getPurchaseDetails(props.vin);
    setPurchasedData(getPurchaseDetailsRes.data.data);
    console.log(
      "getPurchaseDetailsRes.data.data",
      getPurchaseDetailsRes.data.data
    );

    let getDealerPaymentsRes = await getDealerPaymentsData();
    console.log("getDealerPaymentsData==>", getDealerPaymentsRes);
    getDealerPaymentsRes &&
      getDealerPaymentsRes.data &&
      getDealerPaymentsRes.data.PaymentMethod &&
      SetPaymentMethods(getDealerPaymentsRes.data.PaymentMethod);

    // let reqObj = {
    //   "accountId": "8adc9a4170c2d2f80170c56d9be24c8f",
    //   "accountNumber": "t002-51690",
    //   "achAbaCode": "111111111",
    //   "achAccountNumberMask": "**************************2222",
    //   "achAccountType": "Checking",
    //   "paymentDetails": [
    //     {
    //       "amount": 200,
    //       "paymentCategory": "Payoff",
    //       "priceType": "Price"
    //     },
    //     {
    //       "amount": 300,
    //       "paymentCategory": "Residual",
    //       "priceType": "Price"
    //     }
    //   ],
    //   "paymentMethodId": "8adcd9eb74353a7101744ee82b2e0cdd",
    //   "paymentMethodType": "ACH",
    //   "tenantId": "t002",
    //   "vin": "JM1GL1XY6L1513120",
    //   // "vin": "KM3KFADM0L0797963",

    // }
    // let submitPaymentRes = await onSubmitPayment(reqObj);
    // console.log("submitPaymentRes:::", submitPaymentRes);
    console.log("start condition report page  PurchasedPricingSideBar ",new Date());

  }, []);

  useEffect(() => {
    console.log("start condition report page  PurchasedPricingSideBar paymentTypeFee",new Date());

    setTotalFee(paymentTypeFee);
    if (additionalPaymentTypeFee) {
      setTotalFee(parseFloat(paymentTypeFee + additionalPaymentTypeFee).toFixed(2));
    }
    console.log("end condition report page  PurchasedPricingSideBar paymentTypeFee",new Date());

  }, [paymentTypeFee, additionalPaymentTypeFee]);

  const handleChangeAccountName = (event) => {
    setAccountName(event.target.value);
    paymentMethods.forEach((item) => {
      if (item.achAccountName == event.target.value) {
        console.log(item);
        setAccountInfo(item);
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

  const handleChange = (event) => {
    // setValue(event.target.value);
    setPaymentType(event.target.value);
    getMakePatmentDetails(event.target.value);
  };

  const getMakePatmentDetails = (paymentTypeVal) => {
    let makepaymentdetails = [];

    if (paymentTypeVal == "1") {
      let payment = {
        amount: purchasedData.payOffAmount,
        paymentCategory: "Payoff",
        priceType: "Price",
      };
      makepaymentdetails.push(payment);
      setPaymentTypeFee(purchasedData.payOffAmount || 0);
      setPaymentTypeName("Payoff");
      setAdditionalPaymentTypeFee(null);
      setAdditionalPaymentTypeName("");
    } else if (paymentTypeVal == "2") {
      let payment = [
        {
          amount: purchasedData.remainingPmts,
          paymentCategory: "RemainingPayments",
          priceType: "Price",
        },
        {
          amount: purchasedData.residualAmount,
          paymentCategory: "Residual",

          priceType: "Price",
        },
      ];
      makepaymentdetails = payment;

      setPaymentTypeFee(purchasedData.residualAmount);
      setPaymentTypeName("Residual");
      setAdditionalPaymentTypeFee(purchasedData.remainingPmts);
      setAdditionalPaymentTypeName("Remaining Payments");
    } else if (paymentTypeVal == "3") {
      let payment = {
        amount: purchasedData.vehiclePrice,
        paymentCategory: "Market",
        priceType: "Price",
      };
      makepaymentdetails.push(payment);
      setPaymentTypeFee(purchasedData.vehiclePrice || 0);
      setPaymentTypeName("Market");
      setAdditionalPaymentTypeFee(null);
      setAdditionalPaymentTypeName("");
    } else if (paymentTypeVal == "4") {
      let payment = [
        {
          amount: purchasedData.vehiclePrice,
          paymentCategory: "Market",
          priceType: "Price",
        },
        {
          amount: purchasedData.remainingPmts,
          paymentCategory: "RemainingPayments", //"remainingPmts",
          priceType: "Price",
        },
      ];
      makepaymentdetails = payment;
      setPaymentTypeFee(purchasedData.vehiclePrice);
      setPaymentTypeName("Market");
      setAdditionalPaymentTypeFee(purchasedData.remainingPmts);
      setAdditionalPaymentTypeName("Remaining Payments");
    }

    return makepaymentdetails;
  };

  const purchaseVehical = async () => {
    // let makepaymentdetails = getMakePatmentDetails(paymentType);
    // let reqObj = {
    //   accountId: accountInfo?.accountId,
    //   accountNumber: localStorage.getItem("KintoID")
    //     ? localStorage.getItem("KintoID")
    //     : null,
    //   achAbaCode: "111111111",
    //   achAccountNumberMask: accountInfo?.achAccountNumberMask,
    //   achAccountType: accountInfo?.achAccountType,
    //   paymentDetails: makepaymentdetails,
    //   paymentMethodId: accountInfo?.id,
    //   paymentMethodType: accountInfo?.type,
    //   tenantId: "t002",
    //   vin: props.vin,
    //   // "vin": "KM3KFADM0L0797963",
    // };
    // let submitPaymentRes = await onSubmitPayment(reqObj);
    // console.log("submitPaymentRes:::", submitPaymentRes);

    // if (submitPaymentRes.data.success) {
    let transactionDetailsObj = {
      type: "confirm",
      totalFee,
      paymentTypeName,
      paymentTypeFee,
      vin: props.vin,
      accountInfo: accountInfo,
    };
    props.onPurchaseVehical(transactionDetailsObj);
    // }
  };

  useEffect(async () => {
    if (props.isConfirmPurchase) {
      let makepaymentdetails = getMakePatmentDetails(paymentType);
      let reqObj = {
        accountId: accountInfo?.accountId,
        accountNumber: localStorage.getItem("KintoID")
          ? localStorage.getItem("KintoID")
          : null,
        achAbaCode: "111111111",
        achAccountNumberMask: accountInfo?.achAccountNumberMask,
        achAccountType: accountInfo?.achAccountType,
        paymentDetails: makepaymentdetails,
        paymentMethodId: accountInfo?.id,
        paymentMethodType: accountInfo?.type,
        tenantId: "t002",
        vin: props.vin,
        groundingId: props.groundingId,
        // "vin": "KM3KFADM0L0797963",
      };
      let submitPaymentRes = await onSubmitPayment(reqObj);
      console.log("submitPaymentRes:::", submitPaymentRes);

      if (
        submitPaymentRes &&
        submitPaymentRes.data &&
        submitPaymentRes.data.success
      ) {
        let transactionDetailsObj = {
          type: "success",
          totalFee,
          paymentTypeName,
          paymentTypeFee,
          vin: props.vin,
          accountInfo: accountInfo,
        };
        props.onPurchaseVehical(transactionDetailsObj);
      } else {
        let transactionDetailsObj = {
          type: "failed",
          totalFee,
          paymentTypeName,
          paymentTypeFee,
          vin: props.vin,
          accountInfo: accountInfo,
        };
        props.onPurchaseVehical(transactionDetailsObj);
      }
    }
  }, [props.isConfirmPurchase]);

  return (
    <div className="manualPricingSidebar">
      <ListItem className="notesSectionHeader">Purchase Page</ListItem>
      <ListItem>
        <FormControl component="fieldset">
          <FormLabel component="legend">Vehicle Pricing Options</FormLabel>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            value={paymentType}
            onChange={handleChange}
          >
            <Box
              px={2}
              py={1}
              mt={1}
              boxShadow={"0px 0px 4px lightgray"}
              borderRadius={4}
            >
              <FormControlLabel
                value={"1"}
                control={<Radio />}
                label="Payoff"
                disabled = {purchasedData.payOffAmount ? false : true}
              />
              <p>
                {purchasedData.payOffAmount ? (
                  <CurrencyFormat
                    value={parseFloat(purchasedData.payOffAmount).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                ) : (
                  "$0.00"
                )}
              </p>
            </Box>
            <Box
              px={2}
              py={1}
              mt={1}
              boxShadow={"0px 0px 4px lightgray"}
              borderRadius={4}
            >
              <FormControlLabel
                value={"2"}
                control={<Radio />}
                label="Residual + Remaining Payments"
                disabled = {(purchasedData.remainingPmts + purchasedData.residualAmount) ? false : true}
              />
              <p>
                {purchasedData.remainingPmts + purchasedData.residualAmount ? (
                  <CurrencyFormat
                    value={parseFloat(
                      purchasedData.remainingPmts + purchasedData.residualAmount
                    ).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                ) : (
                  "$0.00"
                )}
              </p>
            </Box>
            <Box
              px={2}
              py={1}
              mt={1}
              boxShadow={"0px 0px 4px lightgray"}
              borderRadius={4}
            >
              <FormControlLabel
                value={"3"}
                control={<Radio />}
                label="Market"
                disabled = {purchasedData.vehiclePrice ? false : true}
              />
              <p>
                {purchasedData.vehiclePrice ? (
                  <CurrencyFormat
                    value={parseFloat(purchasedData.vehiclePrice).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                ) : (
                  "$0.00"
                )}
              </p>
            </Box>
            <Box
              px={2}
              py={1}
              mt={1}
              boxShadow={"0px 0px 4px lightgray"}
              borderRadius={4}
            >
              <FormControlLabel
                value={"4"}
                control={<Radio />}
                label="Market + Remaining Payments "
                disabled = {purchasedData.vehiclePrice + purchasedData.remainingPmts ? purchasedData.vehiclePrice ? false : true : true}
              />
              <p>
                {purchasedData.vehiclePrice + purchasedData.remainingPmts ? 
                 purchasedData.vehiclePrice ?(
                  <CurrencyFormat
                    value={parseFloat(
                      purchasedData.vehiclePrice + purchasedData.remainingPmts
                    ).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                ) :("$0.00"): (
                  "$0.00"
                )}
              </p>
            </Box>
          </RadioGroup>
        </FormControl>
      </ListItem>
      <Divider variant="middle" />
      {paymentTypeName && (
        <>
          <ListItem>
            <ListItemText className="manualPricing">
              {paymentTypeName} :
            </ListItemText>
            <ListItemText className="manualPricing">
              <Box textAlign={"end"}>
                {paymentTypeFee ? (
                  <CurrencyFormat
                    value={parseFloat(paymentTypeFee).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                ) : (
                  "$0.00"
                )}
              </Box>
            </ListItemText>
          </ListItem>
        </>
      )}
      {additionalPaymentTypeName && (
        <>
          <ListItem>
            <ListItemText className="manualPricing">
              {additionalPaymentTypeName} :
            </ListItemText>
            <ListItemText className="manualPricing">
              <Box textAlign={"end"}>
                {additionalPaymentTypeFee ? (
                  <CurrencyFormat
                    value={parseFloat(additionalPaymentTypeFee).toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                ) : (
                  "$0.00"
                )}
              </Box>
            </ListItemText>
          </ListItem>
        </>
      )}
      <ListItem>
        <ListItemText className="manualPricing">Admin Fee:</ListItemText>
        <ListItemText className="manualPricing">
          <Box textAlign={"end"}>Waived</Box>
        </ListItemText>
      </ListItem>
      <Divider variant="middle" />
      <ListItem>
        <ListItemText className="manualPricing">Total:</ListItemText>
        <ListItemText className="manualPricing">
          <Box textAlign={"end"}>
            {totalFee ? (
              <CurrencyFormat
                value={parseFloat(totalFee).toFixed(2)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            ) : (
              "$0.00"
            )}
          </Box>
        </ListItemText>
      </ListItem>
      {paymentType && (
        <>
          <Divider variant="middle" className={classes.dividerColor} />
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
                <Box
                  color={"black"}
                  p={1}
                  bgcolor={"lightgray"}
                  borderRadius={4}
                >
                  {accountMaskNumber || "****0000"}
                </Box>
              </Box>
            </ListItemText>
          </ListItem>
        </>
      )}
      <List className="purchasePassBtn">
        <Button
          className="passButton"
          color="primary"
          onClick={props.closePassVehiclePop}
        >
          Pass on Vehicle
        </Button>
        <Button
          disabled={!accountName || !paymentType}
          className="purchaseButton"
          color="secondary"
          // onClick={props.onPurchaseVehical}
          onClick={purchaseVehical}
        >
          Purchase Vehicle
        </Button>
      </List>
    </div>
  );
}
