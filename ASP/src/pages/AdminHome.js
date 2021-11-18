import React,{useState,useEffect} from 'react';
import AdminVehicleSearch from '../components/AdminVehicleSearch';
import Grid from '@material-ui/core/Grid';
import VehicleSearchTabs from '../components/Tabs';
import NotesSection from '../components/NotesSection';
import {getInspectionVehicleDetails} from '../service/api';
import UpdateMileagePricing from '../components/UpdateMileagePricing';


const AdminHome = (props) => {
  const [searchText, setSearchText] = React.useState("");
  const [isSubmit,setisSubmit] = useState(false);
  const [inspectiondata,setinspectiondata]=useState([]);
  const [hide,setHide]=useState(0)

  console.log("inspectiondata",inspectiondata)


  useEffect(() => {
    getConditionVehicleDetails()
  }, [searchText.length==15])

  async function getConditionVehicleDetails() {
    let apiResponse = await getInspectionVehicleDetails("JM3KFBDM0K1698372");
    console.log("getConditionVehicleDetailsresponse",apiResponse)
    setinspectiondata(apiResponse.data)
}

  const handleSubmitbtn = () =>{
    //setisSubmit(true);
  }
  const handleSearch = (text) => {
    console.log("home",text)
    setSearchText(text);
    if(text.length > 15){
      setisSubmit(true);
    }
    
    //openConditionScreen(text,"")
  }
  const hideShow = (value) => {
    setHide(value)
  };
  return (
    (isSubmit) ? (<Grid container><Grid xs={10}><VehicleSearchTabs inspectiondata={inspectiondata} searchText={searchText} hideShow={(hide)=> hideShow(hide)}/></Grid><Grid xs={2}>{(hide == 0)? <NotesSection /> : (hide == 2)? <UpdateMileagePricing/> :''}</Grid></Grid>) : (<AdminVehicleSearch fromchildhandleSubmitbtn={handleSubmitbtn} searchdetails={(text) => handleSearch(text)} />)
  );
};

export default AdminHome;