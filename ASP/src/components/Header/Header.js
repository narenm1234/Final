import React, { useState } from "react";
import Separator from "../Separator";
import AdminSearchHeader from "../AdminSearchHeader";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const Header = (props) => {
  const [showDealer, setShowDealer] = useState(null);
  const toggleShowDealer = (event) => {
    setShowDealer(event.currentTarget);
  };
  const handleClose = () => {
    setShowDealer(null);
  };

  return (
    <div className="container">
      <div className="imageHolder">
        <img src="MFS.png" alt="logo" width="174px" height="33px" />
        <Separator />
        <div className="auctionSales">Auction Sales Platform </div>
      </div>
      <AdminSearchHeader
        searchdetails={(SearchText) => props.searchdetails(SearchText)}
      />
      <div onClick={toggleShowDealer} className="dealerName">
        Dealer Name
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

export default Header;
