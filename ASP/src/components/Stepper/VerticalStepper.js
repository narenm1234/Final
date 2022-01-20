import React,{useEffect} from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CheckCircle from '@material-ui/icons/CheckCircle';
import StepConnector from '@material-ui/core/StepConnector';
import Block from '@material-ui/icons/Block';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import {getTransportationDetails} from '../../service/api'
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    actionsContainer: {
        marginBottom: theme.spacing(2),
    },
    resetContainer: {
        padding: theme.spacing(3),
    },
}));
const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
  })(StepConnector);
  
  const useQontoStepIconStyles = makeStyles({
    root: {
      color: '#eaeaf0',
      display: 'flex',
      height: 22,
      alignItems: 'center',
    },
    active: {
      color: '#0091ff',
    },
    circle: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      backgroundColor: 'currentColor',
    },
    completed: {
      //color: '#0091ff',
      color: '#c23934',
      zIndex: 1,
      fontSize: 22,
    },
  });
  
  function QontoStepIcon(props) {
    const classes = useQontoStepIconStyles();
    const { active, completed } = props;
  
    return (
      <div
        className={clsx(classes.root, {
          [classes.active]: active,
        })}
      >
        {completed ? <Block className={classes.completed} />: <RadioButtonCheckedIcon />}
      </div>
    );
  }
  
  QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
  };
function getSteps() {
    return ['Transportation Ordered', 'Transportation Scheduled', 'Transportation Enroute', 'Vehicle Pick Up'];
}
let transportMetaData = ['Transportation Ordered', 'Transportation Scheduled', 'Transportation Enroute', 'Vehicle Pick Up'];
export default function VerticalVehicleStepper(props) {
    const classes = useStyles();
    // const [activeStep, setActiveStep] = React.useState(null);
    const [completed, setCompleted] = React.useState([]);

    const steps = getSteps();

    const [transportDetails, setTransportDetails] = React.useState(props.transportData);


    useEffect(() =>{
      setTransportInformation();
      
      console.log("startpassed verticle stepped",new Date());

    },[props.transportData]);

    const handleComplete = (completedSteps) => {
      let completedsteps = []
      for(let i =0; i<=completedSteps; i++ ){
        completedsteps.push(true)
      }
      setCompleted(completedsteps);
    };

    // const handleNext = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // };

    // const handleBack = () => {
    //     setActiveStep((prevActiveStep) => prevActiveStep - 1);
    // };

    const handleReset = () => {
        // setActiveStep(0);
      setCompleted([]);

    };

    const setTransportInformation = () => {
      transportDetails?.data.length > 0 && transportDetails?.data.map(row =>{
        if(row.vin == props.vin){
          transportMetaData.map((trp,index) =>{
             if(trp == row.derivedStatus){
               handleComplete(index)
             }
          })
        }
      });
      
      console.log("startpassed verticle stepped",new Date());

    };
    return (
        <div className={classes.root}>
            <Stepper  nonLinear orientation="vertical"  >
                {steps.map((label, index) => {                    
                    return (
                        <Step key={label} active={completed[index]}>
                            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                        </Step>
                    )
                }

                )}
            </Stepper>
            {completed.length === steps.length && (
                <Paper square elevation={0} className={classes.resetContainer}>
                    <Typography>All steps completed - you&apos;re finished</Typography>
                    <Button onClick={handleReset} className={classes.button}>
                        Reset
                    </Button>
                </Paper>
            )}
        </div>
    );
}