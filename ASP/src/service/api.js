import axios from 'axios'
// const DEV_BASE = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/';
// const TEST_BASE = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/';
// const PROD_BASE = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/';
// const STAGE_BASE = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/';
var url;
var groundListUrl;
var tokenUrl;
var passedVehicleUrl;
var purchasedVehicleUrl;
var inspectionAccessoryDetailsUrl;
var inspectionWheelTiresDetailsUrl;
var inspectionVehicleDetails;
var getInspectionDamageDetailsUrl;
var getOEMBuildDetailsUrl;



const hostname = window.location.hostname;
if(hostname.includes('dev' ))
{
url = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getAccountDetailsBykey'
groundListUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getGroundingList'
tokenUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/tokenData'
passedVehicleUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPassedVehicles'
purchasedVehicleUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPurchasedVehicles'
inspectionAccessoryDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionAccessoryDetails'
inspectionWheelTiresDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails'
inspectionVehicleDetails = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getVehicleInspectionDetails'
getInspectionDamageDetailsUrl='https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionDamageDetails'
getOEMBuildDetailsUrl='https://aspservices-internal-dev.tfs.toyota.com/asp-services/getOEMBuildDetails'
}
else if(hostname.includes('local' ))
{
url = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey'
groundListUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getGroundingList'
tokenUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData'
passedVehicleUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPassedVehicles'
purchasedVehicleUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPurchasedVehicles'
inspectionAccessoryDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getAccessoryDetails'
inspectionWheelTiresDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails'
inspectionVehicleDetails = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getVehicleInspectionDetails'
getInspectionDamageDetailsUrl='https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionDamageDetails'
getOEMBuildDetailsUrl='https://aspservices-internal-dev.tfs.toyota.com/asp-services/getOEMBuildDetails'
}
else if(hostname.includes('stage' ))
{
url = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey'
groundListUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getGroundingList'
tokenUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData'
passedVehicleUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getPassedVehicles'
purchasedVehicleUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getPurchasedVehicles'
inspectionAccessoryDetailsUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getInspectionAccessoryDetails'
inspectionWheelTiresDetailsUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails'
inspectionVehicleDetails = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getVehicleInspectionDetails'
}
else if(hostname.includes('test' ))
{
url = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey'
groundListUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getGroundingList'
tokenUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData'
passedVehicleUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getPassedVehicles'
purchasedVehicleUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getPurchasedVehicles'
inspectionAccessoryDetailsUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getInspectionAccessoryDetails'
inspectionWheelTiresDetailsUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails'
inspectionVehicleDetails = 'https://aspservices-internal-stage.test.tfs.toyota.com/asp-services/getVehicleInspectionDetails'
}
else
{
url = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey'
groundListUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getGroundingList'
tokenUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData'
passedVehicleUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getPassedVehicles'
purchasedVehicleUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getPurchasedVehicles'
inspectionAccessoryDetailsUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getInspectionAccessoryDetails'
inspectionWheelTiresDetailsUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails'
inspectionVehicleDetails = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getVehicleInspectionDetails'
}

export async function getAuthToken() {
    const options = {
        headers: {
            "content-type": 'application/x-www-form-urlencoded'

        }

    };
    const requestData = {
        "grant_type": "client_credentials",
        "client_id": "0oaxox9wq1633Vljm0h7",
        "client_secret": "SsRgC6iwc6KGxytMZdflK4cO7bxfBSw8LxTJbZVa",
    }

    return await axios.post(tokenUrl, requestData, options);
}

export async function getVehicleDetails(token, VINumber) {
    const options = {
        headers: {

            "Authorization": token

        }

    };
    const requestData = {
        "LookupKey": "FullVINOnly",
        //"LookupValue": "JM3KFBDM0K1698372"
        "LookupValue": VINumber
    };
    return await axios.post(url, requestData, options);

}

export async function getGroundingList() {
    const options = {
        headers: {
            "Content-Type": "application/json"
             }
             
    };
    const requestData =  "ALL";

    return await axios.post(groundListUrl,requestData , options);

}
export async function getPassedList() {
    const options = {
        headers: {
            "Content-Type": "application/json"
             }
             
    };
    const requestData =  "ALL";

    return await axios.post(passedVehicleUrl,requestData , options);

}
export async function getPassedList1() {
    const options = {
        headers: {
            "Content-Type": "application/json"
             }
             
    };
    const requestData =  "ALL";

    return await axios.post(passedVehicleUrl,requestData , options);

}
export async function getPurchasedList() {
    const options = {
        headers: {
            "Content-Type": "application/json"
             }
             
    };
    const requestData =  "ALL";

    return await axios.post(purchasedVehicleUrl,requestData , options);

}
export async function getInspectionVehicleDetails(vin) {
    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };

    return await axios.post(`${inspectionVehicleDetails}?vin=${vin}`,options);

}
export async function getInspectionWheelTiresDetails(inspectionId) {
    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };
    // const requestData = {
    //     // "inspectinId": inspectionId
    //     inspectionId
    // };

    return await axios.post(inspectionWheelTiresDetailsUrl,14901584, options);

}
export async function getInspectionAccessoryDetails(inspectionId) {
    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };
    

    return await axios.post(`${inspectionAccessoryDetailsUrl}?vin=JM3KFBDM0K1698372`, options);

}


//getInspectionDamageDetails

export async function getInspectionDamageDetailsApi(inspectionId,vin){

    console.log("inspectionId",inspectionId)
    console.log("Vin",vin)
    
    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };
    

    return await axios.post(`${getInspectionDamageDetailsUrl}?inpsectionId=14901584&vin=JM3KFBDM0K1698372`);
}


export async function getOEMBuildDetailsApi(){
    
    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };
    
    const vinData = 'JM3KFBDM0K1698372'

    return await axios.post(`${getOEMBuildDetailsUrl}`,vinData);
}


