import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import LinearProgress from '@material-ui/core/LinearProgress';
import SwipeableTextMobileStepper from './Carousel'
import { getGroundingList } from '../../service/api';
export default function ListingPage(props) {
    const [vehicleResponse, setVehicleResponse] = useState([])

    useEffect(() => {


        getVehicleDetails()
    })
    async function getVehicleDetails() {
        let apiResponse = await getGroundingList();
        setVehicleResponse(apiResponse.data);
    }


    return (
        vehicleResponse.length > 0 ?
            vehicleResponse.map(vehicle => {
                return (
                    <div className='listingPageCard'>
                        <Grid container spacing={3}>
                            <Grid item xs={4}>
                                <SwipeableTextMobileStepper />
                            </Grid>
                            <Grid item xs={4}>
                                <div class="Year-Make-Model-Col">
                                    <div class="vehicleMakeModel">
                                        <span>{vehicle.brand} {vehicle.model} - {vehicle.ext_color} | {vehicle.model_year}</span>
                                    </div>
                                    <List >

                                        <span className="textStyle">
                                            Exclusivity Period: 00:00 remaining
                                        </span>
                                        <span className="progressStyle">
                                            <LinearProgress variant="determinate" value={50} color="secondary" />
                                        </span>

                                        <span className="textStyle">
                                            VIN: {vehicle.vin}
                                        </span>
                                        <span className="textStyle">
                                            Grounding Date: {vehicle.grounding_date}
                                        </span>
                                        <span className="textStyle">
                                            Grounding Mileage: {vehicle.odometer_reading}
                                        </span>
                                        <span className="textStyle">
                                            Inspection Mileage: 000,000 miles
                                        </span>
                                        <span className="textStyle">
                                            Account Type: {vehicle.account_type}
                                        </span>
                                    </List>

                                </div>
                            </Grid>
                            <Grid item xs={4}>
                                <div class="Vehicle-Price-Option">
                                    <div class="vehicleMakeModel">
                                        <span>Vehiche price option </span>
                                    </div>
                                    <List >
                                        <span className="textStyle">
                                            Payoff: {vehicle.pay_off_amt}
                                        </span>
                                        <span className="textStyle">
                                            Residual + Remaining Payments: {vehicle.residual_amt + vehicle.remaining_pmts}
                                        </span>
                                        <span className="textStyle">
                                            Market: $000,000
                                        </span>
                                        <span className="textStyle">
                                            Market + Remaining Payments: ${vehicle.remaining_pmts}
                                        </span>
                                    </List>
                                    <div className="NavigatorButtons">
                                        <Button className="PassonVehicleStyle">
                                            Pass on vehicle
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="button"
                                        >
                                            {'Purchase Vehicle'}
                                        </Button>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>

                    </div>
                )
            }) : (<div className='listingPageCard'>
                <h1>No  data found</h1>
            </div>)

    );
};
