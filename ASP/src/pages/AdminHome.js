import React, { useState, useEffect } from "react";
import AdminVehicleSearch from "../components/AdminVehicleSearch";
import Grid from "@material-ui/core/Grid";
import VehicleSearchTabs from "../components/Tabs";
import NotesSection from "../components/NotesSection";
import { getInspectionVehicleDetails, getGroundingDetailsByVin } from "../service/api";
import UpdateMileagePricing from "../components/UpdateMileagePricing";
import { Box } from "@material-ui/core";

const AdminHome = (props) => {
  const [vin, setVin] = useState(props?.location?.state?.vin);
  const [inspectiondata, setinspectiondata] = useState(null);
  const [hide, setHide] = useState(0);

  useEffect(() => {
    getGroundingDetailsDetails();
  }, [vin]);

  async function getGroundingDetailsDetails() { 
    let apiResponse = await getGroundingDetailsByVin(vin);
    console.log("getGroundingDetailsByVin==>", apiResponse);
    if(apiResponse && apiResponse.data && apiResponse.data.data){
      setinspectiondata(apiResponse.data.data);
    } 
  }
  // async function getConditionVehicleDetails() {
  //   let apiResponse = await getInspectionVehicleDetails(vin);
  //   console.log("getInspectionVehicleDetails==>", apiResponse);
  //   apiResponse && apiResponse.data && setinspectiondata(apiResponse.data);
  // }

  const hideShow = (value) => {
    console.log("value", value)
    setHide(value);
  };

  return (
    <>
      <Box display={"flex"} >
        <Box width={'100%'}>
          {inspectiondata && (
            <VehicleSearchTabs
              inspectiondata={inspectiondata}
              vin={vin}
              hideShow={(hide) => {
                hideShow(hide);
              }}
            />
          )}
        </Box>
        <Box position={'relative'}>
          {hide === 0 ? <NotesSection />: ""}
          {hide === 2 ? <UpdateMileagePricing />: ""}
        </Box>
      </Box>
    </>
  );
};

export default AdminHome;
