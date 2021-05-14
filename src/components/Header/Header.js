import React, { useState } from 'react';
import Search from '../Search/Search';
import Separator from '../Separator';

const Header = (props) => {
  const [showDealer, setShowDealer] = useState(false);
  const placeholderValue = "Serach by Year, Make, Model,VIN, Series or Color";
  const toggleShowDealer = () => {
    setShowDealer(!showDealer);
  }
  return (
    <div class="container">
      <div class="imageHolder">
        <img src="MFS.png" alt="logo" width="174px" height="33px" />
        <Separator />
        <div class="auctionSales"><text>Auction Sales Platform </text></div>
      </div>

      <div onClick={toggleShowDealer} class="dealerName"><text>Dealer Name</text></div>
      {showDealer && <div class="toggleShowDealertab"><div class="toggleNotSelectedtab" >Profile </div> <div class="toggleSelectedtab">User Settings</div> <div class="toggleNotSelectedtab" >Help</div></div>}
    </div>


  )




}

export default Header;