import React, { useState, useEffect } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import * as moment from "moment";
import Moment from "react-moment";
// import {
//   getGroundingList,
//   getAuthTokenSSO,
//   getAccessTokenEndpoint,
//   getUserInfo,
//   getImageData,
//   // getCarXml,
// } from "../../service/api";

export default function ExclusivityPeriod(props) {
  // const [starttime, setStartTime] = React.useState(
  //   moment(props.vehicle.start_date).format()
  // );
  const [endtime, setEndTime] = React.useState(
    moment(props.vehicle.end_date).format()
  );
  const [progress, setProgress] = React.useState(0);

  useEffect(() => {
    if (moment(endtime).isAfter(moment(Date.now()))) {
      let TotalDuration = moment.duration(
        moment(props.vehicle.end_date).diff(moment(props.vehicle.start_date))
      );
      let CompletedDuration = moment.duration(
        moment(Date.now()).diff(moment(props.vehicle.start_date))
      );
      if (
        parseInt(TotalDuration.asSeconds()) &&
        parseInt(CompletedDuration.asSeconds())
      ) {
        const completedPercentage =
          (parseInt(CompletedDuration.asSeconds()) * 100) /
          parseInt(TotalDuration.asSeconds());
        setProgress(parseInt(completedPercentage));
      }
    }
  }, []);

  return (
    <>
      <span className="textStyle">
        <span className="textBold"> Exclusivity Period</span>:{" "}
        <span className="textStyleWarning">
          {moment(endtime).isAfter(moment(Date.now())) ? (
            <span>
              <Moment
                interval={1000}
                date={endtime}
                format="hh:mm:ss"
                trim
                durationFromNow
              />
              <span> &ngsp; Remaining </span>
            </span>
          ) : (
            "00:00"
          )}
        </span>
      </span>
      <span className="progressStyle">
        {progress ? (
          <LinearProgress
            variant="determinate"
            value={progress}
            color="secondary"
          />
        ) : (
          <LinearProgress variant="determinate" value={0} color="secondary" />
        )}
      </span>
    </>
  );
}
