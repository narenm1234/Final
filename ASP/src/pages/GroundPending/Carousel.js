import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import MobileStepper from "@material-ui/core/MobileStepper";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";

import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@material-ui/core";

import { getImageData } from "../../service/api";
// import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const tutorialSteps = [
  {
    imgPath: "maz.png",
  },
  {
    imgPath: "car.png",
  },
  {
    imgPath: "maz.png",
  },
  {
    imgPath: "maz.png",
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 400,
    flexGrow: 1,
    // border: "solid 1px #dddbda",
    margin: "20px",
    borderRadius: "4px",
    // boxShadow: "0 2px 2px 0 rgba(0, 0, 0, 0.1)",
  },
  header: {
    display: "flex",
    alignItems: "center",
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    height: 255,
    display: "block",
    maxWidth: 400,
    overflow: "hidden",
    width: "80%",
  },
  card: {
    boxShadow: "unset !important",
    // border: "1px solid gray",
  },
  Carousel: {
    width: "80%",
  },
}));

const Item = ({ image_bin_value }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  return (
    <Paper className={classes.card}>
      <img
        className="img"
        src={"data:image/jpeg;base64," + image_bin_value}
        alt={image_bin_value}
      />
    </Paper>
  );
};

function SwipeableTextMobileStepper(props) {
  const classes = useStyles();
  const theme = useTheme();
  const maxSteps = tutorialSteps.length;

  useEffect(() => {
    console.log(" props.images", props.images);
  }, []);

  //   const handleNext = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
  //   };

  //   const handleBack = () => {
  //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
  //   };

  //   const handleStepChange = (step) => {
  //     setActiveStep(step);
  //   };

  return (
    <div className={classes.root}>
      <Carousel
        className={classes.Carousel}
        navButtonsAlwaysVisible={true}
        autoPlay={false}
        navButtonsProps={{
          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
          style: {
            backgroundColor: "white",
            color: "gray",
          },
        }}
        indicators={{style:{fontSize:"11px"}}}
        indicatorIconButtonProps={{
          style: {
            padding: "5px", // 1
            border: "1px solid #ccc",
            margin: "0px 3px",
            color:"white", 
            width: "12px",
            height: "12px"
          },
        }}
        activeIndicatorIconButtonProps={{
          style: {
            color: "#1589ee",
            background:"#1589ee"
          },
        }}
        
      >
        {props.images &&
          props.images.map((item, i) => <Item key={i} {...item} />)}
      </Carousel>

      {/* <img className="img" src={tutorialSteps[0].imgPath} alt={tutorialSteps[0].imgPath} /> */}

      {/* <img className="img" src={tutorialSteps[activeStep].imgPath} alt={tutorialSteps[activeStep].label} />
            <MobileStepper
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                    <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>

                        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}

                    </Button>
                }
            /> */}
    </div>
  );
}

export default SwipeableTextMobileStepper;
