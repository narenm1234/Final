import axios from 'axios'
// const DEV_BASE = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/';
// const TEST_BASE = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/';
// const PROD_BASE = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/';
// const STAGE_BASE = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/';
let url;
let groundListUrl;
let tokenUrl;
let passedVehicleUrl;
let purchasedVehicleUrl;
let inspectionAccessoryDetailsUrl;
let inspectionWheelTiresDetailsUrl;
let inspectionVehicleDetails;
let getInspectionDamageDetailsUrl;
let getOEMBuildDetailsUrl;
let getDealerActionUrl;
let getTokenSSO;



const hostname = window.location.hostname;
if (hostname.includes('dev')) {
    url = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getAccountDetailsBykey'
    groundListUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getGroundingList'
    tokenUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/tokenData'
    passedVehicleUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPassedVehicles'
    purchasedVehicleUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPurchasedVehicles'
    inspectionAccessoryDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionAccessoryDetails'
    inspectionWheelTiresDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails'
    inspectionVehicleDetails = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getVehicleInspectionDetails'
    getInspectionDamageDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionDamageDetails'
    getOEMBuildDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getOEMBuildDetails'
    getDealerActionUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/DealerAction'

}
else if (hostname.includes('local')) {
    url = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey'
    groundListUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getGroundingList'
    tokenUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData'
    passedVehicleUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPassedVehicles'
    purchasedVehicleUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPurchasedVehicles'
    inspectionAccessoryDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getAccessoryDetails'
    inspectionWheelTiresDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails'
    inspectionVehicleDetails = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getVehicleInspectionDetails'
    getInspectionDamageDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionDamageDetails'
    getOEMBuildDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getOEMBuildDetails'
    getDealerActionUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/DealerAction'
    getTokenSSO = `https://tfs-srm--sdeaug21.lightning.force.com/services/oauth2/authorize?
    client_id=3MVG9lJB4lV8F4Sgt2q5xweJxaNJkT.Eo7pP8V_v9BuuKeRPjY6GPmF9hylp7_oqSOMocQG1Kha4z125UwV8w&
    redirect_uri=https://asp-internal-dev.tfs.toyota.com&response_type=code`
}
else if (hostname.includes('stage')) {
    url = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey'
    groundListUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getGroundingList'
    tokenUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData'
    passedVehicleUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getPassedVehicles'
    purchasedVehicleUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getPurchasedVehicles'
    inspectionAccessoryDetailsUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getInspectionAccessoryDetails'
    inspectionWheelTiresDetailsUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails'
    inspectionVehicleDetails = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getVehicleInspectionDetails'
    getInspectionDamageDetailsUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getInspectionDamageDetails'
    getOEMBuildDetailsUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/getOEMBuildDetails'
    getDealerActionUrl = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/DealerAction'
}
else if (hostname.includes('test')) {
    url = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey'
    groundListUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getGroundingList'
    tokenUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData'
    passedVehicleUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getPassedVehicles'
    purchasedVehicleUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getPurchasedVehicles'
    inspectionAccessoryDetailsUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getInspectionAccessoryDetails'
    inspectionWheelTiresDetailsUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails'
    inspectionVehicleDetails = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getVehicleInspectionDetails'
    getInspectionDamageDetailsUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getInspectionDamageDetails'
    getOEMBuildDetailsUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/getOEMBuildDetails'
    getDealerActionUrl = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/DealerAction'
}
else if (hostname.includes('prod')) {
    url = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey'
    groundListUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getGroundingList'
    tokenUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData'
    passedVehicleUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getPassedVehicles'
    purchasedVehicleUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getPurchasedVehicles'
    inspectionAccessoryDetailsUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getInspectionAccessoryDetails'
    inspectionWheelTiresDetailsUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails'
    inspectionVehicleDetails = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getVehicleInspectionDetails'
    getInspectionDamageDetailsUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getInspectionDamageDetails'
    getOEMBuildDetailsUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/getOEMBuildDetails'
    getDealerActionUrl = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/DealerAction'
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
    const requestData = "ALL";

    return await axios.post(groundListUrl, requestData, options);

}
export async function getPassedList() {
    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };
    const requestData = "ALL";

    return await axios.post(passedVehicleUrl, requestData, options);

}
export async function getPassedList1() {
    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };
    const requestData = "ALL";

    return await axios.post(passedVehicleUrl, requestData, options);

}
export async function getPurchasedList(Data) {
    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };
    const requestData = Data;

    return await axios.post(purchasedVehicleUrl, requestData, options);

}
export async function getInspectionVehicleDetails(vin) {
    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };

    return await axios.post(`${inspectionVehicleDetails}?vin=${vin}`, options);

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

    return await axios.post(inspectionWheelTiresDetailsUrl, 14901584, options);

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

export async function getInspectionDamageDetailsApi(inspectionId, vin) {

    console.log("inspectionId", inspectionId)
    console.log("Vin", vin)

    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };


    return await axios.post(`${getInspectionDamageDetailsUrl}?inpsectionId=14901584&vin=JM3KFBDM0K1698372`);
}


export async function getOEMBuildDetailsApi(vin) {

    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };


    return await axios.post(`${getOEMBuildDetailsUrl}`, vin);
}

export async function postDealerActionPassOnVehicle(VINumber) {
    const options = {
        headers: {
            "Content-Type": "application/json"
        }


    };


    return await axios.post(`${getDealerActionUrl}?dealerAction=Pass&vin=${VINumber}`,  options);

}
export async function getAuthTokenSSO() {
    const options = {
        headers: {
            "content-type": 'application/x-www-form-urlencoded'

        }
       

    };
    return await axios.post(`https://tfs-srm--sdeaug21.lightning.force.com/services/oauth2/authorize?
    client_id=3MVG9lJB4lV8F4Sgt2q5xweJxaNJkT.Eo7pP8V_v9BuuKeRPjY6GPmF9hylp7_oqSOMocQG1Kha4z125UwV8w&
    redirect_uri=https://asp-internal-dev.tfs.toyota.com&response_type=code`,  options);

}

