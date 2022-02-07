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
  getOktaUserInfo,
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
import ExclusivityPeriod from "./ExclusivityPeriod";
import Loaderpage from "../LoaderPage";
import { Box } from "@material-ui/core";
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
  
  const [vehicleResponse, setVehicleResponse] = useState([]);
  const [allVehicleResponse, setAllVehicleResponse] = useState([]);
  const [SSOAuth, setSSOAuth] = useState();
  const [value, setValue] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [time, setTime] = React.useState("00:00");
  const [passVin, setPassVin] = React.useState("");
  const [dealerName, setDealerName] = React.useState("");
  const [groundingID, setGroundingID] = React.useState("");
  // const [images, setImages] = React.useState([]);
  const [loader, setLoader] = React.useState(true);


  useEffect(() => {
    // setTimeout(() => {
      getVehicleDetails();
    // }, 3000);
    
    // getImages();
  },[value]);

  async function getVehicleDetails() {
    console.log("start grounding list api",new Date())
    let apiResponse = await getGroundingList();
    console.log("end grounding list api" , new Date())
    console.log("------->", apiResponse.data);
    setVehicleResponse(apiResponse.data.data);
    setAllVehicleResponse(apiResponse.data.data);
    console.log("------->", apiResponse.data);
    setLoader(false);
  }
  // var refresh2 = window.localStorage.getItem('refresh2');
  // if (refresh2===null){
  //     window.location.reload();
  //     window.localStorage.setItem('refresh2', "1");
  // }


  useEffect(() => {
    console.log("==>", props.selectedDealersData);
    if (props.selectedDealersData && props.selectedDealersData.length != 0) {
      let filterbydealer = [];
      props.selectedDealersData.forEach((dealer) => {
        allVehicleResponse.forEach((vehical) => {
          if (dealer.dealer_number === vehical.dealer_number) {
            filterbydealer.push(vehical);
          }
        });
      });
      setVehicleResponse(filterbydealer);
    } else {
      setVehicleResponse(allVehicleResponse);
    }
  }, [props.selectedDealersData]);

 

  // const getImages = async () => {
  //   let reqObj = {
  //     inspectionId: 18734078,
  //     paramForImage: "Inspection_Front_Page",
  //     tenantId: "t002",
  //   };
  //   let getimagesRes = await getImageData(reqObj);
  //   console.log("get image data::", getimagesRes);

  //   getimagesRes &&
  //     getimagesRes.data &&
  //     getimagesRes.data.imageDetails.map((item) => {
  //       item.binImageArray = "data:image/jpeg;base64," + item.binImageArray;
  //     });
  //   setImages(getimagesRes?.data.imageDetails);
  // };

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
      purchaseSection: true,
      vehicleDetails: vehicle,
    });
  };
  
  const handleOpen = (vin, groundingId, dealer_name) => {
    setPassVin(vin);
    setGroundingID(groundingId);
    setDealerName(dealer_name);
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
  

  // const getEstimagetTimeRemaining = (grounding_date) => {
  //   setInterval(() => {
  //     let time = moment(grounding_date).unix();
  //     let end = moment.duration(1, "d");
  //     var duration = moment.duration(end.diff(time));
  //     let hours = time.add(end).asHours();

  //     let timeremaining = moment.unix(hours).format("hh:mm");
  //     setTime(timeremaining);
  //   }, 600);
  // };
 


  return (
    <>
      {vehicleResponse?.length > 0 ? (
        vehicleResponse.map((vehicle, index) => {
          return (
            <div className="listingPageCard" key={index}>
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  {vehicle.inspection_status === "Inspection Complete" ? (
                    <SwipeableTextMobileStepper
                      // vehical={vehicle}
                      images={vehicle.groundingImage}
                    />
                  ) : (
                    <div className="pendingImgBlock">
                      <img
                        className="pendingImg"
                        src="inspection_pending.png"
                        alt="pending"
                      />
                    </div>
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
                        {vehicle.model_year} {vehicle.brand} {vehicle.model}{" "}
                        {vehicle.ext_color}{" "}
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
                      </span>  */}

                      {vehicle.vehicle_price ? (
                        <ExclusivityPeriod vehicle={vehicle} />
                      ) : (
                        ""
                      )}

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
                          suffix={" MI"}
                        />
                      </span>
                      <span className="textStyle">
                        <span className="textBold"> Inspection Mileage:</span>{" "}
                        {vehicle.inspection_status === "Inspection Complete" ? (
                          <CurrencyFormat
                            value={vehicle.inspection_mileage}
                            displayType={"text"}
                            thousandSeparator={true}
                            suffix={" MI"}
                          />
                        ) : (
                          "Pending"
                        )}
                      </span>
                      <span className="textStyle">
                        <span className="textBold"> Account Type: </span>{" "}
                        {vehicle.account_type}
                      </span>
                    </List>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <div className="grounding-Vehicle-Price-Option">
                    <div className="vehicleMakeModel1">
                      <span>Vehicle Price Options </span>
                    </div>
                    <div className="vehicalPriceOptions">
                      <div className="vehiclepriceopt">
                        <span className="textStyle">
                          <span className="textBold"> Payoff </span>
                        </span>
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
                      </div>
                      <div className="vehiclepriceopt">
                        <span className="textStyle">
                          <span className="textBold">
                            {" "}
                            Residual + Remaining Payments{" "}
                          </span>
                        </span>
                        <span className="textSize">
                          <CurrencyFormat
                            value={parseFloat(
                              vehicle.residual_amt + vehicle.remaining_pmts
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </span>
                      </div>
                      <div className="vehiclepriceopt">
                        <span className="textStyle">
                          <span className="textBold"> Market </span>
                        </span>
                        <span className="textSize">
                          {vehicle.vehicle_price ? (
                            <CurrencyFormat
                              value={parseFloat(vehicle.vehicle_price).toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          ) : (
                            "Pending"
                          )}
                        </span>
                      </div>
                      <div className="vehiclepriceopt">
                        <span className="textStyle">
                          <span className="textBold">
                            {" "}
                            Market + Remaining Payments 1 {" "}
                          </span>
                        </span>
                        <span className="textSize">
                          {vehicle.vehicle_price?(<CurrencyFormat
                            value={parseFloat(
                              vehicle.vehicle_price + vehicle.remaining_pmts
                            ).toFixed(2)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />):("Pending")}
                        </span>
                      </div>
                    </div>

                    <div className="NavigatorButtons">
                      <Button
                        className="PassonVehicleStyle"
                        onClick={handleOpen.bind(
                          this,
                          vehicle.vin,
                          vehicle.groundingId,
                          vehicle.dealer_name
                        )}
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
        <div>
          {loader ? (
            <Box
              height={"90vh"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <div>
                <Loaderpage />
                <span className="loaderText">Loading...</span>
              </div>
            </Box>
          ) : (
            <div className="listingPageCardNoData">
              <img src="noDataFound.jpeg" className="nodataImage" />
              <span className="nodataText">No Vehicles found</span>
            </div>
          )}
        </div>
      )}
      <PassOnVehicle
        open={open}
        close={handleClose}
        vin={passVin}
        dealerName={dealerName}
        groundingId={groundingID}
        reload={() => {
          getVehicleDetails();
          props.fireEvents();
        }}
      />
    </>
  );
}
