import ImageGallery from "react-image-gallery";
import React, { useEffect, useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { getCarXml, getImageData } from "../service/api";
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

  useEffect(() => {
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
      inspectionId: 18495852,
      paramForImage: "ALL",
      tenantId: "t002",
    };
    let getimagesRes = await getImageData(reqObj);

    console.log("get image data::", getimagesRes);

    setImages(getimagesRes.data.imageDetails);
      let imgagesdata = [];
      for (let img of getimagesRes.data.imageDetails) {
        let imgobj = {
          original: "data:image/jpeg;base64," + img.binImageArray,
          thumbnail: "data:image/jpeg;base64," + img.binImageArray,
        };
        imgagesdata.push(imgobj);
      }

      console.log("imgagesdata", imgagesdata);
      setImages(imgagesdata);
  };

  return (
    <ImageGallery
      {...props}
      items={images}
      showFullscreenButton={false}
      showPlayButton={false}
      slideOnThumbnailOver={true}
    />
  );
}
