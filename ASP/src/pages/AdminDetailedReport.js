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
import { getInspectionVehicleDetails } from "../service/api";
import moment from "moment";
import ClearIcon from "@material-ui/icons/Clear";

export default function AdminDetailedReport(props) {
  let groundingDetails = {
    "Account Number": "00000000000",
    "Current Status": "Detail",
    "Customer Return Date": "00/00/2021",
    "Current Status": "Detail",
    "Grounding Dealer Number": "00000000000",
    "Grounding Dealer Name": "Dealer Name",
    "Grounding Date": "00/00/2021",
    "Grounding Mileage": "000,000 mi",
    "Transportation Order Date": "00/00/2021",
    "Transportation Company": "Company Name",
    "Bankruptcy Code": "Detail",
    "Term Code": "Detail",
    "Dealer Exclusivity Expire Date": "00/00/2021",
    Type: "Detail",
    Residual: "$00,000.00",
    "Current Payoff Amount": "$00,000.00",
    "Grounding Dealer Auction": "Detail",
    "Total Outstanding Remaining Payments": "00",
    "Guaranteed Payments": "$00,000.00",
    "Payment Guarantee": "Yes/No",
    "10-Day Rule No Charge Amount": "$00,000.00",
    "Payoff at Grounding": "?????",
    "Market Based Price": "$00,000.00",
    "Remaining Payments at Grounding": "$00,000.00",
  };
  let inspectionDetails = {
    "Inspection Scheduled Date": `${moment(
      props?.inspectiondata?.inspection_date
    ).format("MM/DD/YYYY")}`,
    "Inspection Date": "00/00/2021",
    "Inspection Status": "Detail",
    "Inspection Mileage": "000,000 mi",
    "Master Keys Returned": "00",
    "Value Keys Returned": "00",
    "Inspection Type": "Detail",
    "Excess Wear & Tear Amount": "$00,000.00",
  };

  let purchaseDetails = {
    "Sold Date": "00/00/2021",
    "Purchasing Dealer": "Dealer Name",
    "Purchase Dealer Number": "00000000000",
    "Purchase Type": "Detail",
    "Gross Purchase Amount": "$00,000.00",
    "Purchasing Dealer Legal Name": "Detail",
  };
  const [open, setOpen] = useState(false);
  const [inspectiondata, setinspectiondata] = useState(props.inspectiondata);

  console.log("admndetailedreport props:", props);

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
              <Box class="resultForVin">
                Results for VIN: {inspectiondata.vin}
              </Box>
              <Box pl={2} pt={1}>
                {" "}
                <ClearIcon color="secondary" fontSize="small" />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <div className="codereportimggallery">
              {inspectiondata && <MyGallery {...inspectiondata} />}
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className="ConditionReportSection">
              <div className="reportTitle">
                <span>Year Make Model Color</span>
              </div>
              <span className="ConditionReportInspection">
                <span className="BadgeValue">Inspection Complete</span>
              </span>
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
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          {" "}
                          Grounding Dealer Number{" "}
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          {" "}
                          Grounding Dealer Name{" "}
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Grounding Date</span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Grounding Mileage </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          {" "}
                          Transportation Order Date{" "}
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          Transportation Company{" "}
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Bankruptcy Code </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Term Code </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          Dealer Exclusivity Expire Date{" "}
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Type </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Residual </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          {" "}
                          Current Payoff Amount{" "}
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          {" "}
                          Grounding Dealer Auction{" "}
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          {" "}
                          Total Outstanding Remaining Payments{" "}
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Guaranteed Payments </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Payment Guarantee </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          {" "}
                          10-Day Rule No Charge Amount{" "}
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Payoff at Grounding </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Market Based Price </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          {" "}
                          Remaining Payments at Grounding{" "}
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
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
                          {" "}
                          Inspection Scheduled Date{" "}
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Inspection Date </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Inspection Status </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Inspection Mileage </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Master Keys Returned </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Value Keys Returned </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold"> Inspection Type </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                          {" "}
                          Excess Wear & Tear Amount{" "}
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
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
                        <span className="textBold">
                        Sold Date
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                        Purchasing Dealer
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                        Purchase Dealer Number
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                        Purchase Type
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
                    </ListItemSecondaryAction>
                  </List>
                  <List className="paddingCSS">
                    <ListItemText>
                      <span className="textStyle">
                        <span className="textBold">
                        Gross Purchase Amount
                        </span>
                      </span>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <span className="textSize">---</span>
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
                      <span className="textSize">---</span>
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
