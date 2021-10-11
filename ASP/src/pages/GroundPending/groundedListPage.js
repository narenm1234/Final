import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import LinearProgress from "@material-ui/core/LinearProgress";
import SwipeableTextMobileStepper from "./Carousel";
import moment from "moment";
import {
  getGroundingList,
  getAuthTokenSSO,
  getAccessTokenEndpoint,
  getUserInfo,
  getImageData,
  // getCarXml,
} from "../../service/api";
import CurrencyFormat from "react-currency-format";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import PassOnVehicle from "../PassOnVehicle";
// const parseString = require("xml2js").parseString;

let resp = [
  // {
  //   account_type: "LEASE",
  //   pay_off_amt: 12000,
  //   residual_amt: 11000,
  //   remaining_pmts: 250,
  //   model_year: 19,
  //   brand: "MAZDA",
  //   model: "SD",
  //   ext_color: "Color",
  //   grounding_date: "2021-08-13T00:00:00",
  //   odometer_reading: "9000",
  //   vin: "JM3KFBDM0K1698372",
  // },
  // {
  //   account_type: "LEASE",
  //   pay_off_amt: 12500,
  //   residual_amt: 9000,
  //   remaining_pmts: 300,
  //   model_year: 2018,
  //   brand: "MAZDA",
  //   model: "MAZDA3",
  //   ext_color: "Black",
  //   grounding_date: "2021-05-11T00:00:00",
  //   odometer_reading: "12000",
  //   vin: "JM3KFADM3K1586305",
  // },
  // {
  //   account_type: "LEASE",
  //   pay_off_amt: 14000,
  //   residual_amt: 11000,
  //   remaining_pmts: 400,
  //   model_year: 2018,
  //   brand: "MAZDA",
  //   model: "MAZDA3",
  //   ext_color: "Blue",
  //   grounding_date: "2021-05-07T00:00:00",
  //   odometer_reading: "8000",
  //   vin: "3MZBPBCM4LM125760",
  // },
  // {
  //   account_type: "LEASE",
  //   pay_off_amt: 15000,
  //   residual_amt: 14000,
  //   remaining_pmts: 500,
  //   model_year: 2018,
  //   brand: "MAZDA",
  //   model: "MAZDA3",
  //   ext_color: "Blue",
  //   grounding_date: "2021-05-08T00:00:00",
  //   odometer_reading: "6000",
  //   vin: "JM3KFABM2L0748452",
  // },
];
export default function ListingPage(props) {
  const [vehicleResponse, setVehicleResponse] = useState(resp);
  const [SSOAuth, setSSOAuth] = useState();
  const [value, setValue] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [time, setTime] = React.useState("00:00");
  const [passVin, setPassVin] = React.useState("");
  const [images, setImages] = React.useState([]);

  useEffect(() => {
    getVehicleDetails();
    getImages();
  }, [value]);

  const getVehicleDetails = async () => {
    let apiResponse = await getGroundingList("ALL");
    setVehicleResponse(apiResponse.data.data);
    //console.log('------->', apiResponse)
  };

  useEffect(() => {
    getAuthTokenSSO1();
  }, [value]);

  async function getAuthTokenSSO1() {
    let apiResponse = await getAuthTokenSSO();
    setSSOAuth(apiResponse.data.data);
    console.log("-------0------>", SSOAuth);
  }

  const getImages = async () => {
    let reqObj = {
      inspectionId: 18734078,
      paramForImage: "Inspection_Front_Page",
      tenantId: "t002",
    };
    let getimagesRes = await getImageData(reqObj);
    console.log("get image data::", getimagesRes);

    getimagesRes &&
      getimagesRes.data &&
      getimagesRes.data.imageDetails.map((item) => {
        item.binImageArray = "data:image/jpeg;base64," + item.binImageArray;
      });
    setImages(getimagesRes.data.imageDetails);
  };

  // const getImages = async () => {
  //   // let obj = {
  //   //     "inspectionId": 0,
  //   //     "paramForImage": "string",
  //   //     "tenantId": "string"
  //   //   }

  //     // let getimagesRes = getImageData(null);
  //     // console.log("get image data::", getimagesRes)

  //   // let getXmlImages = await getCarXml();
  //   // parseString(getXmlImages.data, (err, body) => {
  //   //   console.log("get Xml Images::", body);
  //   // });
  // };

  const openConditionReport = (VINumber, vehicle) => {
    props.history.push("/conditionreport", {
      vin: VINumber,
      purchaseSection: true,
      vehicleDetails: vehicle,
    });
  };
  const openConditionScreen = (VINumber, vehicle) => {
    props.history.push("/conditionreport", {
      vin: VINumber,
      vehicleDetails: vehicle,
    });
  };
  const handleOpen = (vin) => {
    setPassVin(vin);
    setOpen(!open);
  };
  const handleClose = () => {
    setOpen(!open);
  };
  React.useEffect(() => {
    // const timer = setInterval(() => {
    //     setProgress(oldProgress => {
    //         if (oldProgress === 100) {
    //             return 0;
    //         }
    //         return Math.min(oldProgress + 15, 100);
    //     });
    // }, 1000);
    const timer = setInterval(() => {
      var d1 = moment.duration();
      var d2 = d1.clone();
      var x = d1.add(24, "hours");

      let timeremaining = moment.unix(x).format("hh:mm");
      setTime(timeremaining);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  const getEstimagetTimeRemaining = (grounding_date) => {
    setInterval(() => {
      let time = moment(grounding_date).unix();
      let end = moment.duration(1, "d");
      var duration = moment.duration(end.diff(time));
      let hours = time.add(end).asHours();

      let timeremaining = moment.unix(hours).format("hh:mm");
      setTime(timeremaining);
    }, 600);
  };

  return (
    <>
      {vehicleResponse.length > 0 ? (
        vehicleResponse.map((vehicle, index) => {
          return (
            <div className="listingPageCard" key={index}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  {vehicle.inspection_mileage > 0 ? (
                    <SwipeableTextMobileStepper
                      vehical={vehicle}
                      images={images}
                    />
                  ) : (
                    <img
                      className="pendingImg"
                      src="inspection_pending.png"
                      alt="pending"
                    />
                  )}

                  {/* <img
                    className="pendingImg"
                    src="inspection_pending.png"
                    alt="pending"
                  /> */}
                </Grid>
                <Grid item xs={4}>
                  <div className="Year-Make-Model-Col">
                    <div className="vehicleMakeModel">
                      <span>
                        {vehicle.brand} {vehicle.model} {vehicle.ext_color}{" "}
                        {vehicle.model_year}
                      </span>
                    </div>
                    <List>
                      {/* <span className="textStyle">
                        <span className="textBold"> Exclusivity Period</span>:{" "}
                        <span className="textStyleWarning">
                          {time} Remaining
                        </span>
                      </span>
                      <span className="progressStyle">
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          color="secondary"
                        />
                      </span> */}

                      <span className="textStyle">
                        <span className="textBold"> VIN:</span>
                        <a
                          className="vin"
                          onClick={openConditionScreen.bind(
                            this,
                            vehicle.vin,
                            vehicle
                          )}
                        >
                          {" "}
                          {vehicle.vin}
                        </a>
                      </span>

                      <span className="textStyle">
                        <span className="textBold"> Grounding Date:</span>{" "}
                        {moment(vehicle.grounding_date).format("MM/DD/YYYY")}
                      </span>
                      <span className="textStyle">
                        <span className="textBold"> Grounding Mileage:</span>{" "}
                        <CurrencyFormat
                          value={vehicle.odometer_reading}
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={" miles"}
                        />
                      </span>
                      <span className="textStyle">
                        <span className="textBold"> Inspection Mileage:</span>{" "}
                        <CurrencyFormat
                          value={
                            vehicle.inspection_mileage
                              ? vehicle.inspection_mileage
                              : "Pending"
                          }
                          displayType={"text"}
                          thousandSeparator={true}
                          suffix={"miles"}
                        />
                      </span>
                      <span className="textStyle">
                        <span className="textBold"> Account Type: </span>{" "}
                        {vehicle.account_type}
                      </span>
                    </List>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="Vehicle-Price-Option">
                    <div className="vehicleMakeModel1">
                      <span>Vehicle Price Options </span>
                    </div>
                    <List>
                      <ListItem className="paddingCSS">
                        <ListItemText>
                          <span className="textStyle">
                            <span className="textBold"> Payoff </span>
                          </span>
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <span className="textSize">
                            <CurrencyFormat
                              value={
                                vehicle.pay_off_amt ? vehicle.pay_off_amt : ""
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </span>
                        </ListItemSecondaryAction>
                      </ListItem>

                      <ListItem className="paddingCSS">
                        <ListItemText>
                          <span className="textStyle">
                            <span className="textBold">
                              {" "}
                              Residual + Remaining Payments{" "}
                            </span>
                          </span>
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <span className="textSize">
                            <CurrencyFormat
                              value={
                                vehicle.residual_amt + vehicle.remaining_pmts
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </span>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem className="paddingCSS">
                        <ListItemText>
                          <span className="textStyle">
                            <span className="textBold"> Market </span>
                          </span>
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <span className="textSize">
                            <CurrencyFormat
                              value={
                                vehicle.vehicle_price
                                  ? vehicle.vehicle_price
                                  : "Pending"
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </span>
                        </ListItemSecondaryAction>
                      </ListItem>
                      <ListItem className="paddingCSS">
                        <ListItemText>
                          <span className="textStyle">
                            <span className="textBold">
                              {" "}
                              Market + Remaining Payments{" "}
                            </span>
                          </span>
                        </ListItemText>
                        <ListItemSecondaryAction>
                          <span className="textSize">
                            {/* <CurrencyFormat
                              value={
                                vehicle.remaining_pmts
                                  ? vehicle.remaining_pmts
                                  : ""
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            /> */}
                            Pending
                          </span>
                        </ListItemSecondaryAction>
                      </ListItem>
                    </List>
                    <div className="NavigatorButtons">
                      <Button
                        className="PassonVehicleStyle"
                        onClick={handleOpen.bind(this, vehicle.vin)}
                      >
                        Pass on vehicle
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        className="button"
                        onClick={openConditionReport.bind(
                          this,
                          vehicle.vin,
                          vehicle
                        )}
                      >
                        {"Purchase Vehicle"}
                      </Button>
                    </div>
                  </div>
                </Grid>
              </Grid>
            </div>
          );
        })
      ) : (
        <div className="listingPageCardNoData">
          <img src="noDataFound.jpeg" className="nodataImage" />
          <span className="nodataText">No Vehicles found</span>
        </div>
      )}
      <PassOnVehicle
        open={open}
        close={handleClose}
        vin={passVin}
        reload={() => {
          getVehicleDetails();
          props.fireEvents();
        }}
      />
    </>
  );
}
