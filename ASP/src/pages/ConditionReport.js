import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import SwipeableTextMobileStepper from './GroundPending/Carousel';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
export default function ConditionReport(props) {
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
                </Grid>
            </Grid>
        </div>
    );
};