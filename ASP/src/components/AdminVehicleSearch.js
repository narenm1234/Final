import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import CustomizedInputBase from './CustomisedInput';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';
import SearchText from './SearchText/Search';
const AdminVehicleSearch = (props) => {

  console.log("searchdetails",props);

  return (
    <Card className="adminSearchCard">
      <CardContent className="adminSearcheader">
        <Typography variant="h4" component="h4">
          Welcome to Auction Sales Platform
        </Typography>
        <Typography variant="p" component="p">
          Search for a vehicle, or start with any of the menu items on the left.
        </Typography>
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