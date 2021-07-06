import React from 'react';
import AdminVehicleSearch from '../components/AdminVehicleSearch';
import Grid from '@material-ui/core/Grid';
import VehicleSearchTabs from '../components/Tabs';
import NotesSection from '../components/NotesSection';
const AdminHome = () => {
  const [searchText, setSearchText] = React.useState("");
  const handleSearch = (text) => {
    console.log(text)
    setSearchText(text)
  }

  return (
    (searchText.length > 8) ? (<Grid container><Grid xs={10}><VehicleSearchTabs /></Grid><Grid xs={2}><NotesSection /></Grid></Grid>) : (<AdminVehicleSearch searchdetails={(text) => handleSearch(text)} />)
  );
};

export default AdminHome;
