import ImageGallery from "react-image-gallery";
import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { getCarXml, getImageData } from "../service/api";
import Loaderpage from "./LoaderPage";
import { Box } from "@material-ui/core";
// const parseString = require("xml2js").parseString;
// const images = [
//   {
//     original: "car.jpg",
//     thumbnail: "car.jpg",
//   },
//   {
//     original: "car1.jpg",
//     thumbnail: "car1.jpg",
//   },
//   {
//     original: "car2.jpg",
//     thumbnail: "car2.jpg",
//   },
//   {
//     original: "car1.jpg",
//     thumbnail: "car1.jpg",
//   },
//   {
//     original: "car2.jpg",
//     thumbnail: "car2.jpg",
//   },
//   {
//     original: "car.jpg",
//     thumbnail: "car.jpg",
//   },
//   {
//     original: "car1.jpg",
//     thumbnail: "car1.jpg",
//   },
//   {
//     original: "car2.jpg",
//     thumbnail: "car2.jpg",
//   },
// ];

export default function MyGallery(props) {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    console.log("inspection_id", props)
    getImages();
  }, []);
  const getImages = async () => {
    // let getXmlImages = await getCarXml();
    // parseString(getXmlImages.data, (err, body) => {
    //   console.log("get Xml Images::", body["ns0:sendVehicle"]["ns0:vehicles"]);
    //   let imageArray = body["ns0:sendVehicle"]["ns0:vehicles"];
    //   let imgagesdata = [];
    //   for (let img of imageArray) {
    //     let imgobj = {
    //       original: "data:image/jpeg;base64," + img["ns0:image"][0],
    //       thumbnail: "data:image/jpeg;base64," + img["ns0:image"][0],
    //     };
    //     imgagesdata.push(imgobj);
    //   }

    //   console.log("imgagesdata", imgagesdata);
    //   setImages(imgagesdata);
    // });

    let reqObj = {
      inspectionId: props.inspection_id,
      paramForImage: "ALL",
      tenantId: localStorage.getItem("KintoID")? localStorage.getItem("KintoID") : "t002",
    };
    let getimagesRes = await getImageData(reqObj);

    console.log("get image data::", getimagesRes);

    setImages(getimagesRes.data.imageDetails);
    let imgagesdata = [];
    for (let img of getimagesRes.data.imageDetails) {
      let imgobj = {
        original: "data:image/jpeg;base64," + img.binImageArray,
        thumbnail: "data:image/jpeg;base64," + img.binImageArray,
        damageDescription: img.damageDescription,
      };
      imgagesdata.push(imgobj);
    }

    console.log("imgagesdata", imgagesdata);
    setImages(imgagesdata);
    setLoader(false);

    props.getDamageDesc &&
      props.getDamageDesc(imgagesdata[0].damageDescription);
  };

  const onSlideGetIndex = (index) => {
    console.log("index", index);

    props.getDamageDesc && props.getDamageDesc(images[index].damageDescription);
  };

  return (
    <div>
      {images.length != 0 ? (
        <ImageGallery
          {...props}
          items={images}
          showFullscreenButton={false}
          showPlayButton={false}
          onSlide={onSlideGetIndex}
        />
      ) : (
        <div>
          {loader ? (
            <Box
              height={"350px"}
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
            ""
          )}
        </div>
      )}
    </div>
  );
}
