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
import { getInspectionVehicleDetails, getVehicleSaleInfoByVin } from "../service/api";
import moment from "moment";
import ClearIcon from "@material-ui/icons/Clear";
import CurrencyFormat from "react-currency-format";

export default function AdminDetailedReport(props) {
  const [open, setOpen] = useState(false);
  const [vin, setVin] = useState(props.vin);
  const [inspectiondata, setinspectiondata] = useState({});
  const [vehicleSalesInfo, setVehicleSalesInfo] = useState({});
  // const [inspectiondata, setinspectiondata] = useState({});

  useEffect(() => {
    getVehicleSaleInformation();
  }, [vin]);

  async function getVehicleSaleInformation() { 
    let apiResponse = await getVehicleSaleInfoByVin(vin);
    console.log("getVehicleSaleInfoByVin==>", apiResponse);
    if(apiResponse && apiResponse.data && apiResponse.data.length !== 0){
      setVehicleSalesInfo(apiResponse.data[0]);
    } 
  }
  // async function getGroundingDetailsDetails() { 
  //   let apiResponse = await getGroundingDetailsByVin(vin);
  //   console.log("getGroundingDetailsByVin==>", apiResponse);
  //   if(apiResponse && apiResponse.data && apiResponse.data.data){
  //     setinspectiondata(apiResponse.data.data);
  //   } 
  // }

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
              <Box className="resultForVin">
                Results for VIN: {vin}
              </Box>
              <Box pl={2} pt={1}>
                {" "}
                <ClearIcon color="secondary" fontSize="small" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <div className="codereportimggallery">
              {inspectiondata && inspectiondata?.inspection_id && <MyGallery {...inspectiondata} />}
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className="ConditionReportSection">
              <div className="reportTitle">
                <span>Year Make Model Color</span>
              </div>
              {inspectiondata?.inspectionStatus === "COMPLETED" ? (
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
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Current Status </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
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
                        {inspectiondata?.customerReturnDate &&
                          moment(inspectiondata?.customerReturnDate).format(
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
                        {inspectiondata?.groundingDealerNumber}
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
                        {inspectiondata?.groundingDealerName}
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
                        {inspectiondata?.groundingDate &&
                          moment(inspectiondata?.groundingDate).format(
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
                        {inspectiondata.groundingMileage && (
                          <CurrencyFormat
                            value={inspectiondata.groundingMileage}
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
                        {inspectiondata?.transportationOrderedDate &&
                          moment(
                            inspectiondata?.transportationOrderedDate
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
                        {inspectiondata?.transportationCompany}
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
                        {inspectiondata?.bankruptcyCode}
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
                        {inspectiondata?.termCode}
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
                        {inspectiondata?.dealerExclusivityExpireDate &&
                          moment(
                            inspectiondata?.dealerExclusivityExpireDate
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
                      <span className="textSize">
                        {inspectiondata.account_type}
                      </span>
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
                        {inspectiondata?.residual}
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
                        {inspectiondata?.currentPayoffAmount}
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
                        {inspectiondata?.groundingDealerAuction}
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
                        {inspectiondata?.totalOutstandingRemainingPayments}
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
                        {inspectiondata?.guaranteedPayments}
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
                        {inspectiondata?.paymentGuarantee}
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
                        {" "}
                        {inspectiondata?.tenDayRuleNotChargeAmount}
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
                        {inspectiondata?.payoffAtGrounding}
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
                        {" "}
                        {inspectiondata?.marketBasedPrice}
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
                        {inspectiondata?.remainingPaymentsAtGrounding}
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
                      <span className="textSize"> ---</span>
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
                        {inspectiondata?.inspectionDate &&
                          moment(inspectiondata?.inspectionDate).format(
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
                        {inspectiondata?.inspectionStatus}
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
                        {inspectiondata?.inspectionMileage && (
                          <CurrencyFormat
                            value={inspectiondata?.inspectionMileage}
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
                        {inspectiondata?.masterKeysReturned}
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
                        {inspectiondata?.valetKeysReturned}
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
                        {inspectiondata?.inspectionType}
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
                        {inspectiondata?.excessWearAndTear && (
                          <CurrencyFormat
                            value={inspectiondata?.excessWearAndTear}
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
                          moment(vehicleSalesInfo?.sale_date).format("MM/DD/YYYY")}
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
