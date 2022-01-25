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
  const [imagesTemp, setImagesTemp] = useState([]);
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    console.log("inspection_id", props);
    console.log(
      "start condition report page get images in my gallery",
      new Date()
    );
    getImages();
  }, []);


  const getImages = async () => {
    let reqObj = {
      inspectionId: props.inspection_id,
      paramForImage: "ALL",
      tenantId: localStorage.getItem("tenantId")
        ? localStorage.getItem("tenantId")
        : "t002",
    };
    let getimagesRes = await getImageData(reqObj);
     console.log("get image data::", getimagesRes);

    if (getimagesRes && getimagesRes.data && getimagesRes.data.imageDetails) {
      setImagesTemp(getimagesRes?.data?.imageDetails);
      // const singleImage = getImage(getimagesRes?.data?.imageDetails[0]);
      // singleImage.then(res=>{
      //   arrangeImages( getimagesRes?.data?.imageDetails, 0, res.binImageArray );
      // })

      arrangeImages( getimagesRes?.data?.imageDetails, 0, null);
      setLoader(false);
      console.log(
        "end condition report page get images in my gallery",
        new Date()
      );
    }

  };

  const getImage = async (item) => {
    let reqObj = {
      fileName: item.fileName,
      inspectionId: props.inspection_id,
      paramForImage: "ALL",
      tenantId: localStorage.getItem("tenantId")
        ? localStorage.getItem("tenantId")
        : "t002",
    };
    let getimagesRes = await getImageData(reqObj);
    if (getimagesRes && getimagesRes.data && getimagesRes.data.imageDetails) {
      const singleImage = getimagesRes.data.imageDetails[0];
      return singleImage;
    }
    return null;
  };

  const arrangeImages = (images, index, imgurl) => {
    let imagesdata = [];
    for (let img of images) {
      let imgobj = {
        original: "data:image/jpeg;base64," + img.binImageArray,
        thumbnail: "data:image/jpeg;base64," + img.binImageArray,
        damageDescription: img.damageDescription,
      };
      imagesdata.push(imgobj);
    }
    if (imgurl) {
      imagesdata[index].original = "data:image/jpeg;base64," + imgurl;
    }
    setImages(imagesdata);

    props.getDamageDesc &&
      props.getDamageDesc(imagesdata[index].damageDescription);
  };

  const onSlideGetIndex = (index) => {
    // debugger;
    console.log("index", index, imagesTemp[index]);
    // const singleImage = getImage(imagesTemp[index]);
    // singleImage.then(res=>{
    //   arrangeImages( imagesTemp, index, res.binImageArray );
    // })
    props.getDamageDesc &&
    props.getDamageDesc(imagesTemp[index].damageDescription);
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
