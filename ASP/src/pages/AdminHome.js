import React from 'react';
import Search from '../components/Search/Search';
import AdminVehicleSearch from '../components/AdminVehicleSearch';


let styles = {
  homesearch: {
    'width': '371px',
    'height': '32px',
    'margin': '3px 0 0',
    'padding': '7px 9px 8px 12px',
    'border-radius': '4px',
    'border': 'solid 1px #dddbda',
    'background-color': '#ffffff'

  },
}
const AdminHome = () => {
  return (
    <AdminVehicleSearch />
  );
};

export default AdminHome;
