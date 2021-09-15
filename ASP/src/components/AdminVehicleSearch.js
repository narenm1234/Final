import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CustomizedInputBase from './CustomisedInput';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import SearchText from './SearchText/Search';
const AdminVehicleSearch = (props) => {

  console.log("searchdetails",props);

  return (
    <Card className="adminSearchCard">
     
      <CardContent className="adminSearcheader">
      <img
        className="cover"
        src="searchCar.jpeg"
      />
       <div className="adminSearcheaderColor">
     <Typography variant="h4" component="h4">
          Vehicle Search
        </Typography>
        <Typography variant="p" component="p">
          Search for a vehicle, or start with any of the menu items on the left.
        </Typography>
     </div>
      
      </CardContent>
      <Divider />
      <CardContent className="adminSearchCardBody">
        <CustomizedInputBase searchdetails={(SearchText) => props.searchdetails(SearchText)} />
        <Button variant="contained" onClick={props.fromchildhandleSubmitbtn()} color="primary">
          Submit
        </Button>
      </CardContent>
    </Card>

  )
}
export default AdminVehicleSearch;