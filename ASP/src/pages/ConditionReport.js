import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ViewDetailedReport from './ViewDetailedReport';
import MyGallery from './ImageGallery';
import CloudDownloadOutlined from '@material-ui/icons/CloudDownloadOutlined'
import PrintSharp from '@material-ui/icons/PrintSharp'

export default function ConditionReport(props) {
    let listOfItem = ['VIN', 'Engine', 'Door', 'Body Style', 'Transmission', 'Drive Train', 'Interior type', 'Interior Color', 'Keys', 'Interior Type', 'Odor',  'Grounding Mileage', 'Account Type'];
    let wheelTyrelistOfItem = ['LF', 'RF', 'LR', 'RR', 'SP', 'RR']
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }
    const handleClose = () => {
        setOpen(!open)
    }
    return (
        <div className='conditionPageCard'>
            <Grid item xs={12}>
                <div className='conditionTopBar'>
                    <Grid xs={12} className='conditionTopBarLayout'>
                        <CloudDownloadOutlined /><span className="conditionTopBarStyles">Download Report</span>
                        <PrintSharp /><span className="conditionTopBarStyles">Print Report</span>
                    </Grid>
                </div>
            </Grid>
            <Grid container spacing={3} className="ConditionCardReportSpace">
                <Grid item xs={5}>
                    <MyGallery />
                    <Grid container className="ConditionCardBody">
                        <div className='damageTitle'>
                            <span>Damage Report</span>
                        </div>
                        <Grid item xs={4} >
                            <Card className="ConditionCardDamage" >
                                <CardContent>
                                    <div className="smallCardTitle">
                                        Exterior total
                                    </div>
                                    <div className="smallCardBody warningColor">
                                        $10000
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4} >
                            <Card className="ConditionCardDamage" >
                                <CardContent>
                                    <div className="smallCardTitle">
                                        Interior total
                                    </div>
                                    <div className="smallCardBody warningColor">
                                        $10000
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={4} >
                            <Card className="ConditionCardDamage" >
                                <CardContent>
                                    <div className="smallCardTitle">
                                        Mechanical total
                                    </div>
                                    <div className="smallCardBody warningColor">
                                        $10000
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} >
                            <div className="detailedReport" onClick={handleOpen}>
                                View Full Detailed Report
                            </div>
                        </Grid>
                        <Grid item xs={12} >
                            <div className="disclaimer">
                                Disclaimer: Damage estimates are included for reference and may not be reflective of the actual repair costs
                            </div>
                        </Grid>
                    </Grid>
                    <div className="LabelTextTextArea">Announcements</div>
                    <TextareaAutosize
                        className="inputFieldTextArea"
                        aria-label="maximum height"
                        placeholder="Maximum 4 rows"
                        defaultValue="Text area describes when a vehicle may have possible structural damage. This is non editable text/container, but you can drag the container corner for more height if the user wants to see more info without having to scroll, if there is a lot of copy. "
                    />
                </Grid>
                <Grid item xs={7}>
                    <div className='ConditionReportSection'>
                        <div className='reportTitle'>
                            <span>Year Make Model Color</span>
                        </div>
                        <span className='ConditionReportInspection'>
                            <span className='BadgeValue'>Inspection Complete</span>
                        </span>
                    </div>
                    <Grid container spacing={3}>
                        <Grid item xs={3} className="ConditionCardMargin">
                            <Card className="ConditionCard" >
                                <CardContent>
                                    <div className="smallCardTitle">
                                        Pay Off
                                    </div>
                                    <div className="smallCardBody">
                                        $10000
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={3} className="ConditionCardMargin" >
                            <Card className="ConditionCard" >
                                <CardContent>
                                    <div className="smallCardTitle">
                                        Residual + Remaining
                                    </div>
                                    <div className="smallCardBody">
                                        $10000
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={3} className="ConditionCardMargin">
                            <Card className="ConditionCard" >
                                <CardContent>
                                    <div className="smallCardTitle">
                                        Market Based
                                    </div>
                                    <div className="smallCardBody">
                                        $10000
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={3} className="ConditionCardMargin">
                            <Card className="ConditionCard" >
                                <CardContent>
                                    <div className="smallCardTitle">
                                        Inspection Grade
                                    </div>
                                    <div className="smallCardBody">
                                        3.0
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={3} className="ConditionCardMargin">
                            <Card className="ConditionCard" >
                                <CardContent>
                                    <div className="smallCardTitle">
                                        Odometer
                                    </div>
                                    <div className="smallCardBody">
                                        000,000 mi
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Card className="vehicleSectionCR">
                            <Typography variant="h6">Vehicle Details</Typography>
                            <hr />
                            <CardContent>

                                {listOfItem.map(list => {
                                    return (
                                        <List className="paddingCSS">
                                            <ListItemText>
                                                <span className="textStyle">
                                                    <span className="textBold">  {list}  </span>

                                                </span>
                                            </ListItemText>
                                            <ListItemSecondaryAction>
                                                <span className="textSize">Details</span>
                                            </ListItemSecondaryAction>
                                        </List>
                                    )
                                })
                                }

                            </CardContent>

                            <CardContent>
                                <Typography variant="h6">Accessories</Typography>
                                <hr />
                                <TableContainer component={Paper}>
                                    <Table className="table" size="small" aria-label="a dense table">
                                        {/*  <TableHead>
                                            <TableRow>
                                                <TableCell>Item Name</TableCell>
                                                <TableCell align="right">Item Name</TableCell>
                                                <TableCell align="right">Item Name</TableCell>
                                                <TableCell align="right">Item Name</TableCell>
                                            </TableRow>
                                       </TableHead>*/}
                                        <TableBody>
                                            {['Item Name', 'Item Name', 'Item Name', 'Item Name'].map(list => {
                                                return (
                                                    <TableRow key={list}>
                                                        <TableCell component="th" scope="row">
                                                            {list}
                                                        </TableCell>
                                                        <TableCell align="right">{list}</TableCell>
                                                        <TableCell align="right">{list}</TableCell>
                                                        <TableCell align="right">{list}</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            <CardContent>
                                <Typography variant="h6">Wheels and Tyres</Typography>
                                <hr />
                                <TableContainer component={Paper}>
                                    <Table className="table" size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Location</TableCell>
                                                <TableCell align="right">Brand</TableCell>
                                                <TableCell align="right">Size</TableCell>
                                                <TableCell align="right">Wheel</TableCell>
                                                <TableCell align="right">Tread Depth</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {wheelTyrelistOfItem.map(list => {
                                                return (
                                                    <TableRow key={list}>
                                                        <TableCell component="th" scope="row">
                                                            {list}
                                                        </TableCell>
                                                        <TableCell align="right">Name</TableCell>
                                                        <TableCell align="right">#</TableCell>
                                                        <TableCell align="right">Type</TableCell>
                                                        <TableCell align="right">X/X</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                            <CardContent>
                                <Typography variant="h6">Build Data</Typography>
                                <hr />
                                <TableContainer component={Paper}>
                                    <Table className="table" size="small" aria-label="a dense table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Code</TableCell>
                                                <TableCell align="right">Description</TableCell>
                                                <TableCell align="right">Package Details</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {['XX', 'XX', 'XX'].map(list => {
                                                return (
                                                    <TableRow key={list}>
                                                        <TableCell component="th" scope="row">
                                                            {list}
                                                        </TableCell>
                                                        <TableCell align="right">XX</TableCell>
                                                        <TableCell align="right">Details about the coded item</TableCell>
                                                    </TableRow>
                                                )
                                            })
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                            </CardContent>
                            <div className="disclaimerVRS">
                                Disclaimer: The parts, equipment, accessories, and other information listed above are based on equipment/configuration at the time vehicle was sold by Mazda Motor Corporation to a dealer and does not mean that this vehicle is still so equipped.
                            </div>
                        </Card>

                    </Grid>
                </Grid>
            </Grid>
            <ViewDetailedReport open={open} close={handleClose} />
        </div>
    );
};