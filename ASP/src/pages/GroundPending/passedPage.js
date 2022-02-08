import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import SwipeableTextMobileStepper from "./Carousel";
import moment from "moment";
import {
  getPassedList,
  getImageData,
  getTransportationDetails,
} from "../../service/api";
import CurrencyFormat from "react-currency-format";
import VerticalVehicleStepper from "../../components/Stepper/VerticalStepper";
import Loaderpage from "../LoaderPage";
import { Box } from "@material-ui/core";
import Pagination from "../../components/PaginationPassedPage";
let resp = [
  {
    account_type: "LEASE",
    pay_off_amt: 12000,
    residual_amt: 11000,
    remaining_pmts: 250,
    model_year: 19,
    brand: "MAZDA",
    model: "SD",
    ext_color: "Color",
    grounding_date: "2021-05-11T00:00:00",
    odometer_reading: "9000",
    vin: "JM3KFBDM0K1698372",
  },
  {
    account_type: "LEASE",
    pay_off_amt: 12500,
    residual_amt: 9000,
    remaining_pmts: 300,
    model_year: 2018,
    brand: "MAZDA",
    model: "MAZDA3",
    ext_color: "Black",
    grounding_date: "2021-05-11T00:00:00",
    odometer_reading: "12000",
    vin: "JM3KFADM3K1586305",
  },
  {
    account_type: "LEASE",
    pay_off_amt: 14000,
    residual_amt: 11000,
    remaining_pmts: 400,
    model_year: 2018,
    brand: "MAZDA",
    model: "MAZDA3",
    ext_color: "Blue",
    grounding_date: "2021-05-07T00:00:00",
    odometer_reading: "8000",
    vin: "3MZBPBCM4LM125760",
  },
  {
    account_type: "LEASE",
    pay_off_amt: 15000,
    residual_amt: 14000,
    remaining_pmts: 500,
    model_year: 2018,
    brand: "MAZDA",
    model: "MAZDA3",
    ext_color: "Blue",
    grounding_date: "2021-05-08T00:00:00",
    odometer_reading: "6000",
    vin: "JM3KFABM2L0748452",
  },
];
export default function ListingPage1(props) {
  const [vehicleResponse, setVehicleResponse] = useState([]);
  //const [vehicleResponse, setVehicleResponse] = useState(resp)
  const [value, setValue] = useState([]);
  // const [images, setImages] = React.useState([]);
  const [transport, setTransport] = useState({});
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    getVehicleDetails(1);
    // getImages();
  }, [value]);
  async function getVehicleDetails(index) {
    console.log("start passed page",new Date());
    let apiResponse = await getPassedList(index);
    getTransportDetails(apiResponse?.data.data);
  }

  async function getTransportDetails(data) {
    if (data.length !== 0) {
      let vinlistqueryparams = "";
      data.forEach((item, index) => {
        if (data.length - 1 === index) {
          vinlistqueryparams = vinlistqueryparams + "vinList=" + item.vin;
        } else {
          vinlistqueryparams = vinlistqueryparams + "vinList=" + item.vin + "&";
        }
      });

      // console.log("vinlistqueryparams", vinlistqueryparams);

      let apiResponse = await getTransportationDetails(vinlistqueryparams);
      setTransport(apiResponse.data);
      setVehicleResponse(data);

      setLoader(false);
     console.log("end passed page",new Date());
      
    }
  }

  const openConditionScreen = (VINumber, vehicle) => {
    props.history.push("/conditionreport", {
      vin: VINumber,
      //purchaseSection: true,
      vehicleDetails: vehicle,
    });
  };
  const onChangePage = (data, index) => {
    console.log("data", data);
    getVehicleDetails(index);
    // setVehicleResponse(data);
  };

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
  //   setImages(getimagesRes?.data?.imageDetails);
  // };

  return <>
  {vehicleResponse.length > 0 ? (
    <div>
   { vehicleResponse.map((vehicle, index) => {
      return (
        <div className="listingPageCard" key={index}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              {vehicle.inspection_mileage > 0 ? (
                <SwipeableTextMobileStepper vehical={vehicle} images={vehicle.groundingImage} />
              ) : (
                <div className="pendingImgBlock">
                <img
                  className="pendingImg"
                  src="inspection_pending.png"
                  alt="pending"
                />
                </div>
              )}
            </Grid>
            <Grid item xs={4}>
              <div className="Year-Make-Model-Col-details">
                <div className="vehicleMakeModel">
                  <span>
                  {vehicle.model_year} {vehicle.brand} {vehicle.model} {vehicle.ext_color}{" "}
                
                  </span>
                </div>
                <List>
                  {/* <span className="textStyle">
                                           <span className="textBold"> Exclusivity Period</span>: <span className="textStyleWarning">00:00 Remaining</span>
                                        </span>
                                        <span className="progressStyle">
                                            <LinearProgress variant="determinate" value={50} color="secondary" />
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
                      suffix={"  MI"}
                    />
                  </span>
                  <span className="textStyle">
                    <span className="textBold"> Inspection Mileage:</span>{" "}
                    {vehicle.inspection_mileage ? 
                     <CurrencyFormat
                     value={vehicle.inspection_mileage}
                     displayType={"text"}
                     thousandSeparator={true}
                     suffix={"  MI"}
                   />
                    : "Pending"}
                  </span>
                  <span className="textStyle">
                    <span className="textBold"> Account Type: </span>{" "}
                    {vehicle.account_type}
                  </span>
                </List>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="VehicleStepper">
                <VerticalVehicleStepper
                  vin={vehicle.vin}
                  transportData={transport}
                />
              </div>
            </Grid>
          </Grid>
        </div>
      );
    })
  }
        
  {vehicleResponse.length != 0 ? (
    <Pagination
      showItemsPerPage={20}
      // pages={[20, 40, 60, 80]}
      data={vehicleResponse}
      onChangePage={onChangePage}
    />
  ) : null}
  </div>
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
  </>
}
