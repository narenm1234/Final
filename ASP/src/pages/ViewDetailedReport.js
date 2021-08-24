import React from 'react';
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
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
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

export default function ViewDetailedReport(props) {
    const [open, setOpen] = React.useState(false);
    let wheelTyrelistOfItem = ['LF', 'RF']
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        props.close()
    };

    const {DamageDetails}=props;

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
                                            <ListItemSecondaryAction className="smallCardBody warningColor">{"$"}{DamageDetails.interiorCost?DamageDetails.interiorCost:'NA'}</ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText className="smallCardTitle"><span className="textBold alignleft">Exterior</span></ListItemText>
                                            <ListItemSecondaryAction className="smallCardBody warningColor">{"$"}{DamageDetails.exteriorCost?DamageDetails.exteriorCost:'NA'}</ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText className="smallCardTitle"><span className="textBold alignleft">Mechanical total</span></ListItemText>
                                            <ListItemSecondaryAction className="smallCardBody warningColor">{"$"}{DamageDetails.maintainenceCost?DamageDetails.maintainenceCost:'NA'}</ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText className="smallCardTitle"><span className="textBold alignleft">Normal W and T</span></ListItemText>
                                            <ListItemSecondaryAction className="smallCardBody warningColor">$00,000.00</ListItemSecondaryAction>
                                        </ListItem>
                                        <ListItem>
                                            <ListItemText className="smallCardTitle"><span className="textBold alignleft ">Excessive W and T</span></ListItemText>
                                            <ListItemSecondaryAction className="smallCardBody errorColor">$00,000.00</ListItemSecondaryAction>
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
                                    <TableCell align="right">Wear&Tear</TableCell>
                                    <TableCell align="right">Labour Hours</TableCell>
                                    <TableCell align="right">Paint Hours</TableCell>
                                    <TableCell align="right">Part Cost</TableCell>
                                    <TableCell align="right">Estimate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell colSpan={6} component="th" scope="row" className="warningColorTable">
                                        Interior
                                    </TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={6} component="th" scope="row">
                                        <hr />
                                    </TableCell>

                                </TableRow>
                                {wheelTyrelistOfItem.map(list => {
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
                                }
                                <TableRow>
                                    <TableCell colSpan={6} component="th" scope="row" className="warningColorTable">
                                        Exterior
                                    </TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={6} component="th" scope="row">
                                        <hr />
                                    </TableCell>

                                </TableRow>

                                {wheelTyrelistOfItem.map(list => {
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
                                }
                                <TableRow>
                                    <TableCell colSpan={6} component="th" scope="row" className="warningColorTable">
                                        Mechanical
                                    </TableCell>

                                </TableRow>
                                <TableRow>
                                    <TableCell colSpan={6} component="th" scope="row">
                                        <hr />
                                    </TableCell>

                                </TableRow>
                                {wheelTyrelistOfItem.map(list => {
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
                                }
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
                                    <TableCell colSpan={1} style={{ width: 90,color: '#0070d2' }} align="right">Total</TableCell>
                                    <TableCell colSpan={2} component="th" scope="row">
                                    </TableCell>
                                    <TableCell style={{ width: 90,color: '#0070d2' }} align="right" >$000,000</TableCell>
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
