import React, { useState, useEffect } from "react";
import AdminVehicleSearch from "../components/AdminVehicleSearch";
import Grid from "@material-ui/core/Grid";
import VehicleSearchTabs from "../components/Tabs";
import NotesSection from "../components/NotesSection";
import { getInspectionVehicleDetails } from "../service/api";
import UpdateMileagePricing from "../components/UpdateMileagePricing";

const AdminHome = (props) => {
  const [vin, setVin] = useState(props?.location?.state?.vin);
  const [inspectiondata, setinspectiondata] = useState(null);
  const [hide, setHide] = useState(0);

  useEffect(() => {
    getConditionVehicleDetails();
  }, [vin]);

  async function getConditionVehicleDetails() {
    let apiResponse = await getInspectionVehicleDetails(vin);
    console.log("getInspectionVehicleDetails==>", apiResponse);
    setinspectiondata(apiResponse.data);
  }

  const hideShow = (value) => {
    setHide(value);
  };

  return (
    <>
      <Grid container>
        <Grid xs={10}>
          {inspectiondata && (
            <VehicleSearchTabs
              inspectiondata={inspectiondata}
              vin={vin}
              hideShow={(hide) => {
                hideShow(hide);
              }}
            />
          )}
        </Grid>
        <Grid xs={2}>
          {hide == 0 ? (
            <NotesSection />
          ) : hide == 2 ? (
            <UpdateMileagePricing />
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AdminHome;
