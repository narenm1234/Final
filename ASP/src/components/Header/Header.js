import React, { useState } from 'react';
import Separator from '../Separator';
import AdminSearchHeader from '../AdminSearchHeader';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const Header = (props) => {
  const [showDealer, setShowDealer] = useState(null);
  const toggleShowDealer = (event) => {
    setShowDealer(event.currentTarget);
  };
  const handleClose = () => {
    setShowDealer(null);
  }

  return (
    <div class="container">
      <div class="imageHolder">
        <img src="MFS.png" alt="logo" width="174px" height="33px" />
        <Separator />
        <div class="auctionSales"><text>Auction Sales Platform </text></div>
      </div>
      <AdminSearchHeader searchdetails={(SearchText) => props.searchdetails(SearchText)} />
      <div onClick={toggleShowDealer} class="dealerName"><text>Dealer Name</text></div>
      <Menu id="simple-menu" anchorEl={showDealer} keepMounted open={Boolean(showDealer)}
        onClose={handleClose} >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>User Settings</MenuItem>
        <MenuItem onClick={handleClose}>Help</MenuItem>
      </Menu>
    </div>
  )
}

export default Header;