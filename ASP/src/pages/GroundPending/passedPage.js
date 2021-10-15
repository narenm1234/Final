import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import SwipeableTextMobileStepper from "./Carousel";
import moment from "moment";
import { getPassedList, getImageData, getTransportationDetails } from "../../service/api";
import CurrencyFormat from "react-currency-format";
import VerticalVehicleStepper from "../../components/Stepper/VerticalStepper";
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
  const [images, setImages] = React.useState([]);
  const [transport, setTransport] = useState({});

  useEffect(() => {
    getVehicleDetails();
    getImages();
    getTransportDetails();
  }, [value]);
  async function getVehicleDetails() {
    let apiResponse = await getPassedList();
    setVehicleResponse(apiResponse?.data.data);
  }
  async function getTransportDetails() {
    let apiResponse = await getTransportationDetails();
    setTransport(apiResponse.data);
  }
  const openConditionScreen = (VINumber, vehicle) => {
    props.history.push("/conditionreport", {
      vin: VINumber,
      vehicleDetails: vehicle,
    });
  };

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

  return vehicleResponse?.length > 0 ? (
    vehicleResponse.map((vehicle, index) => {
      return (
        <div className="listingPageCard" key={index}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              {vehicle.inspection_mileage > 0 ? (
                <SwipeableTextMobileStepper vehical={vehicle} images={images} />
              ) : (
                <img
                  className="pendingImg"
                  src="inspection_pending.png"
                  alt="pending"
                />
              )}
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
                      suffix={"  miles"}
                    />
                  </span>
                  <span className="textStyle">
                    <span className="textBold"> Inspection Mileage:</span>{" "}
                    Pending
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
                <VerticalVehicleStepper vin={vehicle.vin} transportData={transport}/>
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
  );
}
