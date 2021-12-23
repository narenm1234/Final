import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import LinearProgress from "@material-ui/core/LinearProgress";
import SwipeableTextMobileStepper from "./Carousel";
import moment from "moment";
import CurrencyFormat from "react-currency-format";
import {
  getAccessTokenEndpoint,
  getPurchasedList,
  getUserInfoToken,
  getImageData,
} from "../../service/api";
import Loaderpage from "../LoaderPage";
import { Box, useForkRef } from "@material-ui/core";

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
    groundingDetails: {
      vin: "JM3KFBDM0K1698372",
    },
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
    groundingDetails: {
      vin: "JM3KFADM3K1586305",
    },
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
    groundingDetails: {
      vin: "3MZBPBCM4LM125760",
    },
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
    groundingDetails: {
      vin: "JM3KFABM2L0748452",
    },
    vin: "JM3KFABM2L0748452",
  },
];

export default function ListingPage2(props) {
  const [vehicleResponse, setVehicleResponse] = useState([]);
  //const [vehicleResponse, setVehicleResponse] = useState(resp)
  const [value, setValue] = useState([]);
  // const [images, setImages] = React.useState([]);
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    getVehicleDetails();
    // getImages();
  }, [value]);
  async function getVehicleDetails() {
    let apiResponse = await getPurchasedList();
    setVehicleResponse(apiResponse?.data.data);
    console.log(vehicleResponse);
    // console.log(apiResponse?.data.data);
    setLoader(false);
  }

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
  //   setImages(getimagesRes.data.imageDetails);
  // };

  function getPurchasetype(list) {
    let price = "";
    if (list.length != 0) {
      list.forEach((x, index) => {
        if (x.price_category) {
          if (index == list.length - 1) {
            price = price += x.price_category;
          } else {
            price = price += x.price_category + " + ";
          }
        }
      });
    }
    return price;
  }
  function getTotprice(list) {
    let price = 0;
    if (list.length != 0) {
      list.forEach((x, index) => {
        if (x.sale_amount) {
          price = price += x.sale_amount;
        }
      });
    }
    return price;
  }

  const openConditionReport = (VINumber, vehicle) => {
    props.history.push("/conditionreport", {
      vin: VINumber,
      vehicleDetails: vehicle,
    });
  };

  return vehicleResponse?.length > 0 ? (
    vehicleResponse.map((vehicle, index) => {
      return (
        <div className="listingPageCard" key={index}>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              {/* <SwipeableTextMobileStepper /> */}
              {vehicle.groundingImage ? (
                <SwipeableTextMobileStepper
                  vehical={vehicle}
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
                                           <span className="textBold"> Exclusivity Period</span>: <span className="textStyleWarning">00:00 Remaining</span>
                                        </span>
                                        <span className="progressStyle">
                                            <LinearProgress variant="determinate" value={50} color="secondary" />
                                        </span> */}

                  <span className="textStyle">
                    <span className="textBold"> VIN:</span>
                    <a
                      className="vin"
                      onClick={() => openConditionReport(vehicle.vin, vehicle)}
                    >
                      {" "}
                      {vehicle.vin}
                    </a>
                  </span>

                  <span className="textStyle">
                    <span className="textBold"> Purchase Date:</span>{" "}
                    {moment(vehicle.purchase_date).format("MM/DD/YYYY")}
                  </span>
                  {/* <span className="textStyle">
                    <span className="textBold"> Grounding Mileage:</span>{" "}
                    <CurrencyFormat
                      value={vehicle.odometer_reading}
                      displayType={"text"}
                      thousandSeparator={true}
                    />{" "}
                    miles
                  </span>
                  <span className="textStyle">
                    <span className="textBold"> Inspection Mileage:</span>{" "}
                    Pending
                  </span> */}
                  <span className="textStyle">
                    <span className="textBold"> Purchase Type:</span>{" "}
                    {/* {vehicle.purchase_type ? vehicle.purchase_type : ""} */}
                    {getPurchasetype(vehicle.priceCategoryList)}
                  </span>
                </List>
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className="Vehicle-Price-Option">
                <div className="vehicleMakeModel">
                  <span>Vehicle Cost </span>
                </div>
                <List>
                  {vehicle.priceCategoryList && vehicle.priceCategoryList.map((priceitem, index)=>
                  <span className="textStyle priceOptions">
                  <span className="textBold"> {priceitem.price_category} {priceitem.price_type} </span>{" "}
                  <span className="">
                    <CurrencyFormat
                      value={
                        priceitem &&
                        parseFloat(
                          priceitem.sale_amount
                        ).toFixed(2)
                      }
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </span>
                </span>
                  )

                  }
                  
                  {/* <span className="textStyle">
                    <span className="textBold"> Rem.Payments</span>{" "}
                    <span className="margin__space5">
                      <CurrencyFormat
                        value={
                          vehicle.priceCategoryList[1] &&
                          parseFloat(
                            vehicle.priceCategoryList[1].sale_amount
                          ).toFixed(2)
                        }
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </span>
                  </span> */}
                  <span className="textStyle priceOptions">
                    <span className="textBold"> Admin Fee</span>{" "}
                    <span className="">
                      <CurrencyFormat
                        value={vehicle.admin_fee}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </span>
                  </span>
                  <div className="purchasedScreenTotal" />
                  <span className="textStyle priceOptions">
                    <span className="textStyleTotalFee"> Total Price</span>{" "}
                    <span className="totalFeeSum">
                      <CurrencyFormat
                        value={parseFloat(
                          getTotprice(vehicle.priceCategoryList)
                        ).toFixed(2)}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </span>
                  </span>
                </List>
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
  );
}
