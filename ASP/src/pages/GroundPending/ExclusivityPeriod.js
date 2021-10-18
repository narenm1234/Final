import React, { useState, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import moment from "moment";
// import {
//   getGroundingList,
//   getAuthTokenSSO,
//   getAccessTokenEndpoint,
//   getUserInfo,
//   getImageData,
//   // getCarXml,
// } from "../../service/api";

export default function ExclusivityPeriod(props) {
  const [time, setTime] = React.useState("00:00");
  const [progress, setProgress] = React.useState(20);

  useEffect(() => {}, []);

  //   async function getVehicleDetails() {
  //     let apiResponse = await getGroundingList();
  //     setVehicleResponse(apiResponse.data.data);
  //     console.log("------->", apiResponse.data);
  //   }

  return (
    <>
      <span className="textStyle">
        <span className="textBold"> Exclusivity Period</span>:{" "}
        <span className="textStyleWarning">{time} Remaining</span>
      </span>
      <span className="progressStyle">
        <LinearProgress
          variant="determinate"
          value={progress}
          color="secondary"
        />
      </span>
    </>
  );
}
