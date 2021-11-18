import React, { useState } from "react";
import Separator from "../Separator";
import AdminSearchHeader from "../AdminSearchHeader";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Route, withRouter } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getDealerDropData } from "../../service/api";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const Header = (props) => {
  const [showDealer, setShowDealer] = useState(null);
  const [dealerName, setDealerName] = useState("");
  const [dealerDrop, setDealerDrop] = useState([]);
  const toggleShowDealer = (event) => {
    setShowDealer(event.currentTarget);
  };
  React.useEffect(() => {
    setDealerName(localStorage.getItem("dealerName"));
  }, [localStorage.getItem("dealerName")]);

  React.useEffect(() => {
    getDealerDrop();
  }, []);

  async function getDealerDrop() {
    let apiResponse = await getDealerDropData();
    let dealerdata = apiResponse.data;
    dealerdata.forEach((item) => {
      item.checked = false;
    });
    setDealerDrop(dealerdata);
  }

  const handleClose = () => {
    setShowDealer(null);
  };
  const handleSearch = (SearchText) => {
    console.log(props);
    //props.searchdetails(SearchText);
    openConditionScreen(SearchText, "");
  };

  const openConditionScreen = (VINumber, vehicle) => {
    console.log(props);
    props.history.push("/conditionreport", {
      vin: VINumber,
      vehicleDetails: vehicle,
      results: true,
    });
  };

  const handleChange = (ditem) => {
    let dealerData = dealerDrop;
    dealerData.forEach((x) => {
      if (x.dealer_number === ditem.dealer_number) {
        x.checked = !ditem.checked;
      }
    });
    setDealerDrop([...dealerData]);
    let selectedDealerData = dealerData.filter(x=> x.checked);
    props.selectedDealers(selectedDealerData)
  };

  return (
    <div className="container">
      <div className="imageHolder">
        <img src="MFS.png" alt="logo" width="174px" height="33px" />
        <Separator />
        <div className="auctionSales">Auction Sales Platform </div>
      </div>
      <AdminSearchHeader
        searchdetails={(SearchText) => {
          handleSearch(SearchText);
        }}
      />
      <div className="dealerName">
        {dealerName ? dealerName : "Dealer Name"} &nbsp; &nbsp;
        <IconButton aria-label="Delete" onClick={toggleShowDealer}>
          <ArrowDropDownIcon />
        </IconButton>
      </div>
      <Menu
        id="dealer-menu"
        anchorEl={showDealer}
        keepMounted
        open={Boolean(showDealer)} 
        onClose={handleClose}
        className="dealermenu"
      >
        {!dealerName && dealerDrop &&
          dealerDrop.map((ditem, index) => (
            <MenuItem key={index}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={ditem.checked}
                      onChange={()=>{handleChange(ditem)}}
                      value={ditem.dealer_number}
                    />
                  }
                  label={ditem.dealer_name + '('+ditem.dealer_number+')'}
                />
              </FormGroup>
            </MenuItem>
          ))}
        {/* <MenuItem onClick={handleClose}>User Settings</MenuItem>
        <MenuItem onClick={handleClose}>Help</MenuItem> */}
      </Menu>
    </div>
  );
};

export default withRouter(Header);
