import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import MyGallery from "./ImageGallery";
import { getInspectionVehicleDetails } from "../service/api";
import moment from "moment";

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
  const [open, setOpen] = React.useState(false);
  const [condionVehicleDetails, setCondionVehicleDetails] = useState({});
  const [vin, setvin] = useState("JM3KFBDM0K1698372");

  console.log("admndetailedreport props:", props);

  useEffect(() => {
    getConditionVehicleDetails();
  }, [vin]);

  async function getConditionVehicleDetails() {
    let apiResponse = await getInspectionVehicleDetails(vin);
    console.log("getConditionVehicleDetailsresponse", apiResponse);
    setCondionVehicleDetails(apiResponse.data);
  }

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <div className="conditionPageCard">
      <Grid container spacing={3} className="ConditionCardReportSpace">
        <Grid item xs={5}>
          <MyGallery {...condionVehicleDetails} />
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
                {Object.entries(groundingDetails).map(([key, value]) => {
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
                })}
              </CardContent>

              <Typography variant="h6">Inspection Details</Typography>
              <hr />
              <CardContent>
                {Object.entries(inspectionDetails).map(([key, value]) => {
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
                })}
              </CardContent>
              <Typography variant="h6">Purchase Details</Typography>
              <hr />
              <CardContent>
                {Object.entries(purchaseDetails).map(([key, value]) => {
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
                })}
              </CardContent>
              <div className="disclaimerVRS">
                Disclaimer: The parts, equipment, accessories, and other
                information listed above are based on equipment/configuration at
                the time vehicle was sold by Mazda Motor Corporation to a dealer
                and does not mean that this vehicle is still so equipped.
              </div>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
