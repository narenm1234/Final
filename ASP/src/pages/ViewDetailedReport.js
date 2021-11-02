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
import List from "@material-ui/core/List";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MyGallery from "./ImageGallery";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import CurrencyFormat from "react-currency-format";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Tooltip from '@material-ui/core/Tooltip';
import InfoIcon from '@material-ui/icons/Info';
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
const BlueTooltip = withStyles({
    tooltip: {
        width: "185px",
        height: "68px",
        fontSize: "12px",
        lineHeight: 1.6,
        color: "#080707",
        borderRadius: "4px",
  boxShadow: "0 2px 3px 0 rgba(0, 0, 0, 0.16)",
  backgroundColor: "#fff",
    }
  })(Tooltip);
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

// let DamageDetails = {
//   damageDetails: [
//     {
//       inspection_id: 232211,
//       vin: "JM3KFADM6L0797974",
//       damage_location_detail: "Windshield",
//       partlabor_hours: 0,
//       total: "285.00",
//       paint_rate: 46,
//       chargeable_flag: "true",
//       paint_hours: 0,
//       part_cost: 200,
//       damage_type: "X",
//       damage_description:
//         'w/s glass mazda w/o wiper deicer w/o smart city br - 1X2.0" Cracked (Replace)',
//     },
//     {
//       inspection_id: 232211,
//       vin: "JM3KFADM6L0797974",
//       damage_location_detail: "Front Bumper",
//       partlabor_hours: 0,
//       total: "221.60",
//       paint_rate: 46,
//       chargeable_flag: "true",
//       paint_hours: 2,
//       part_cost: 0,
//       damage_type: "X",
//       damage_description:
//         'bmpr cvr w/parking sensors hiroshima plant - 1X8.0" Cracked (Repair)',
//     },
//     {
//       inspection_id: 232211,
//       vin: "JM3KFADM6L0797974",
//       damage_location_detail: "Right Fender",
//       partlabor_hours: 0,
//       total: "0.00",
//       paint_rate: 46,
//       chargeable_flag: "false",
//       paint_hours: 0,
//       part_cost: 0,
//       damage_type: "X",
//       damage_description: "Fndr pnl -  Previous repair (REPORT)",
//     },
//     {
//       inspection_id: 232211,
//       vin: "JM3KFADM6L0797974",
//       damage_location_detail: "Right Front Door",
//       partlabor_hours: 0,
//       total: "0.00",
//       paint_rate: 46,
//       chargeable_flag: "false",
//       paint_hours: 0,
//       part_cost: 0,
//       damage_type: "X",
//       damage_description: "Door shell -  SSR-Dirt in Paint (REPORT)",
//     },
//     {
//       inspection_id: 232211,
//       vin: "JM3KFADM6L0797974",
//       damage_location_detail: "Left 1/4 Panel",
//       partlabor_hours: 0,
//       total: "169.20",
//       paint_rate: 46,
//       chargeable_flag: "false",
//       paint_hours: 2,
//       part_cost: 0,
//       damage_type: "X",
//       damage_description:
//         'Otr 1/4 pnl - 1X3.0" Dented / dinged - paint broken (Repair)',
//     },
//     {
//       inspection_id: 232211,
//       vin: "JM3KFADM6L0797974",
//       damage_location_detail: "Left Rear Door",
//       partlabor_hours: 0,
//       total: "55.00",
//       paint_rate: 46,
//       chargeable_flag: "false",
//       paint_hours: 0,
//       part_cost: 55,
//       damage_type: "X",
//       damage_description:
//         'Door shell - 1X1.5" Dented / dinged - paint not broken (Repair)',
//     },
//     {
//       inspection_id: 232211,
//       vin: "JM3KFADM6L0797974",
//       damage_location_detail: "Front Left Tire",
//       partlabor_hours: 0,
//       total: "200.00",
//       paint_rate: 46,
//       chargeable_flag: "true",
//       paint_hours: 0,
//       part_cost: 200,
//       damage_type: "X",
//       damage_description: '19 Inch Tire - 1X3.0" Cut (Replace)',
//     },
//     {
//       inspection_id: 232211,
//       vin: "JM3KFADM6L0797974",
//       damage_location_detail: "Warning Light",
//       partlabor_hours: 0,
//       total: "34.00",
//       paint_rate: 46,
//       chargeable_flag: "false",
//       paint_hours: 0,
//       part_cost: 0,
//       damage_type: "M",
//       damage_description:
//         "Check engine warning light -  Stays on (FurtherDiagnosis)",
//     },
//     {
//       inspection_id: 232211,
//       vin: "JM3KFADM6L0797974",
//       damage_location_detail: "Rear Left Wheel/Cover",
//       partlabor_hours: 0,
//       total: "100.00",
//       paint_rate: 46,
//       chargeable_flag: "false",
//       paint_hours: 0,
//       part_cost: 100,
//       damage_type: "X",
//       damage_description:
//         'aly whl 19" type 1 dicastal brand - 1X2.0" Scratched (Repair)',
//     },
//   ],
//   interiorCost: 0,
//   exteriorCost: 1030.8,
//   mechanicalCost: 34,
//   excessiveWandT: 706.6,
//   normal: 358.2,
//   inspectionPaintRate: 50,
//   inspectionLaborRate: 60,
// };
export default function ViewDetailedReport(props) {
  const [open, setOpen] = React.useState(false);
  const [interior, setInterior] = React.useState([]);
  const [exterior, setExterior] = React.useState([]);
  const [mechanical, setMechanical] = React.useState([]);
  const [finalTotal, setFinalTotal] = React.useState([]);
  const [damagedesc, setDamagedesc] = React.useState("");

  let wheelTyrelistOfItem = ["LF", "RF"];
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    props.close();
  };

  const {DamageDetails}=props;
  const handleSeperation = () => {
    let interior = [];
    let exterior = [];
    let mechanical = [];
    let total = 0;
    if (DamageDetails?.damageDetails?.length > 0) {
      DamageDetails?.damageDetails?.map((row) => {
        if (row.damage_type == "X") {
          exterior.push(row);
        } else if (row.damage_type == "I") {
          interior.push(row);
        } else if (row.damage_type == "M") {
          mechanical.push(row);
        }
        total = total + (row.total ? parseFloat(row.total) : "$0");
      });
      console.log(exterior, "iiiiiiii");
      console.log(interior, "iiiiiiii");
      console.log(mechanical, "iiiiiiii");
      setExterior(exterior);
      setInterior(interior);
      setMechanical(mechanical);
      setFinalTotal(total);
    }
  };
  useEffect(() => {
    handleSeperation();
  }, [props.DamageDetails]);
  return (
    <div>
      <Dialog
        onClose={handleClose}
        maxWidth={"lg"}
        aria-labelledby="max-width-dialog-title"
        open={props.open}
      >
        <DialogTitle
          className="viewReportHeader"
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Damage Report
        </DialogTitle>
        <DialogContent>
          <Grid container>
            <Grid item xs={6} className="galleryView">
              <MyGallery getDamageDesc={(e) =>{ e? setDamagedesc(e) :setDamagedesc("") }} />
            </Grid>

            <Grid xs={6}>
              <div className="viewReportCenter">
                Estimated Damage Repair Totals
              </div>
              <div className="hrLine" />
              <Grid container className="experiorSpacing">
                <Grid item xs={12}>
                  <List>
                    <ListItem>
                      <ListItemText className="smallCardTitle">
                        <span className="textBold alignleft">Interior</span>
                      </ListItemText>
                      <ListItemSecondaryAction className="smallCardBody ">
                        {DamageDetails.interiorCost ? (
                          <CurrencyFormat
                            value={DamageDetails.interiorCost}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        ) : (
                          "$0.00"
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText className="smallCardTitle">
                        <span className="textBold alignleft">Exterior</span>
                      </ListItemText>
                      <ListItemSecondaryAction className="smallCardBody ">
                        {DamageDetails.exteriorCost ? (
                          <CurrencyFormat
                            value={DamageDetails.exteriorCost}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        ) : (
                          "$0.00"
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText className="smallCardTitle">
                        <span className="textBold alignleft">
                          Mechanical total
                        </span>
                      </ListItemText>
                      <ListItemSecondaryAction className="smallCardBody ">
                        {DamageDetails.maintainenceCost ? (
                          <CurrencyFormat
                            value={DamageDetails.maintainenceCost}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        ) : (
                          "$0.00"
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <ListItemText className="smallCardTitle">
                        <span className="textBold alignleft">Normal W&T</span>
                      </ListItemText>
                      <ListItemSecondaryAction className="smallCardBody ">
                        {DamageDetails.normal ? (
                          <CurrencyFormat
                            value={DamageDetails.normal}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        ) : (
                          "$0.00"
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                    <ListItemText className="smallCardTitle"><span className="textBold alignleft ">Excessive W&T<BlueTooltip title={`Excessive W&T charges are those that may be billed to the lessee on their lease end invoice`}>
                                                <div className="icontooltip"><IconButton color='#005fb2'>
                                                    <InfoIcon style={{width:"16px"}}color="#005fb2"/>
                                                </IconButton></div>
                                            </BlueTooltip></span></ListItemText>
                      <ListItemSecondaryAction className="smallCardBody ">
                        {DamageDetails.excessiveWandT ? (
                          <CurrencyFormat
                            value={DamageDetails.excessiveWandT}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        ) : (
                          "$0.00"
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <div className="LabelTextTextAreaDamage">
                    Damage Area Description
                  </div>
                  <TextareaAutosize
                    className="inputFieldTextAreaDamage"
                    aria-label="maximum height"
                    defaultValue={damagedesc}
                    value={damagedesc}
                    disabled
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} align="right">
            <div className="detailedReportRates">
              <span>
                Labor Rate :{" "}
                {DamageDetails.inspectionLaborRate
                  ? `$${DamageDetails.inspectionLaborRate} /hr`
                  : "$000.00/hr"}
              </span>
              <span>
                {" "}
                | Paint Rate:{" "}
                {DamageDetails.inspectionPaintRate
                  ? `$${DamageDetails.inspectionPaintRate} /hr`
                  : "$000.00/hr"}
              </span>
            </div>
          </Grid>
          <TableContainer component={Paper}>
            <Table className="table" size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Damaged Area</TableCell>
                  <TableCell align="left" className="textWidth">
                    Wear & Tear
                  </TableCell>
                  <TableCell align="left" className="textWidth">
                    Labor Hours
                  </TableCell>
                  <TableCell align="left" className="textWidth">
                    Paint Hours
                  </TableCell>
                  <TableCell align="right" className="textWidth">
                    Part Cost
                  </TableCell>
                  <TableCell align="right" className="textWidth">
                    Estimate
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    component="th"
                    scope="row"
                    className="textBold alignleft paddingTop"
                  >
                    Interior
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} component="th" scope="row">
                    <hr />
                  </TableCell>
                </TableRow>
                {/* <TableRow >
                                            <TableCell component="th" scope="row">
                                                {DamageDetails?.damageDetails?.length > 0 ? DamageDetails.damageDetails[0].damage_area : 'N/A'}
                                            </TableCell>
                                            <TableCell style={{ width: 90 }} align="right">{DamageDetails?.damageDetails?.length > 0 ?DamageDetails.damageDetails[0].damage_type : 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="right">{DamageDetails?.damageDetails?.length > 0 ? DamageDetails.damageDetails[0].partlabor_hours: 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="right">{DamageDetails?.damageDetails?.length > 0 ? DamageDetails.damageDetails[0].paint_hours? DamageDetails.damageDetails[0].paint_hours:0: 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="right">{DamageDetails?.damageDetails?.length > 0 ? DamageDetails.damageDetails[0].part_cost ? DamageDetails.damageDetails[0].part_cost : 0: 'N/A'}</TableCell>
                                            <TableCell astyle={{ width: 90 }} align="right">{DamageDetails?.damageDetails?.length > 0 ? DamageDetails.damageDetails[0].total ? DamageDetails.damageDetails[0].total : 0: 'N/A'}</TableCell>
                                </TableRow> */}
                {interior.map((inter) => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {DamageDetails?.damageDetails?.length > 0
                          ? `${inter.damage_location_detail} - ${inter.damage_description}`
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ width: 150 }} align="left">
                        {DamageDetails?.damageDetails?.length > 0
                          ? inter.chargeable_flag == "true"
                            ? "E"
                            : "N"
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ width: 150 }} align="left">
                        {DamageDetails?.damageDetails?.length > 0
                          ? inter.partlabor_hours
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ width: 150 }} align="left">
                        {DamageDetails?.damageDetails?.length > 0
                          ? inter.paint_hours
                            ? inter.paint_hours
                            : 0
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ width: 150 }} align="right">
                        {DamageDetails?.damageDetails?.length > 0 ? (
                          inter.part_cost ? (
                            <CurrencyFormat
                              value={inter.part_cost}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          ) : (
                            "$0.00"
                          )
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell astyle={{ width: 150 }} align="right">
                        {DamageDetails?.damageDetails?.length > 0 ? (
                          inter.total ? (
                            <CurrencyFormat
                              value={inter.total}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          ) : (
                            "$0.00"
                          )
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell
                    colSpan={6}
                    component="th"
                    scope="row"
                    className="textBold alignleft paddingTop"
                  >
                    Exterior
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} component="th" scope="row">
                    <hr />
                  </TableCell>
                </TableRow>
                {/* <TableRow >
                                            <TableCell component="th" scope="row">
                                                {DamageDetails?.damageDetails?.length > 0 ? DamageDetails.damageDetails[1].damage_area : 'N/A'}
                                            </TableCell>
                                            <TableCell style={{ width: 90 }} align="right">{DamageDetails?.damageDetails?.length > 0 ?DamageDetails.damageDetails[1].damage_type : 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="right">{DamageDetails?.damageDetails?.length > 0 ? DamageDetails.damageDetails[1].partlabor_hours: 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="right">{DamageDetails?.damageDetails?.length > 0 ? DamageDetails.damageDetails[1].paint_hours? DamageDetails.damageDetails[0].paint_hours:0: 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="right">{DamageDetails?.damageDetails?.length > 0 ? DamageDetails.damageDetails[1].part_cost ? DamageDetails.damageDetails[0].part_cost : 0: 'N/A'}</TableCell>
                                            <TableCell astyle={{ width: 90 }} align="right">{DamageDetails?.damageDetails?.length > 0 ? DamageDetails.damageDetails[1].total ? DamageDetails.damageDetails[0].total : 0: 'N/A'}</TableCell>
                                </TableRow> */}
                {exterior.map((exter) => {
                  return (
                    <TableRow>
                      <TableCell>
                        {DamageDetails?.damageDetails?.length > 0
                          ? `${exter.damage_location_detail} - ${exter.damage_description}`
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ width: 90 }} align="left">
                        {DamageDetails?.damageDetails?.length > 0
                          ? exter.chargeable_flag == "true"
                            ? "E"
                            : "N"
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ width: 90 }} align="left">
                        {DamageDetails?.damageDetails?.length > 0
                          ? exter.partlabor_hours
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ width: 90 }} align="left">
                        {DamageDetails?.damageDetails?.length > 0
                          ? exter.paint_hours
                            ? exter.paint_hours
                            : 0
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ width: 90 }} align="right">
                        {DamageDetails?.damageDetails?.length > 0 ? (
                          exter.part_cost ? (
                            <CurrencyFormat
                              value={exter.part_cost}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                              suffix={".00"}
                            />
                          ) : (
                            "$0.00"
                          )
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell astyle={{ width: 90 }} align="right">
                        {DamageDetails?.damageDetails?.length > 0 ? (
                          exter.total ? (
                            <CurrencyFormat
                              value={exter.total}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          ) : (
                            "$0.00"
                          )
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell
                    colSpan={6}
                    component="th"
                    scope="row"
                    className="textBold alignleft paddingTop"
                  >
                    Mechanical
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={6} component="th" scope="row">
                    <hr />
                  </TableCell>
                </TableRow>
                {mechanical.map((mech) => {
                  return (
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {DamageDetails?.damageDetails?.length > 0
                          ? `${mech.damage_location_detail} - ${mech.damage_description} `
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ width: 90 }} align="left">
                        {DamageDetails?.damageDetails?.length > 0
                          ? mech.chargeable_flag == "true"
                            ? "E"
                            : "N"
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ width: 90 }} align="left">
                        {DamageDetails?.damageDetails?.length > 0
                          ? mech.partlabor_hours
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ width: 90 }} align="left">
                        {DamageDetails?.damageDetails?.length > 0
                          ? mech.paint_hours
                            ? mech.paint_hours
                            : 0
                          : "N/A"}
                      </TableCell>
                      <TableCell style={{ width: 90 }} align="right">
                        {DamageDetails?.damageDetails?.length > 0 ? (
                          mech.part_cost ? (
                            <CurrencyFormat
                              value={mech.part_cost}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          ) : (
                            "$0.00"
                          )
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                      <TableCell astyle={{ width: 90 }} align="right">
                        {DamageDetails?.damageDetails?.length > 0 ? (
                          mech.total ? (
                            <CurrencyFormat
                              value={mech.total}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          ) : (
                            "$0.00"
                          )
                        ) : (
                          "N/A"
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}

                {/* {wheelTyrelistOfItem.map(list => {
                                    return (
                                        <TableRow key={list}>
                                            <TableCell component="th" scope="row">
                                                Damage area name and description
                                            </TableCell>
                                            <TableCell style={{ width: 90 }} align="right">N</TableCell>
                                            <TableCell style={{ width: 90 }} align="right">000</TableCell>
                                            <TableCell style={{ width: 90 }} align="right">000</TableCell>
                                            <TableCell style={{ width: 90 }} align="right">$000,000</TableCell>
                                            <TableCell astyle={{ width: 90 }} align="right">$000,000</TableCell>
                                        </TableRow>
                                    )
                                })
                                } */}
                <TableRow>
                  <TableCell colSpan={2} component="th" scope="row"></TableCell>
                  <TableCell colSpan={5} component="th" scope="row">
                    <hr />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} component="th" scope="row"></TableCell>
                  <TableCell
                    colSpan={1}
                    style={{ width: 90 }}
                    align="left"
                    className="align_right"
                  >
                    Total
                  </TableCell>
                  <TableCell colSpan={2} component="th" scope="row"></TableCell>
                  <TableCell
                    style={{ width: 90, float: "right", fontWeight: "900" }}
                    align="left"
                    className="align_right11"
                  >
                    <CurrencyFormat
                      value={finalTotal}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                      suffix={"0"}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} component="th" scope="row"></TableCell>
                  <TableCell colSpan={5} component="th" scope="row">
                    <hr />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2} component="th" scope="row"></TableCell>
                  <TableCell colSpan={5} component="th" scope="row">
                    <div className="disclaimerVRS">
                      Disclaimer: Damage estimates are included for reference
                      and may not be reflective of the actual repair costs
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions className="reportFooter">
          <Button
            autoFocus
            onClick={handleClose}
            className="closeButton"
            color="secondary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
