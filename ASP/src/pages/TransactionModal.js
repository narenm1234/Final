import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Box, Button } from "@material-ui/core";

import confirmmark from "../assets/images/confirm.svg";
import Checkmark from "../assets/images/success.svg";
import Crossmark from "../assets/images/failure.svg";
import CurrencyFormat from "react-currency-format";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    width: 400,
    //   padding: theme.spacing(2, 4, 3),
    borderRadius: 5,
  },
  btntext: {
    textTransform: "capitalize",
  },
  redText: {
    color: "red",
  },
}));

function TransactionModal(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.open}
        onClose={props.onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <div className={classes.paper}>
            <Box
              display="flex"
              borderBottom={1}
              borderColor={"grey.500"}
              id="transition-modal-title"
              alignItems={"center"}
            >
              <Box
                borderRight={1}
                borderColor={"grey.500"}
                width={70}
                textAlign={"center"}
              >
                {props.type === "confirm" ? (
                  <img src={confirmmark} width="50px" />
                ) : null}
                {props.type === "success" ? (
                  <img src={Checkmark} width="50px" />
                ) : null}
                {props.type === "failed" ? (
                  <img src={Crossmark} width="50px" />
                ) : null}
              </Box>
              <Box width={330} py={1} px={2}>
                {props.type === "confirm" ? (
                  <Box>
                    <Box component={"h2"}> Confirm Purchase </Box>
                    <small> Verify your purchase details </small>
                  </Box>
                ) : null}
                {props.type === "success" ? (
                  <Box>
                    <Box component={"h2"}> Success! </Box>
                    <small> Vehical purchased </small>
                  </Box>
                ) : null}
                {props.type === "failed" ? (
                  <Box>
                    <Box component={"h2"}> Transaction Failed </Box>
                    <small className={classes.redText}>
                      {" "}
                      Unable to complete payment, Please try again{" "}
                    </small>
                  </Box>
                ) : null}
              </Box>
            </Box>
            <Box p={2} id="transition-modal-description">
              <Box component={"h4"}>
                {props.modelHeadertitle}
                {/* 2019 Mazda Mazda6 Grand Touring, Machine Gray Metallic */}
              </Box>
              <small> VIN {props.transactionInfo && props.transactionInfo.vin}</small>
              <Box p={2} my={2} borderRadius={5} bgcolor={"#e6e6e6"}>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box color={"#000000"} fontWeight={500}>
                    {props.transactionInfo?.paymentTypeName}
                  </Box>
                  <Box color={"#5e5e5e"}>
                  <CurrencyFormat
                  value={
                    parseFloat(props.transactionInfo?.paymentTypeFee || 0).toFixed(2)
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                  </Box>
                </Box>
                {props.transactionInfo?.additionalPaymentTypeName ? <>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box color={"#000000"} fontWeight={500}>
                    {props.transactionInfo?.additionalPaymentTypeName}
                  </Box>
                  <Box color={"#5e5e5e"}>
                  <CurrencyFormat
                  value={
                    parseFloat(props.transactionInfo?.additionalPaymentTypeFee || 0).toFixed(2)
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                  </Box>
                </Box></>:null}
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box color={"#000000"} fontWeight={500}>
                    Admin Fee
                  </Box>
                  <Box color={"#5e5e5e"}>Waived</Box>
                </Box>
                <Box borderBottom={1} borderColor={"error.main"} my={1}></Box>
                <Box display={"flex"} justifyContent={"space-between"}>
                  <Box fontWeight={"fontWeightBold"}>Total</Box>
                  <Box fontWeight={"fontWeightBold"}>
                  <CurrencyFormat
                  value={
                    props.transactionInfo?.totalFee || 0
                  }
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                  </Box>
                </Box>
              </Box>

              <Box display={"flex"} justifyContent={"space-between"} px={1}>
                <Box fontWeight={500}>Bank Account</Box>
                <Box fontWeight={500}>{props.transactionInfo?.accountInfo?.achAccountNumberMask}</Box>
              </Box>

              {props.type !== "confirm" ? (
                <Box
                  display={"flex"}
                  justifyContent={"space-between"}
                  px={1}
                  mt={1}
                >
                  <Box fontWeight={500}>Transaction Number</Box>
                  {props.type === "success" ? (
                    <Box fontWeight={500}>00000000000</Box>
                  ) : null}
                </Box>
              ) : null}

              {props.type !== "confirm" ? (
                <Box p={1} my={2} borderRadius={5} bgcolor={"#faffbd"}>
                  <Box fontSize={12}>
                    Purchanse transaction may be completed, but the funds will
                    be pulled from your bank account in 2-3 days.
                  </Box>
                </Box>
              ) : null}

              {props.type === "confirm" ? (
                <Box display={"flex"} justifyContent={"end"} pt={3}>
                  <Box mr={2}>
                    <Button
                      variant="outlined"
                      className={classes.btntext}
                      onClick={props.onClose}
                    >
                      Cancel
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.btntext}
                      onClick={props.confirmPurchase}
                    >
                      Confirm
                    </Button>
                  </Box>
                </Box>
              ) : null}

              {props.type !== "confirm" ? (
                <Box display={"flex"} justifyContent={"end"} pt={3}>
                  <Box>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.btntext}
                      onClick={props.handleContinue}
                    >
                      Continue
                    </Button>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default TransactionModal;
