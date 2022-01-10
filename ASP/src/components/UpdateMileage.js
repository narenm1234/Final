import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ViewDetailedReport from "../pages/ViewDetailedReport";
import CurrencyFormat from "react-currency-format";
import MyGallery from "../pages/ImageGallery";
import PrintSharp from "@material-ui/icons/PrintSharp";
import Button from "@material-ui/core/Button";
import {
  getPassedList1,
  getInspectionDamageDetailsApi,
  getOEMBuildDetailsApi,
  getPurchasedList,
} from "../service/api";
import {
  getInspectionVehicleDetails,
  getInspectionAccessoryDetails,
  getInspectionWheelTiresDetails,
} from "../service/api";
import moment from "moment";
import PurchasedPricingSideBar from "../components/PurchasedPricingSideBar";
import TransactionModal from "../pages/TransactionModal";
import { Box } from "@material-ui/core";
import UpdateMileagePricing from "./UpdateMileagePricing";
import ClearIcon from "@material-ui/icons/Clear";

export default function UpdateMileage(props) {
  let listOfItem = [
    "VIN",
    "Engine",
    "Door",
    "Body Style",
    "Transmission",
    "Drive Train",
    "Interior type",
    "Interior Color",
    "Keys",
    "Interior Type",
    "Odor",
    "Grounding Mileage",
    "Account Type",
  ];

  let wheelTyrelistOfItem = ["LF", "RF", "LR", "RR", "SP", "RR"];
  const [open, setOpen] = React.useState(false);
  const [condionVehicleDetails, setCondionVehicleDetails] = React.useState(props.inspectiondata);
  const [accessoryDetails, setAccessoryDetails] = React.useState([]);
  const [wheelTiresDetails, setWheelTiresDetails] = useState([]);
  const [vin, setVin] = React.useState(props?.vin);
  const [purchaseSection, setPurchaseSection] = React.useState(
    props?.location?.state?.purchaseSection
  );
  const [inspectionId, setInspectionId] = React.useState(props.inspectiondata.inspection_id);
  const [VehicleResponse, setVehicleResponse] = useState([]);
  //const [value, setValue] = useState([])
  const [DamageDetails, setDamageDetails] = useState([]);
  const [OEMBuildDetailsData, setOEMBuildDetailsData] = useState([]);
  const [vehicleDetails, setvehicleDetails] = React.useState(
    props?.location?.state?.vehicleDetails
  );

  const [openTransactionPopup, setOpenTransactionPopup] = useState(false);

  useEffect(() => {
    getOEMBuildDetails();
    // getConditionVehicleDetails();
    getVehicleDetails();
    getInspectionAccessory(vin);
  }, [vin]);

  async function getOEMBuildDetails() {
    let apiResponse = await getOEMBuildDetailsApi(vin);
    setOEMBuildDetailsData(apiResponse.data);
  }

  async function getInspectionDamageDetails() {
    let getInspectionDamageDetailsaApiResponse =
      await getInspectionDamageDetailsApi(inspectionId, vin);
    setDamageDetails(getInspectionDamageDetailsaApiResponse.data);
  }
  async function getVehicleDetails() {
    let apiResponse = await getPurchasedList(vin);
    setVehicleResponse(apiResponse.data.data);
  }

  useEffect(() => {
    getInspectionWheelTires(inspectionId);
    getInspectionDamageDetails(inspectionId);
  }, [inspectionId]);

  // async function getConditionVehicleDetails() {
  //   let apiResponse = await getInspectionVehicleDetails(vin);
  //   console.log("getConditionVehicleDetailsresponse", apiResponse);
  //   apiResponse &&
  //     apiResponse.data &&
  //     setCondionVehicleDetails(apiResponse.data);
  //   apiResponse &&
  //     apiResponse.data &&
  //     apiResponse.data.inspection_id &&
  //     setInspectionId(apiResponse.data.inspection_id);
  // }

  async function getInspectionAccessory(vin) {
    let apiResponse = await getInspectionAccessoryDetails(vin);
    setAccessoryDetails(apiResponse.data);
    console.log("xxxxxxxxx", apiResponse.data);
  }

  async function getInspectionWheelTires(inspectionId) {
    let apiResponse = await getInspectionWheelTiresDetails(inspectionId);
    console.log("wheelTiresDetailsapires", apiResponse);
    setWheelTiresDetails(apiResponse.data);
    console.log("-------------xxxxxx", inspectionId);
  }

  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
     <Box display={"flex"} alignItems={"center"} mb={2}>
        <Box className="resultForVin">Results for VIN: {condionVehicleDetails.vin}</Box>
        <Box pl={2} pt={1}>
          <ClearIcon color="secondary" fontSize="small" />
        </Box>
      </Box>
      <div className="myContainerLayout">
        <div>
          {condionVehicleDetails?.inspection_date &&
          condionVehicleDetails?.inspection_date ? (
            <Box px={2}>
              <Grid container spacing={3} className="ConditionCardReportSpace">
                <Grid item xs={5}>
                  <div className="codereportimggallery">
                    <MyGallery {...condionVehicleDetails} />
                  </div>
                  <Grid container className="ConditionCardBody">
                    <div className="damageTitle">
                      <span>Damage Report</span>
                    </div>
                    <Grid item xs={4}>
                      <Card className="ConditionCardDamage">
                        <CardContent>
                          <div className="smallCardTitle">Exterior total</div>
                          <div className="smallCardBody warningColor">
                            {}
                            {DamageDetails.exteriorCost ? (
                              <CurrencyFormat
                                value={DamageDetails.exteriorCost}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                suffix={".00"}
                              />
                            ) : (
                              "$0.0"
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card className="ConditionCardDamage">
                        <CardContent>
                          <div className="smallCardTitle">Interior total</div>
                          <div className="smallCardBody warningColor">
                            {}
                            {DamageDetails.interiorCost ? (
                              <CurrencyFormat
                                value={DamageDetails.interiorCost}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                suffix={".00"}
                              />
                            ) : (
                              "$0.0"
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={4}>
                      <Card className="ConditionCardDamage">
                        <CardContent>
                          <div className="smallCardTitle">Mechanical total</div>
                          <div className="smallCardBody warningColor">
                            {}
                            {DamageDetails.maintainenceCost ? (
                              <CurrencyFormat
                                value={DamageDetails.maintainenceCost}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                                suffix={".00"}
                              />
                            ) : (
                              "$0.0"
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12}>
                      <Box py={4} display={'flex'} justifyContent={'center'}>
                      <Button
                        variant="outlined"
                        color="primary"
                        className="detailedReport"
                        onClick={handleOpen}
                        disabled={!condionVehicleDetails?.inspection_date}
                      >
                        View Full Damage Report
                      </Button>
                      </Box>
                      
                    </Grid>
                    <Grid item xs={12}>
                      <div className="disclaimerVRS">
                        Disclaimer: Damage estimates are included for reference
                        and may not be reflective of the actual repair costs
                      </div>
                    </Grid>
                  </Grid>
                  <div className="LabelTextTextArea">Announcements</div>
                  <TextareaAutosize
                    className="inputFieldTextArea"
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    defaultValue="Text area describes when a vehicle may have possible structural damage. This is non editable text/container, but you can drag the container corner for more height if the user wants to see more info without having to scroll, if there is a lot of copy. "
                  />
                </Grid>
                <Grid item xs={7}>
                  <div className="ConditionReportSection">
                    <div className="reportTitle">
                      <span>
                        {vehicleDetails && vehicleDetails.model_year}{" "}
                        {vehicleDetails && vehicleDetails.brand}{" "}
                        {vehicleDetails && vehicleDetails.model}{" "}
                        {vehicleDetails && vehicleDetails.ext_color}{" "}
                      </span>
                    </div>
                    {condionVehicleDetails?.inspection_date && (
                      <span className="ConditionReportInspection">
                        <span className="BadgeValue">Inspection Complete</span>
                      </span>
                    )}
                  </div>
                  <Grid container spacing={1}>
                    <Grid item xs={4} className="ConditionCardMargin">
                      <Card className="ConditionCard">
                        <CardContent>
                          <div className="smallCardTitle">Payoff</div>
                          <div className="smallCardBody">
                            <span className="textSize">
                              {vehicleDetails?.pay_off_amt ? (
                                <CurrencyFormat
                                  value={vehicleDetails?.pay_off_amt}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                  suffix=".00"
                                />
                              ) : (
                                "$0.0"
                              )}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={4} className="ConditionCardMargin">
                      <Card className="ConditionCard">
                        <CardContent>
                          <div className="smallCardTitle1">
                            Residual + Remaining
                          </div>
                          <div className="smallCardBody">
                            <span className="textSize">
                              {vehicleDetails?.residual_amt ||
                              vehicleDetails?.remaining_pmts ? (
                                <CurrencyFormat
                                  value={
                                    vehicleDetails?.residual_amt +
                                    vehicleDetails?.remaining_pmts
                                  }
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                  suffix=".00"
                                />
                              ) : (
                                "$0.0"
                              )}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={4} className="ConditionCardMargin">
                      <Card className="ConditionCard">
                        <CardContent>
                          <div className="smallCardTitle">Market Based</div>
                          <div className="smallCardBody">
                            <span className="textSize">
                              {vehicleDetails?.vehicle_price ? (
                                <CurrencyFormat
                                  value={vehicleDetails?.vehicle_price}
                                  displayType={"text"}
                                  thousandSeparator={true}
                                  prefix={"$"}
                                  suffix=".00"
                                />
                              ) : (
                                "$0.0"
                              )}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={4} className="ConditionCardMargin">
                      <Card className="ConditionCard">
                        <CardContent>
                          <div className="smallCardTitle">Inspection Grade</div>
                          <div className="smallCardBody">
                            {condionVehicleDetails?.condition_grade}
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={4} className="ConditionCardMargin">
                      <Card className="ConditionCard">
                        <CardContent>
                          <div className="smallCardTitle">Odometer</div>
                          <div className="smallCardBody">
                            <CurrencyFormat
                              value={
                                condionVehicleDetails?.inspection_mileage
                                  ? condionVehicleDetails.inspection_mileage
                                  : ""
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              suffix={"  MI"}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Card className="vehicleSectionCR">
                      <Typography variant="h6" className="vehicleDetailsMargin">
                        Vehicle Details
                      </Typography>
                      <hr />
                      <CardContent>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> VIN </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">{vin}</span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold">
                                {" "}
                                Inspection Date{" "}
                              </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {moment(
                                condionVehicleDetails?.inspection_date
                              ).format("MM/DD/YYYY")}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold">
                                {" "}
                                Inspection Location{" "}
                              </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.location_name}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle1">
                              <span>.</span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.location_address}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle1">
                              <span> . </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.location_address2}
                              {condionVehicleDetails?.location_city}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle1">
                              <span> . </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.location_state}-
                              {condionVehicleDetails?.location_zip}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle1">
                              <span> . </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.location_phone}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Consignor </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.consignor}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Engine </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.engine_cylinder}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Door </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.doors}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Body Style </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.body_style}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Transmission </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.transmission_type}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Drive Train </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.driveTrain}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Exterior color </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.ext_color}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Interior Type </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.interior_material}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Interior color </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.int_color}
                            </span>
                          </ListItemSecondaryAction>
                        </List>

                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Keys </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              Master: {condionVehicleDetails?.keys.keys}/ Valet:{" "}
                              {condionVehicleDetails?.keys.valet}
                            </span>
                            <span className="textSize">
                              Smart Key: {condionVehicleDetails?.keys.smartKey}{" "}
                              / Remotes:
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold">
                                {" "}
                                Grounding Mileage{" "}
                              </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize"></span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Account Type </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize"></span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Odor </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.odor == "true"
                                ? "Yes"
                                : "None"}
                            </span>
                          </ListItemSecondaryAction>
                        </List>
                      </CardContent>

                      <CardContent>
                        <Typography variant="h6">Accessories</Typography>
                        <hr />
                        <Box className="accessoriestextStyle">
                          {accessoryDetails.length > 0 &&
                            accessoryDetails.map((list, index) => {
                              return (
                                <Box key={index} className="accessoriestinlineextStyle">
                                  <Typography variant="span">
                                    {list.description.toLowerCase()}
                                  </Typography>
                                </Box>
                              );
                            })}
                        </Box>
                      </CardContent>
                      <CardContent>
                        <Typography variant="h6">Build Data</Typography>
                        <hr />
                        <TableContainer component={Paper}>
                          <Table
                            className="table"
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Code</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">
                                  Package Details
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {OEMBuildDetailsData.map((list, index) => {
                                return (
                                  <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                      {list.accessory_code}
                                    </TableCell>
                                    <TableCell align="left">
                                      {list.description}
                                    </TableCell>
                                    <TableCell align="left"> </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                      <CardContent>
                        <Typography variant="h6">Wheels and Tyres</Typography>
                        <hr />
                        <TableContainer component={Paper}>
                          <Table
                            className="table"
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Location</TableCell>
                                <TableCell align="center">Brand</TableCell>
                                <TableCell align="center">Size</TableCell>
                                <TableCell align="center">Wheel</TableCell>
                                <TableCell align="center">
                                  Tread Depth
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {wheelTiresDetails?.map((list, index) => {
                                return (
                                  <TableRow key={index}>
                                    {/* <TableCell component="th" scope="row">
                                                                {wheelTiresDetails?.tire_location}
                                                            </TableCell> */}
                                    <TableCell align="center">
                                      {
                                        list.inspectionWheelTiresId
                                          .tire_location
                                      }
                                    </TableCell>
                                    <TableCell align="center">
                                      {list.manufracturer}
                                    </TableCell>
                                    <TableCell align="center">
                                      {list.size}
                                    </TableCell>
                                    <TableCell align="center">
                                      {list.wheel}
                                    </TableCell>
                                    <TableCell align="center">
                                      {list.tread}
                                    </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>

                      <div className="disclaimerVRS">
                        Disclaimer: The parts, equipment, accessories, and other
                        information listed above are based on
                        equipment/configuration at the time vehicle was sold by
                        Mazda Motor Corporation to a dealer and does not mean
                        that this vehicle is still so equipped.
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          ) : (
            <Box px={2}>
              <Grid container spacing={3} className="ConditionCardReportSpace">
                <Grid item xs={5}>
                  <Grid>
                    <div className="imageReportSection">
                      <img src="TMZ.png" alt="Mazda Logo" width="100%" />
                    </div>
                  </Grid>

                  <Grid container className="ConditionCardBody">
                    <div className="damageTitle">
                      <span>Damage Report</span>
                    </div>
                    <div className="pendingReport">
                      <span>Pending Inspection Report</span>
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={7}>
                  <div className="ConditionReportSection">
                    <div className="reportTitle">
                      <span>
                        {vehicleDetails && vehicleDetails.model_year}{" "}
                        {vehicleDetails && vehicleDetails.brand}{" "}
                        {vehicleDetails && vehicleDetails.model}{" "}
                        {vehicleDetails && vehicleDetails.ext_color}{" "}
                      </span>
                    </div>

                    <span className="inspectionStatusWarning">
                      <span className="BadgeValue">Inspection pending</span>
                    </span>
                  </div>
                  <Grid container spacing={1}>
                    <Grid item xs={4} className="ConditionCardMargin">
                      <Card className="ConditionCard">
                        <CardContent>
                          <div className="smallCardTitle">Payoff</div>
                          <div className="smallCardBody">
                            <span className="textSize">
                              {vehicleDetails?.pay_off_amt ? 
                               <CurrencyFormat
                               value={
                                 vehicleDetails?.pay_off_amt
                               }
                               displayType={"text"}
                               thousandSeparator={true}
                               prefix={"$"}
                               suffix=".00"
                             /> : 
                             "$0.0"
                            }
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={4} className="ConditionCardMargin">
                      <Card className="ConditionCard">
                        <CardContent>
                          <div className="smallCardTitle1">
                            Residual + Remaining
                          </div>
                          <div className="smallCardBody">
                            <span className="textSize">
                              <CurrencyFormat
                                value={
                                  vehicleDetails?.residual_amt +
                                  vehicleDetails?.remaining_pmts
                                }
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$"}
                              />
                              .00
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                  <Grid container spacing={3}>
                    <Card className="vehicleSectionCR">
                      <Typography variant="h6" className="vehicleDetailsMargin">
                        Vehicle Details
                      </Typography>
                      <hr />
                      <CardContent>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> VIN </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">{vin}</span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Consignor </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize">
                              {condionVehicleDetails?.consignor}
                            </span>
                          </ListItemSecondaryAction>
                        </List>

                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold">
                                {" "}
                                Grounding Mileage{" "}
                              </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize"></span>
                          </ListItemSecondaryAction>
                        </List>
                        <List className="paddingCSS">
                          <ListItemText>
                            <span className="textStyle">
                              <span className="textBold"> Account Type </span>
                            </span>
                          </ListItemText>
                          <ListItemSecondaryAction>
                            <span className="textSize"></span>
                          </ListItemSecondaryAction>
                        </List>
                      </CardContent>

                      <CardContent>
                        <Typography variant="h6">Accessories</Typography>
                        <hr />

                        <span class="Pending-Inspection-R">
                          Pending Inspection Report
                        </span>
                      </CardContent>
                      <CardContent>
                        <Typography variant="h6">Build Data</Typography>
                        <hr />
                        <TableContainer component={Paper}>
                          <Table
                            className="table"
                            size="small"
                            aria-label="a dense table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>Code</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">
                                  Package Details
                                </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {OEMBuildDetailsData.map((list, index) => {
                                return (
                                  <TableRow key={index}>
                                    <TableCell component="th" scope="row">
                                      {list.accessory_code}
                                    </TableCell>
                                    <TableCell align="left">
                                      {list.description}
                                    </TableCell>
                                    <TableCell align="left"> </TableCell>
                                  </TableRow>
                                );
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </CardContent>
                      <CardContent>
                        <Typography variant="h6">Wheels and Tyres</Typography>
                        <hr />
                        <span class="Pending-Inspection-R">
                          Pending Inspection Report
                        </span>
                      </CardContent>

                      <div className="disclaimerVRS">
                        Disclaimer: The parts, equipment, accessories, and other
                        information listed above are based on
                        equipment/configuration at the time vehicle was sold by
                        Mazda Motor Corporation to a dealer and does not mean
                        that this vehicle is still so equipped.
                      </div>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
          )}
          <ViewDetailedReport
            DamageDetails={DamageDetails}
            open={open}
            close={handleClose}
          />
        </div>
        {/* {<div className="purchasesidebar">
          {purchaseSection ? (
            <UpdateMileagePricing
              onPurchaseVehical={() => {
                setOpenTransactionPopup(true);
              }}
              vin={vin}
            />
          ) : (
            ""
          )}
        </div>} */}
      </div>

      <Box>
        <TransactionModal
          type={"success"}
          open={openTransactionPopup}
          onClose={() => {
            setOpenTransactionPopup(false);
          }}
        ></TransactionModal>
      </Box>
    </>
  );
}
