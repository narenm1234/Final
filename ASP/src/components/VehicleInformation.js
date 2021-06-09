import React, { useState } from 'react';
import Search from './Search/Search';


let styles = {
  container: {
    "width": "371px",
    "height": "270px",
    "margin": "8px 540px 16px",
    "padding": "14px 30px 16px 16px",
    "border-radius": "4px",
    "box-shadow": "0 2px 2px 0 rgba(0, 0, 0, 0.1)",
    "border": "solid 1px #dddbda",
    "background-color": "#ffffff",
  },

  VehicleMakeModel: {
    "width": "271px",
    "height": "24px",
    "margin": "0 69px 0 0",
    "font-family": "SalesforceSans",
    "font-size": "16px",
    "font-weight": "bold",
    "font-stretch": "normal",
    "font-style": "normal",
    "line-height": "1.5",
    "letter-spacing": "normal",
    "color": "#080707",
  },
  line: {
    "width": "350px",
    "height": "2px",
    "margin": "4px 2px 11px 2px",
    "background-color": "#000000",
  },

  label: {
    "width": "85px",
    "height": "18px",
    "margin": "8px 24px 4px 0",
    "font-family": "ToyotaType",
    "font-size": "12px",
    "font-weight": "600",
    "font-stretch": "normal",
    "font-style": "normal",
    "line-height": "1.5",
    "letter-spacing": "normal",
    "color": "#3e3e3c",
  },
  value: {
    "width": "85px",
    "height": "18px",
    "margin": "8px 24px 4px 0",
    "font-family": "ToyotaType",
    "font-size": "12px",
    "font-weight": "600",
    "font-style": "normal",
    "line-height": "1.5",
    "letter-spacing": "normal",
    "color": "#3e3e3c",
    "font-weight": "normal",
  },

  imagebox: {
    "width": "180px",
    "height": "160px",
    "margin": "0px 1px 2px 2px",
    "border-radius": "4px",
    "box-shadow": "0 2px 2px 0 rgba(0, 0, 0, 0.1)",
    "background-color": "#000000",
  },
  search: {
    "width": "371px",
    "height": "32px",
    "margin-top": "10px",
    "padding": " 0 0 0px",
    "border-radius": "4px",
    "border": "solid 1px #dddbda",
    "background-color": "#ffffff",
    "display": "flex",
    "flex-direction": "row",
  },
  noMatchesFrame: {
    "width": "371px",
    "height": "76px",
    "padding": "14px 30px 16px 16px",
    "border-radius": "4px",
    "box-shadow": "0 2px 2px 0 rgba(0, 0, 0, 0.1)",
    "border": "solid 1px #dddbda",
    "background-color": "#ffffff",
    "display": "block",
    "margin": "1% 0 0 40%",

  },
  noMatches: {
    "height": "18px",
    "font-size": "16px",
    "font-weight": "normal",
    "font-stretch": "normal",
    "font-style": "normal",
    "line-height": "1.5",
    "letter-spacing": "normal",
    "color": "#3e3e3c"
  },
  searchSuggestionFrame: {
    "width": "371px",
    "height": "200px",
    "margin": "8px 540px 16px",
    "padding": "14px 30px 16px 16px",
    "border-radius": "4px",
    "box-shadow": "0 2px 2px 0 rgba(0, 0, 0, 0.1)",
    "border": "solid 1px #dddbda",
  },
  searchSuggestion: {
    "width": "350px",
    "height": "35px",
    "background-color": "#ffffff",
  },
  searchLabel: {
    "height": "18px",
    "font-size": "16px",
    "font-weight": "normal",
    "font-stretch": "normal",
    "font-style": "normal",
    "line-height": "1.5",
    "letter-spacing": "normal",
    "color": "#3e3e3c",
  },
  imageContainer: {
    "width": "371px",
    "height": "160px",
    "margin": "48px 54px 16px",
    //"padding": "14px 30px 16px 16px",
    "border-radius": "4px",
    "box-shadow": "0 2px 2px 0 rgba(0, 0, 0, 0.1)",
    "border": "solid 1px #dddbda",
  },
  imageContainer1: {
    "display": "block",
    "margin-left": "40%",
  },
  alighnCenterItems: {
    background: '#f3f2f2',
    height: '100vh',
    width: "100%",
    right: "0px",
    border: "3px solid rgba(0, 0, 0, 0.1)",
  },
  centerSection: {
    marginTop: "12%",
  }

};
const VehicleInformation = (props) => {

  const searchBox = styles.search;
  const placeholder = 'Enter VIN';
  const [validSearch, setValidSearch] = useState(false);
  const [suggestions, setSuggestions] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const accountInformation = props.accountInformation;
  let searchSuggestions = ['12345678901234567', '12345678901234566', '12345678901234568', '12345678901234569', '12345678901234560'];

  // useEffect(() => {
  //      //need to filter search data based on the backend data
  //   });

  const showResults = (e) => {
    setSearchValue(e?.target?.value);
    let value = e?.target?.value;
    searchSuggestions = searchSuggestions.filter(val => {
      return val.startsWith(value);
    });
    if (value?.length == 0 || !searchSuggestions || searchSuggestions?.length == 0 || searchValue?.length == 0) {
      setValidSearch(false);
      setSuggestions(false);
    }
    else if (searchSuggestions.length > 1) {
      setValidSearch(false);
      setSuggestions(true);
    } else {
      setValidSearch(true);
      setSuggestions(false);
    }
  }

  const setSearchData = (i) => {
    setSearchValue(searchSuggestions[i]);
    setValidSearch(false);
    setSuggestions(false);
  }

  return (
    <div style={styles.alighnCenterItems}>
      <div style={styles.centerSection}>
        <img src='car.png' width="371px" height="160px" style={styles.imageContainer1}></img>
      </div>
      <div style={{ marginLeft: "40%" }}>
        <div style={styles.searchLabel}>Search Vehicles</div>
        <Search searchBox={searchBox} showSearchRight={true} searchCompleted={validSearch} placeholder={placeholder} editSearchTerm={showResults} searchValue={searchValue}></Search>

      </div>
      {validSearch && <div style={styles.container}>
        <div style={styles.VehicleMakeModel}> Vehicle Make & Model Name | Year  </div>
        <div style={styles.line}></div>
        <div style={{ "display": "flex", "flex-direction": "row" }}>
          <div>
            <div style={{ "display": "flex", "flex-direction": "row" }} >  <div style={styles.label}>Maturity Date </div> <div style={styles.value}> 00/00/0000 </div> </div>
            <div style={{ "display": "flex", "flex-direction": "row" }} >  <div style={styles.label}>Lease Type </div> <div style={styles.value}> Type Name</div> </div>
            <div style={{ "display": "flex", "flex-direction": "row" }} >  <div style={styles.label}>Lease Name </div> <div style={styles.value}> Lease Name </div> </div>
            <div style={{ "display": "flex", "flex-direction": "row" }} >  <div style={styles.label}>Acct Type </div> <div style={styles.value}> Type Name </div> </div>
            <div style={{ "display": "flex", "flex-direction": "row" }} >  <div style={styles.label}>Acct Number </div> <div style={styles.value}> 00000000 </div> </div>
            <div style={{ "display": "flex", "flex-direction": "row" }} >  <div style={styles.label}>Ream Payments </div> <div style={styles.value}> $000.00 </div> </div>
            <div style={{ "display": "flex", "flex-direction": "row" }} >  <div style={styles.label}>Color </div> <div style={styles.value}>  Color Name </div> </div>
          </div>

          <div style={styles.imagebox}>
            <img />
          </div>

        </div>

      </div>}
      {!validSearch && !suggestions && <div style={styles.noMatchesFrame}>
        <div style={styles.noMatches}>No Matches Available</div>
      </div>}
      {suggestions && <div style={styles.searchSuggestionFrame}>
        {searchSuggestions.map(function (name, index) {
          return <div style={styles.searchSuggestion} onClick={() => setSearchData(index)}>{name}</div>
        })}
      </div>}
    </div>
  )
}
export default VehicleInformation;