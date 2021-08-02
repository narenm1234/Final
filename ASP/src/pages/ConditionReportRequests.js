import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import { getPassedList1, getInspectionDamageDetailsApi,getOEMBuildDetailsApi} from '../service/api';
import { getInspectionVehicleDetails, getInspectionAccessoryDetails, getInspectionWheelTiresDetails } from '../service/api'
import ManualPricingSideBar from '../components/ManualPricingSideBar';
export default function ConditionReportRequests(props) {
    let listOfItem = ['VIN', 'Engine', 'Door', 'Body Style', 'Transmission', 'Drive Train', 'Interior type', 'Interior Color', 'Keys', 'Interior Type', 'Odor', 'Grounding Mileage', 'Account Type'];
    let wheelTyrelistOfItem = ['LF', 'RF', 'LR', 'RR', 'SP', 'RR']
    const [open, setOpen] = React.useState(false)
    const [condionVehicleDetails, setCondionVehicleDetails] = React.useState({})
    const [accessoryDetails, setAccessoryDetails] = React.useState({})
    const [wheelTiresDetails, setWheelTiresDetails] =useState([])
    const [vin, setVin] = React.useState(props?.match?.params?.vin)
    const [inspectionId, setInspectionId] = React.useState([])
    const [VehicleResponse, setVehicleResponse] = useState([])
    const [value, setValue] = useState([])
    const [DamageDetails, setDamageDetails] = useState([])
    const [OEMBuildDetailsData, setOEMBuildDetailsData] = useState([]);


    console.log("vin:",vin)

    useEffect(()=>{
        getOEMBuildDetails()
    },[vin])

    async function getOEMBuildDetails(){
        let apiResponse = await getOEMBuildDetailsApi(vin)
        setOEMBuildDetailsData(apiResponse.data)
    }


    useEffect(()=>{

        getInspectionDamageDetails()

    },[]);

    async function getInspectionDamageDetails(){
        let getInspectionDamageDetailsaApiResponse = await getInspectionDamageDetailsApi(inspectionId,vin);
        setDamageDetails(getInspectionDamageDetailsaApiResponse.data)

    }

    useEffect(() => {


        getVehicleDetails()
    }, []);
    async function getVehicleDetails() {
        let apiResponse = await getPassedList1();
        setVehicleResponse(apiResponse.data.data);
        console.log(VehicleResponse.data)
    }
    // console.log("vin", vin)
    useEffect(() => {
        getConditionVehicleDetails()
    }, [vin]);

    useEffect(() => {
        getInspectionAccessory(inspectionId)
        getInspectionWheelTires(inspectionId)
    }, [inspectionId]);

    async function getConditionVehicleDetails() {
        let apiResponse = await getInspectionVehicleDetails(vin);
        console.log("getConditionVehicleDetailsresponse",apiResponse)
        setCondionVehicleDetails(apiResponse.data);
        setInspectionId(apiResponse.data.inspection_id)
    }

    async function getInspectionAccessory(inspectionId) {
        let apiResponse = await getInspectionAccessoryDetails(inspectionId);
        setAccessoryDetails(apiResponse.data);
    }

    async function getInspectionWheelTires(inspectionId) {
        let apiResponse = await getInspectionWheelTiresDetails(inspectionId);
        console.log("wheelTiresDetailsapires",apiResponse)
        setWheelTiresDetails(apiResponse.data);
    }

    const handleOpen = () => {
        setOpen(!open)
    }
    const handleClose = () => {
        setOpen(!open)
    }
    return (
        <>
            <div className='conditionPageCardReports'>
                <Grid item xs={12}>
                    <div className='conditionTopBar'>
                        <Grid xs={12} className='conditionTopBarLayout'>
                            <Link to="/adminInventoryRequests">name</Link>
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
                                       {DamageDetails.exteriorCost?DamageDetails.exteriorCost:'NA'}
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
                                    {DamageDetails.interiorCost?DamageDetails.interiorCost:'NA'}
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
                                    {DamageDetails.maintainenceCost?DamageDetails.maintainenceCost:'NA'}
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} >
                            <Button variant="outlined" color="primary" className="detailedReport" onClick={handleOpen}>
                                View Full Detailed Report
                            </Button>
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
                            <span>MAZDA SD 2019 </span>
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
                                        Payoff
                                    </div>
                                    <div className="smallCardBody">
                                        $12,000.00
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={3} className="ConditionCardMargin" >
                            <Card className="ConditionCard" >
                                <CardContent>
                                    <div className="smallCardTitle1">
                                        Residual + Remaining
                                    </div>
                                    <div className="smallCardBody">
                                        $11,250.00
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
                                        $10,500.00
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
                                    {condionVehicleDetails.condition_grade}
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
                                    {condionVehicleDetails.inspection_mileage}
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

                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  VIN  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">{vin}</span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Inspection Date  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">
                                        {condionVehicleDetails.inspection_date}
                                        </span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Inspection Location  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">
                                        {condionVehicleDetails.location_address}
                                        </span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span >
                                                .
                                            </span>
                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">
                                        {condionVehicleDetails.location_address2}{condionVehicleDetails.location_city}
                                        </span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span > .   </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">{condionVehicleDetails.location_code}</span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Consignor  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">{condionVehicleDetails?.location_address}</span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Engine  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">{condionVehicleDetails?.engine_cylinder}</span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Door  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        {/* <span className="textSize">{condionVehicleDetails?.location_address}</span> */}
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Body Style  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">{condionVehicleDetails?.body_style}</span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Transmission  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">{condionVehicleDetails?.transmission_type}</span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Drive Train  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        {/* <span className="textSize">{condionVehicleDetails?.location_address}</span> */}
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Exterior color  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">{condionVehicleDetails?.ext_color}</span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Interior Type  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">{condionVehicleDetails?.interior_material}</span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Interior color  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">{condionVehicleDetails?.int_color}</span>
                                    </ListItemSecondaryAction>
                                </List>

                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Keys  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        {/* <span className="textSize">{condionVehicleDetails?.location_address}</span> */}
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Grounding Mileage  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize">9,000 miles</span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Account Type  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize"></span>
                                    </ListItemSecondaryAction>
                                </List>
                                <List className="paddingCSS">
                                    <ListItemText>
                                        <span className="textStyle">
                                            <span className="textBold">  Odor  </span>

                                        </span>
                                    </ListItemText>
                                    <ListItemSecondaryAction>
                                        <span className="textSize"></span>
                                    </ListItemSecondaryAction>
                                </List>


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
                                            {/* {['Item Name', 'Item Name', 'Item Name', 'Item Name'].map(list => {
                                                return ( */}
                                                    <TableRow key="10074">
                                                        <TableCell component="th" scope="row">
                                                            {accessoryDetails.item_id}
                                                        </TableCell>
                                                        <TableCell align="right">{accessoryDetails.description}</TableCell>
                                                        {/* <TableCell align="right">y</TableCell>
                                                        <TableCell align="right">z</TableCell> */}
                                                    </TableRow>
                                                {/* )
                                            })
                                            } */}
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
                                            {wheelTiresDetails?.map(list => {
                                                return (
                                                    <TableRow key={list}> 
                                                        <TableCell component="th" scope="row">
                                                            {wheelTiresDetails?.tire_location}
                                                        </TableCell>
                                                        <TableCell align="right">{list.tire_location}</TableCell>
                                                        <TableCell align="right">{list.manufracturer}</TableCell>
                                                        <TableCell align="right">{list.size}</TableCell>
                                                        <TableCell align="right">{list.tread}</TableCell>
                                                        <TableCell align="right">{list.tread}</TableCell>
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
                                            {['1'].map(list => {
                                                return (
                                                    <TableRow key={list}>
                                                        <TableCell component="th" scope="row">
                                                            {list}
                                                        </TableCell>
                                                        <TableCell align="right"></TableCell>
                                                        <TableCell align="right"> </TableCell>
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
            <ViewDetailedReport DamageDetails={DamageDetails} open={open} close={handleClose} />
        </div>
        <ManualPricingSideBar />
        </>
    );
};