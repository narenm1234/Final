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
    console.log("start condition report page get images in my gallery",new Date());

    getImages();
  }, []);

  const getImages = async () => {
    let reqObj = {
      inspectionId: props.inspection_id,
      paramForImage: "ALL",
      tenantId: localStorage.getItem("tenantId")? localStorage.getItem("tenantId") : "t002",
    };
    let getimagesRes = await getImageData(reqObj);

    console.log("get image data::", getimagesRes);

    setImages(getimagesRes?.data?.imageDetails);
    let imagesdata = [];
    for (let img of getimagesRes?.data?.imageDetails) {
      let imgobj = {
        original: "data:image/jpeg;base64," + img.binImageArray,
        thumbnail: "data:image/jpeg;base64," + img.binImageArray,
        damageDescription: img.damageDescription,
      };
      imagesdata.push(imgobj);
    }

    // imagesdata = [
    //   {
    //     original: "data:image/jpeg;base64," + binImageArray,
    //     thumbnail: "data:image/jpeg;base64," + binImageArray,
    //     damageDescription: img.damageDescription,
    //   },
    //   {
    //     original: "data:image/jpeg;base64," + img.binImageArray,
    //     thumbnail: "data:image/jpeg;base64," + img.binImageArray,
    //     damageDescription: img.damageDescription,
    //   }
    // ]

    console.log("imagesdata==>", imagesdata);
    setImages(imagesdata);
    setLoader(false);

    props.getDamageDesc &&
      props.getDamageDesc(imagesdata[0].damageDescription);

    console.log("end condition report page get images in my gallery",new Date());

  };

  const onSlideGetIndex = (index) => {
    console.log("index", index);

    props.getDamageDesc && props.getDamageDesc(images[index].damageDescription);
  };

  return (
    <div>
      {images && images.length != 0 ? (
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
