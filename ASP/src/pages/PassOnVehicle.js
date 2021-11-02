import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import { postDealerActionPassOnVehicle } from "../service/api";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function PassOnVehicle(props) {
  const [open, setOpen] = React.useState(false);
  const [noCall, setnoCall] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    props.close();
  };

  const handleProceed = () => {
    setOpen(false);
    // setnoCall(true);
    getPassOnDetails();
    props.close();
  };

  // useEffect(() => {
  //     getPassOnDetails();
  // }, [noCall]);

  async function getPassOnDetails() {
    let apiResponse = await postDealerActionPassOnVehicle(props.vin,props.groundingId);
    
    props.reload();
  }
  return (
    <div>
      <Dialog
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
        open={props.open}
      >
        <DialogTitle
          className="viewReportHeader"
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Pass On vehicle
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Grid container>
            <Grid xs={12}>
              <div className="viewReportCenter">You have passed on Vehicle</div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className="reportFooter">
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            autoFocus
            onClick={handleProceed}
            className="closePassBtn"
            color="secondary"
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
