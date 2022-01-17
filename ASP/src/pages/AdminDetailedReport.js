import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Box from "@material-ui/core/Box";
import MyGallery from "./ImageGallery";
import {
  getGroundingDetailsByVin,
  getInspectionVehicleDetails,
  getVehicleSaleInfoByVin,
} from "../service/api";
import moment from "moment";
import ClearIcon from "@material-ui/icons/Clear";
import CurrencyFormat from "react-currency-format";

export default function AdminDetailedReport(props) {
  const [open, setOpen] = useState(false);
  const [vin, setVin] = useState(props.vin);
  const [groundingDetails, setGroundingDetails] = useState({});
  const [inspectionVehicleDetails, setInspectionVehicleDetails] = useState({});
  const [inspectiondata, setInspectionVehicleDatas] = useState({});
  const [vehicleSalesInfo, setVehicleSalesInfo] = useState({});

  useEffect(() => {
    getGroundingDetailsDetails();
    getInspectionVehicleDeta();
    getVehicleSaleInformation();
  }, [vin]);

  async function getGroundingDetailsDetails() {
    let apiResponse = await getGroundingDetailsByVin(vin);
    console.log("getGroundingDetailsByVin==>", apiResponse);
    if (apiResponse && apiResponse.data && apiResponse.data.data) {
      setGroundingDetails(apiResponse.data.data);
    }
  }

  async function getInspectionVehicleDeta() {
    let apiResponse = await getInspectionVehicleDetails(vin);
    console.log("getInspectionVehicleDeta==>", apiResponse);
    if (apiResponse && apiResponse.data) {
      setInspectionVehicleDetails(apiResponse.data);
    }
  }

  async function getVehicleSaleInformation() {
    let apiResponse = await getVehicleSaleInfoByVin(vin);
    console.log("getVehicleSaleInfoByVin==>", apiResponse);
    if (apiResponse && apiResponse.data) {
      setVehicleSalesInfo(apiResponse.data);
    }
  }

  

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <div className="conditionPageCard">
      <Box pt={5}>
        <Grid container spacing={3} className="ConditionCardReportSpace">
          <Grid item md={12}>
            <Box display={"flex"} alignItems={"center"}>
              <Box className="resultForVin">Results for VIN: {vin}</Box>
              <Box pl={2} pt={1}>
                {" "}
                <ClearIcon color="secondary" fontSize="small" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <div className="codereportimggallery">
              {inspectionVehicleDetails && inspectionVehicleDetails?.inspection_id && (
                <MyGallery {...inspectionVehicleDetails} />
              )}
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className="ConditionReportSection">
              <div className="reportTitle">
                <span>Year Make Model Color</span>
              </div>
              {groundingDetails?.inspectionStatus === "COMPLETED" ? (
                <span className="ConditionReportInspection">
                  <span className="BadgeValue">Inspection Complete</span>
                </span>
              ) : (
                <span className="ConditionReportInspectionPending">
                  <span className="BadgeValue">Inspection Pending</span>
                </span>
              )}
            </div>

            <Grid container spacing={3}>
              <Card className="vehicleSectionCR">
                <Typography variant="h6">Grounding Details</Typography>
                <hr />
                <CardContent>
                  {/* {Object.entries(groundingDetails).map(([key, value]) => {
                    return (
                      <List className="paddingCSS" key={key}>
                        <ListItemText>
                          <span className="textStyle">
                            <span className="textBold"> {key} </span>
                          </span>
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <span className="textSize">{value}</span>
                        </ListItemSecondaryAction>
                      </List>
                    );
                  })} */}

                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Account Number </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {" "}
                        {groundingDetails?.accountNumber}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Current Status </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {" "}
                        {groundingDetails?.currentStatus}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Customer Return Date </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.customerReturnDate &&
                          moment(groundingDetails?.customerReturnDate).format(
                            "MM/DD/YYYY"
                          )}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          Grounding Dealer Number
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.groundingDealerNumber}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">Grounding Dealer Name</span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.groundingDealerName}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Grounding Date</span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.groundingDate &&
                          moment(groundingDetails?.groundingDate).format(
                            "MM/DD/YYYY"
                          )}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Grounding Mileage </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails.groundingMileage && (
                          <CurrencyFormat
                            value={groundingDetails.groundingMileage}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" MI"}
                          />
                        )}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          Transportation Order Date
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.transportationOrderedDate &&
                          moment(
                            groundingDetails?.transportationOrderedDate
                          ).format("MM/DD/YYYY")}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">Transportation Company</span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.transportationCompany}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Bankruptcy Code </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.bankruptcyCode}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Term Code </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.termCode}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          Dealer Exclusivity Expire Date
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.dealerExclusivityExpireDate &&
                          moment(
                            groundingDetails?.dealerExclusivityExpireDate
                          ).format("MM/DD/YYYY")}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Type </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">{groundingDetails.type}</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Residual </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.residual}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">Current Payoff Amount</span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.currentPayoffAmount}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          Grounding Dealer Auction
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.groundingDealerAuction}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          Total Outstanding Remaining Payments
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.totalOutstandingRemainingPayments}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Guaranteed Payments </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.guaranteedPayments}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Payment Guarantee </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.paymentGuarantee}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          10-Day Rule No Charge Amount
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.tenDayRuleNotChargeAmount}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Payoff at Grounding </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.payoffAtGrounding}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Market Based Price </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.marketBasedPrice}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          Remaining Payments at Grounding
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {groundingDetails?.remainingPaymentsAtGrounding}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                </CardContent>

                <Typography variant="h6">Inspection Details</Typography>
                <hr />
                <CardContent>
                  {/* {Object.entries(inspectionDetails).map(([key, value]) => {
                    return (
                      <List className="paddingCSS" key={key}>
                        <ListItemText>
                          <span className="textStyle">
                            <span className="textBold"> {key} </span>
                          </span>
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <span className="textSize">{value}</span>
                        </ListItemSecondaryAction>
                      </List>
                    );
                  })} */}

                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          Inspection Scheduled Date
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                      {inspectionVehicleDetails?.inspection_req_date &&
                          moment(inspectionVehicleDetails?.inspection_req_date).format(
                            "MM/DD/YYYY"
                          )}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Inspection Date </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {inspectionVehicleDetails?.inspection_date &&
                          moment(inspectionVehicleDetails?.inspection_date).format(
                            "MM/DD/YYYY"
                          )}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Inspection Status </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {inspectionVehicleDetails?.inspection_status}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Inspection Mileage </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {inspectionVehicleDetails?.inspection_mileage && (
                          <CurrencyFormat
                            value={inspectionVehicleDetails?.inspection_mileage}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" MI"}
                          />
                        )}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Master Keys Returned </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {inspectionVehicleDetails?.keys?.keys}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Value Keys Returned </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {inspectionVehicleDetails?.keys?.valet}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Inspection Type </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {inspectionVehicleDetails?.inspection_type}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          Excess Wear & Tear Amount
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {inspectionVehicleDetails?.ewu && (
                          <CurrencyFormat
                            value={inspectionVehicleDetails?.ewu}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix="$"
                            suffix={".00"}
                          />
                        )}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                </CardContent>
                <Typography variant="h6">Purchase Details</Typography>
                <hr />
                <CardContent>
                  {/* {Object.entries(purchaseDetails).map(([key, value]) => {
                    return (
                      <List className="paddingCSS" key={key}>
                        <ListItemText>
                          <span className="textStyle">
                            <span className="textBold"> {key} </span>
                          </span>
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <span className="textSize">{value}</span>
                        </ListItemSecondaryAction>
                      </List>
                    );
                  })} */}

                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">Sold Date</span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {vehicleSalesInfo?.sale_date &&
                          moment(vehicleSalesInfo?.sale_date).format(
                            "MM/DD/YYYY"
                          )}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">Purchasing Dealer</span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {vehicleSalesInfo?.dealer_name}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">Purchase Dealer Number</span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {vehicleSalesInfo?.dealer_number}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">Purchase Type</span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {vehicleSalesInfo?.sale_process_stage}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">Gross Purchase Amount</span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {vehicleSalesInfo?.total_sale_amount}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          Purchasing Dealer Legal Name
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">
                        {vehicleSalesInfo?.dealer_legal_name}
                      </span>
                    </ListItemSecondaryAction>
                  </List>
                </CardContent>
                <div className="disclaimerVRS">
                  Disclaimer: The parts, equipment, accessories, and other
                  information listed above are based on equipment/configuration
                  at the time vehicle was sold by Mazda Motor Corporation to a
                  dealer and does not mean that this vehicle is still so
                  equipped.
                </div>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
