import React, { useState, useEffect } from "react";
import Search from "../../components/SearchText/Search";
import TextField from "@material-ui/core/TextField";
import { InputLabel } from "@material-ui/core";
import GroundVehicleMFS from "./GroundVehicleMFS";
import GroundVehiclePLV from "./GroundVehiclePLV";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { getAuthToken, getVehicleDetails } from "../../service/api";

export default function VINSearch(props) {
  const placeholder = "Enter last 6 digits of VIN";
  const [token, setToken] = useState("");
  const [vehicleResponse, setVehicleResponse] = useState({});
  const [validSearch, setValidSearch] = useState(false);
  const [reasonForReturn, setreasonForReturn] = useState(
    "Ground_Vehicle_for_MFS"
  );
  const [suggestions, setSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState();
  let searchSuggestions = [
    "12345678901234567",
    "12345678901234566",
    "12345678901234568",
    "12345678901234569",
    "12345678901234560",
  ];

  useEffect(() => {
    let tokenResponse = getAuthToken();
    setToken(tokenResponse.data?.access_token);
  });
  async function getVehDetails(value) {
    let apiResponse = await getVehicleDetails(token, value);
    setVehicleResponse(apiResponse.data);
    if (apiResponse.data.vehicleInfo?.length > 0) {
      setValidSearch(true);
      setSuggestions(false);
    } else {
      setValidSearch(false);
      setSuggestions(true);
    }
  }

  const showResults = (e) => {
    setSearchValue(e?.target?.value);

    let value = e?.target?.value;
    console.log(value);
    getVehDetails(value);

    searchSuggestions = searchSuggestions.filter((val) => {
      return val.startsWith(value);
    });
    if (
      value?.length == 0 ||
      !searchSuggestions ||
      searchSuggestions?.length == 0 ||
      searchValue?.length == 0
    ) {
      setValidSearch(false);
      setSuggestions(false);
    } else if (searchSuggestions.length > 1) {
      setValidSearch(false);
      setSuggestions(true);
    } else {
      setValidSearch(true);
      setSuggestions(false);
    }
  };

  const setSearchData = (i) => {
    setSearchValue(searchSuggestions[i]);
    setValidSearch(false);
    setSuggestions(false);
  };
  const handleReasonChange = (e) => {
    console.log(e.target.value);
    setreasonForReturn(e.target.value);
  };

  return (
    <div className="form">
      <div className="grounding">
        <div className="searchLabelHeader">Vehicle Grounding</div>
        <div className="searchLabel">Begin Vehicle Lease return process</div>
        <Search
          showSearchRight={true}
          searchCompleted={validSearch}
          placeholder={placeholder}
          editSearchTerm={showResults}
          searchValue={searchValue}
        ></Search>
        {!validSearch && suggestions && (
          <div className="noMatchesFrame">
            <div className="noMatches">VIN not found/Inactive</div>
          </div>
        )}

        {validSearch && (
          <div>
            <div className="carRecordFound">
              <div className="vehicleMakeModel">
                <span>
                  {vehicleResponse?.vehicleInfo[0]?.brand}
                  {" & "}
                </span>
                <span>
                  {"  "}
                  {vehicleResponse?.vehicleInfo[0]?.model}
                  {" | "}{" "}
                </span>
                <span>
                  {"  "}
                  {vehicleResponse?.vehicleInfo[0]?.ext_color}{" "}
                </span>
              </div>
            </div>
            <div className="customerReturnStyle">
              <InputLabel htmlFor="input-with-icon-adornment">
                Customer Return date
              </InputLabel>
              <TextField
                id="date"
                type="date"
                defaultValue="00/00/0000"
                className="customerReturnDate"
                variant="outlined"
              />
            </div>

            <div className="customerReturnStyle">
              <InputLabel htmlFor="input-with-icon-adornment">
                Reason for Return
              </InputLabel>
              <Select
                name="Reason for Return"
                value={reasonForReturn}
                variant="outlined"
                inputProps={{ "aria-label": "age" }}
                className="customerReturnDate"
                onChange={(event) => handleReasonChange(event)}
              >
                <MenuItem value={"Purchase_Leased_Vehicle"}>
                  Purchase Leased Vehicle
                </MenuItem>
                <MenuItem value={"Ground_Vehicle_for_MFS"}>
                  Ground Vehicle for MFS
                </MenuItem>
                <MenuItem value={"Trade_In"}>Trade In</MenuItem>
              </Select>
            </div>
            {reasonForReturn === "Ground_Vehicle_for_MFS" && (
              <>
                {" "}
                <GroundVehicleMFS />
                <div className="odometerBox">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Odometer Reading
                  </InputLabel>
                  <TextField
                    id="standard-basic"
                    placeholder="Enter odometer reading"
                    variant="outlined"
                    className="odometer"
                  />
                  <TextField
                    id="standard-basic"
                    placeholder="Renter odometer reading"
                    variant="outlined"
                    className="odometer"
                  />
                </div>{" "}
                <div className="customerReturnStyle">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Do you have a signed odometer statement?
                  </InputLabel>
                  <Select
                    name="age"
                    value={1}
                    variant="outlined"
                    inputProps={{ "aria-label": "age" }}
                    className="customerReturnDate"
                  >
                    <MenuItem value={1}>Select Yes or No</MenuItem>
                    <MenuItem value={10}>Yes</MenuItem>
                    <MenuItem value={20}>No</MenuItem>
                  </Select>
                </div>
                <div className="keysReturnedBox">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Number of Keys Returned
                  </InputLabel>
                  <TextField
                    id="standard-basic"
                    placeholder="Master Keys Returned"
                    variant="outlined"
                    className="keysReturned"
                  />
                  <TextField
                    id="standard-basic"
                    placeholder="Valet Keys Returned"
                    variant="outlined"
                    className="keysReturned"
                  />
                </div>
                <div className="vehicleCondition">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Vehicle Condition
                  </InputLabel>
                  <div className="Rectangle-3">
                    <FormControlLabel control={<Radio />} label="Drivable" />
                  </div>
                  <div className="Rectangle-3">
                    {" "}
                    <FormControlLabel
                      control={<Radio />}
                      label="Not Drivable"
                    />
                  </div>
                </div>
                <div className="pickUpLocation">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Pick Up Location
                  </InputLabel>
                  <div className="pickUpLocationBox">
                    <FormControlLabel
                      control={<Radio />}
                      label="Location Name 1"
                    />
                  </div>

                  <div className="pickUpLocationBox">
                    <FormControlLabel
                      control={<Radio />}
                      label="Location Name 2"
                    />
                  </div>
                </div>{" "}
              </>
            )}

            {(reasonForReturn === "Purchase_Leased_Vehicle" ||
              reasonForReturn === "Trade_In") && (
              <>
                <GroundVehiclePLV />
                <div className="customerReturnStyle">
                  <InputLabel htmlFor="input-with-icon-adornment">
                    Do you have a signed odometer statement?
                  </InputLabel>
                  <Select
                    name="age"
                    value={1}
                    variant="outlined"
                    inputProps={{ "aria-label": "age" }}
                    className="customerReturnDate"
                  >
                    <MenuItem value={1}>Select Yes or No</MenuItem>
                    <MenuItem value={10}>Yes</MenuItem>
                    <MenuItem value={20}>No</MenuItem>
                  </Select>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
