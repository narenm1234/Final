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
  const [startIndex, setStartIndex] = useState(0);
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

    if (getimagesRes && getimagesRes.data ) {
      setImagesTemp(getimagesRes?.data);

      console.log("start get single image", new Date());
      const singleImage = getImage(getimagesRes?.data[0]);
      singleImage.then((res) => {
        arrangeImages(getimagesRes?.data, 0, res.image_bin_value);
        console.log("end get single image", new Date());
      });

      setLoader(false);
      console.log(
        "end condition report page get images in my gallery",
        new Date()
      );
    }
  };

  const getImage = async (item) => {
    let reqObj = {
      fileName: item?.file_name,
      inspectionId: props.inspection_id,
      paramForImage: "ALL",
      tenantId: localStorage.getItem("tenantId")
        ? localStorage.getItem("tenantId")
        : "t002",
    };
    let getimagesRes = await getImageData(reqObj);
    if (getimagesRes && getimagesRes.data && getimagesRes.data) {
      const singleImage = getimagesRes.data[0];
      return singleImage;
    }
    return null;
  };

  const arrangeImages = (images, index, imgurl) => {
    let imagesdata = [];
    for (let img of images) {
      let imgobj = {
        original: "data:image/jpeg;base64," + img.image_bin_value,
        thumbnail: "data:image/jpeg;base64," + img.image_bin_value,
        damageDescription: img.damage_description,
      };
      imagesdata.push(imgobj);
    }
    if (imgurl) {
      imagesdata[index].original = "data:image/jpeg;base64," + imgurl;
    }
    setStartIndex(index);
    setImages([...imagesdata]);
    props.getDamageDesc &&
      props.getDamageDesc(imagesdata[index].damageDescription);
  };

  const onSlideGetIndex = (index) => {
    console.log("start get single image", new Date());
    const singleImage = getImage(imagesTemp[index]);
    singleImage.then((res) => {
      arrangeImages(imagesTemp, index, res.image_bin_value);
      console.log("end get single image", new Date());
    });
    // props.getDamageDesc &&
    //   props.getDamageDesc(imagesTemp[index].damageDescription);
  };

  return (
    <div>
      {/* <ImageGallery
          {...props}
          items={images}
          showFullscreenButton={false}
          showPlayButton={false}
          onSlide={onSlideGetIndex}
        /> */}

      {images && images.length != 0 ? (
        <ImageGallery
          {...props}
          items={[...images]}
          startIndex={startIndex}
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
