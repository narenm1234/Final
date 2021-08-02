import React,{useState} from 'react';
import AdminVehicleSearch from '../components/AdminVehicleSearch';
import Grid from '@material-ui/core/Grid';
import VehicleSearchTabs from '../components/Tabs';
import NotesSection from '../components/NotesSection';
const AdminHome = () => {
  const [searchText, setSearchText] = React.useState("");
  const [isSubmit,setisSubmit] = useState(false);

  const handleSubmitbtn = () =>{
    setisSubmit();
  }
  const handleSearch = (text) => {
    console.log("home",text)
    setSearchText(text)
  }

  return (
    (isSubmit) ? (<Grid container><Grid xs={10}><VehicleSearchTabs /></Grid><Grid xs={2}><NotesSection /></Grid></Grid>) : (<AdminVehicleSearch fromchildhandleSubmitbtn={handleSubmitbtn} searchdetails={(text) => handleSearch(text)} />)
  );
};

export default AdminHome;
