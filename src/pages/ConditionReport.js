import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import SwipeableTextMobileStepper from './GroundPending/Carousel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import ListItem from '@material-ui/core/ListItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
export default function ConditionReport(props) {
    let listOfItem = ['VIN', 'Engine', 'Door', 'Body Style', 'Transmission', 'Drive Train', 'Interior type', 'Interior Color', 'Keys', 'Interior Type', 'Odor', 'Keys', 'Grounding Mileage', 'Account Type'];
    let wheelTyrelistOfItem = ['LF', 'RF', 'LR', 'RR', 'SP', 'RR']
    return (
        <div className='conditionPageCard'>
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <SwipeableTextMobileStepper />

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
                                    <div className="smallCardBody">
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
                                    <div className="smallCardBody">
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
                                    <div className="smallCardBody">
                                        $10000
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <div className="detailedReport">
                            View detailed Report
                        </div>
                        <div className="disclaimer">
                            Disclaimer: Damage estimates are included for reference and may not be reflective of the actual repair costs
                        </div>
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
                            <h4>Vehicle Details</h4>
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
                                <h4>Accessories</h4>
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
                                <h4>Wheels and Tyres</h4>
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
                                <h4>Build Data</h4>
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
        </div>
    );
};