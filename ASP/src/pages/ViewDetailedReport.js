import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import MyGallery from './ImageGallery';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import CurrencyFormat from "react-currency-format";
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import CurrencyFormat from "react-currency-format";
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
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
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
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

let serviceData = {
    "damageDetails": [
        {
            "inspection_id": 19234370,
            "vin": "JM3KFBCY5M0384441",
            "damage_area": "",
            "partlabor_hours": 0,
            "total": null,
            "paint_rate": 46.0,
            "chargeable_flag": "false",
            "paint_hours": 2,
            "part_cost": 0.0,
            "damage_type": "1"
        },
        {
            "inspection_id": 19234370,
            "vin": "JM3KFBCY5M0384441",
            "damage_area": "",
            "partlabor_hours": 0,
            "total": null,
            "paint_rate": 46.0,
            "chargeable_flag": "false",
            "paint_hours": 2,
            "part_cost": 0.0,
            "damage_type": "1"
        },
        {
            "inspection_id": 19234370,
            "vin": "JM3KFBCY5M0384441",
            "damage_area": "",
            "partlabor_hours": 0,
            "total": null,
            "paint_rate": 46.0,
            "chargeable_flag": "false",
            "paint_hours": 2,
            "part_cost": 0.0,
            "damage_type": "1"
        }
    ],
    "interiorCost": null,
    "exteriorCost": null,
    "maintainenceCost": null,
    "excessiveWandT": 0.0,
    "normal": 0.0
};
export default function ViewDetailedReport(props) {
    const [open, setOpen] = React.useState(false);
    const [interior,setInterior] = React.useState([]);
    const [exterior,setExterior] = React.useState([]);
    const [mechanical,setMechanical] = React.useState([]);
    const [finalTotal,setFinalTotal] = React.useState([]);

    let wheelTyrelistOfItem = ['LF', 'RF']
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        props.close()
    };
    

    const {DamageDetails}=props;
    const handleSeperation = () => {
        let interior = []
        let exterior = []
        let mechanical = []
        let total = 0;
      if(DamageDetails?.damageDetails?.length > 0)
    {
        DamageDetails?.damageDetails?.map(row => {
            if(row.damage_type == "X"){
                exterior.push(row);
            } else if(row.damage_type == "I"){
                interior.push(row);
            } else if(row.damage_type == "M"){
                mechanical.push(row);
            }
            total = total + (row.total ? parseInt(row.total): 0);
            
        });
        console.log(exterior,"iiiiiiii");
        console.log(interior,"iiiiiiii");
        console.log(mechanical,"iiiiiiii");
        setExterior(exterior);
        setInterior(interior);
        setMechanical(mechanical);
        setFinalTotal(total)
      }
      
    }
    useEffect(() =>{
        handleSeperation();
    },[props.DamageDetails]);
    return (
        <div>
            <Dialog onClose={handleClose} maxWidth={'lg'} aria-labelledby="max-width-dialog-title" open={props.open}>
                <DialogTitle className="viewReportHeader" id="customized-dialog-title" onClose={handleClose} >
                    Damage  Report
                </DialogTitle>
                <DialogContent>
                    <Grid container >
                        <Grid item xs={6} className="galleryView">
                            <MyGallery />
                        </Grid>


                        <Grid xs={6}>
                            <div className="viewReportCenter">Estimated Damage Repair Totals</div>
                            <div className="hrLine" />
                            <Grid container className="experiorSpacing">
                                <Grid item xs={12}>
                                    <List >
                                        <ListItem >
                                            <ListItemText className="smallCardTitle"><span className="textBold alignleft">Interior</span></ListItemText>
                                            <ListItemSecondaryAction className="smallCardBody ">{DamageDetails.interiorCost ? (<CurrencyFormat
                                                value={DamageDetails.interiorCost}
                                                displayType={"text"}
                                                thousandSeparator={true}
                                            />) : '0'}</ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText className="smallCardTitle"><span className="textBold alignleft">Exterior</span></ListItemText>
                                            <ListItemSecondaryAction className="smallCardBody ">{DamageDetails.exteriorCost ? (<CurrencyFormat
                                                value={DamageDetails.exteriorCost}
                                                displayType={"text"}
                                                thousandSeparator={true}/>) : '0'}
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText className="smallCardTitle"><span className="textBold alignleft">Mechanical total</span></ListItemText>
                                            <ListItemSecondaryAction className="smallCardBody ">{DamageDetails.maintainenceCost?(<CurrencyFormat
                                                value={DamageDetails.maintainenceCost}
                                                displayType={"text"}
                                                thousandSeparator={true}/>) :'0'}</ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText className="smallCardTitle"><span className="textBold alignleft">Normal W&T</span></ListItemText>
                                            <ListItemSecondaryAction className="smallCardBody ">{DamageDetails.normal?`$${DamageDetails.normal}`:'0'}</ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText className="smallCardTitle"><span className="textBold alignleft ">Excessive W&T</span></ListItemText>
                                            <ListItemSecondaryAction className="smallCardBody ">{DamageDetails.excessiveWandT?`$${DamageDetails.excessiveWandT}`:'0'}</ListItemSecondaryAction>
                                        </ListItem>
                                    </List>

                                </Grid>
                                <Grid item xs={12}>
                                    <div className="LabelTextTextAreaDamage">Damage Area Description</div>
                                    <TextareaAutosize
                                        className="inputFieldTextAreaDamage"
                                        aria-label="maximum height"
                                        placeholder="Maximum 4 rows"
                                        defaultValue="Short description that aligns with the photo that is being displayed from the table below" />
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                    <TableContainer component={Paper}>
                        <Table className="table" size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Damaged Area</TableCell>
                                    <TableCell align="left">Wear & Tear</TableCell>
                                    <TableCell align="left">Labor Hours</TableCell>
                                    <TableCell align="left">Paint Hours</TableCell>
                                    <TableCell align="left">Part Cost</TableCell>
                                    <TableCell align="left">Estimate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={6} component="th" scope="row" className="textBold alignleft">
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
                                {
                                    interior.map(inter => {
                                   return(<TableRow >
                                            <TableCell component="th" scope="row">
                                                {DamageDetails?.damageDetails?.length > 0 ? `${inter.damage_location_detail} - ${inter.damage_description}` : 'N/A'}
                                            </TableCell>
                                            <TableCell style={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ?inter.chargeable_flag : 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ? inter.partlabor_hours: 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ? inter.paint_hours? inter.paint_hours:0: 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ? inter.part_cost ? inter.part_cost : 0: 'N/A'}</TableCell>
                                            <TableCell astyle={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ? inter.total ? inter.total : 0: 'N/A'}</TableCell>
                                  </TableRow>)
                                    })
                                }
                                <TableRow>
                                    <TableCell colSpan={6} component="th" scope="row" className="textBold alignleft">
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
                                {
                                    exterior.map(exter => {
                                    return (<TableRow >
                                            <TableCell component="th" scope="row">
                                                {DamageDetails?.damageDetails?.length > 0 ?  `${exter.damage_location_detail} - ${exter.damage_description}` : 'N/A'}
                                            </TableCell>
                                            <TableCell style={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ?exter.chargeable_flag : 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ? exter.partlabor_hours: 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ? exter.paint_hours? exter.paint_hours:0: 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ? exter.part_cost ? exter.part_cost : 0: 'N/A'}</TableCell>
                                            <TableCell astyle={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ? exter.total ? exter.total : 0: 'N/A'}</TableCell>
                                  </TableRow>)
                                    })
                                }
                                <TableRow>
                                    <TableCell colSpan={6} component="th" scope="row" className="textBold alignleft">
                                        Mechanical
                                    </TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={6} component="th" scope="row">
                                        <hr />
                                    </TableCell>

                                </TableRow>
                                {
                                    mechanical.map(mech => {
                                   return(<TableRow >
                                            <TableCell component="th" scope="row">
                                                {DamageDetails?.damageDetails?.length > 0 ? `${mech.damage_location_detail} - ${mech.damage_description} ` : 'N/A'}
                                            </TableCell>
                                            <TableCell style={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ?mech.chargeable_flag : 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ? mech.partlabor_hours: 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ? mech.paint_hours? mech.paint_hours:0: 'N/A'}</TableCell>
                                            <TableCell style={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ? mech.part_cost ? mech.part_cost : 0: 'N/A'}</TableCell>
                                            <TableCell astyle={{ width: 90 }} align="left">{DamageDetails?.damageDetails?.length > 0 ? mech.total ? mech.total : 0: 'N/A'}</TableCell>
                                  </TableRow>)
                                    })
                                }
                                
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
                                <TableRow >
                                    <TableCell colSpan={2} component="th" scope="row">
                                    </TableCell>
                                    <TableCell colSpan={5} component="th" scope="row">
                                        <hr />
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell colSpan={2} component="th" scope="row">
                                    </TableCell>
                                    <TableCell colSpan={1} style={{ width: 90 }} align="right">Total</TableCell>
                                    <TableCell colSpan={2} component="th" scope="row">
                                    </TableCell>
                                    <TableCell style={{ width: 90 }} align="left" >$<CurrencyFormat
                          value={finalTotal}
                          displayType={"text"}
                          thousandSeparator={true}
        
                        /></TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell colSpan={2} component="th" scope="row">
                                    </TableCell>
                                    <TableCell colSpan={5} component="th" scope="row">
                                        <hr />
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell colSpan={2} component="th" scope="row">
                                    </TableCell>
                                    <TableCell colSpan={5} component="th" scope="row">
                                        <div className="disclaimer">
                                            Disclaimer: Damage estimates are included for reference and may not be reflective of the actual repair costs
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions className="reportFooter">
                    <Button autoFocus onClick={handleClose} className="closeButton" color="secondary">
                        close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
