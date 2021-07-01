import React from 'react';
import AdminVehicleSearch from '../components/AdminVehicleSearch';
import AdminDetailedReport from './AdminDetailedReport';
const AdminHome = () => {
  const [searchText, setSearchText] = React.useState("");
  const handleSearch = (text) => {
    console.log(text)
    setSearchText(text)
  }

  return (
    (searchText.length > 8) ? (<AdminDetailedReport />) : (<AdminVehicleSearch searchdetails={(text) => handleSearch(text)} />)
  );
};

export default AdminHome;
