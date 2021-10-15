import React, { useState } from "react";
import Separator from "../Separator";
import AdminSearchHeader from "../AdminSearchHeader";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Route , withRouter} from 'react-router-dom';
const Header = (props) => {
  const [showDealer, setShowDealer] = useState(null);
  const toggleShowDealer = (event) => {
    setShowDealer(event.currentTarget);
  };
  const handleClose = () => {
    setShowDealer(null);
  };
  const handleSearch = (SearchText) => {
    console.log(props)
    //props.searchdetails(SearchText);
    openConditionScreen(SearchText,"")
  }
  let stringData = localStorage.getItem("dealerName");
  const openConditionScreen = (VINumber, vehicle) => {
    console.log(props)
    props.history.push("/conditionreport", {
      vin: VINumber,
      vehicleDetails: vehicle,
      results:true,
    });
  };
  return (
    <div className="container">
      <div className="imageHolder">
        <img src="MFS.png" alt="logo" width="174px" height="33px" />
        <Separator />
        <div className="auctionSales">Auction Sales Platform </div>
      </div>
      <AdminSearchHeader
        searchdetails={(SearchText) =>{ handleSearch(SearchText)}}
      />
      <div onClick={toggleShowDealer} className="dealerName">
      
        {stringData}
      </div>
      <Menu
        id="simple-menu"
        anchorEl={showDealer}
        keepMounted
        open={Boolean(showDealer)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>User Settings</MenuItem>
        <MenuItem onClick={handleClose}>Help</MenuItem>
      </Menu>
    </div>
  );
};

export default withRouter(Header);
