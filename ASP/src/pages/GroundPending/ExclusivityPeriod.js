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
  const [duration, setDuration] = React.useState(null);
  const [time, setTime] = React.useState(null);

  useEffect(() => {
    if (moment(endtime).isAfter(moment(Date.now()))) {
      setInterval(() => {
        let TotalDuration = moment.duration(
          moment(props.vehicle.end_date).diff(moment(props.vehicle.start_date))
        );
        let CompletedDuration = moment.duration(
          moment(Date.now()).diff(moment(props.vehicle.start_date))
        );

        if (
          parseInt(TotalDuration.asMilliseconds()) &&
          parseInt(CompletedDuration.asMilliseconds())
        ) {
          const completedPercentage =
            (parseInt(CompletedDuration.asMilliseconds()) * 100) /
            parseInt(TotalDuration.asMilliseconds());

          setProgress(parseInt(completedPercentage));
        }
      }, 5000);

      setInterval(() => {
        setTime(
          <Moment
            date={endtime}
            format="hh:mm:ss"
            trim
            // durationFromNow={true}
            duration={Date.now()}
            interval={1000}
            utc
          />
        );
      }, 1000);
    }
  }, [endtime]);

  return (
    <>
      <span className="textStyle">
        <span className="textBold">
          Exclusivity Period  &nbsp;
          {/* {props.vehicle.groundingId} */}
        </span>
        :  &nbsp;
        <span className="textStyleWarning">
          {moment(endtime).isAfter(moment(Date.now())) ? (
            <span>
              {time}
              <span> Remaining </span>
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
