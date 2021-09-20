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
let client_id='3MVG9_I_oWkIqLrmNgl8unCGrAPmcPODjDz6DA7QLw7qbd0CKBqVuyUVp_4.c4xZdRowJUxirUcXgiGiPYaQ.';
let rrm;
let AMP;



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
    AMP = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/GetManualPricingList'
    rrm='https://aspservices-internal-dev.tfs.toyota.com/asp-services/RRMApprovalList'
}
else if (hostname.includes('local')) {
    url = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey'
    groundListUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getGroundingList'
    tokenUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData'
    passedVehicleUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPassedVehicles'
    purchasedVehicleUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPurchasedVehicles'
    inspectionAccessoryDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionAccessoryDetails'
    inspectionWheelTiresDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails'
    inspectionVehicleDetails = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getVehicleInspectionDetails'
    getInspectionDamageDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionDamageDetails'
    getOEMBuildDetailsUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getOEMBuildDetails'
    getDealerActionUrl = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/DealerAction'
    getTokenSSO = `https://tfs-srm--sdeaug21.lightning.force.com/services/oauth2/authorize?
    client_id=3MVG9lJB4lV8F4Sgt2q5xweJxaNJkT.Eo7pP8V_v9BuuKeRPjY6GPmF9hylp7_oqSOMocQG1Kha4z125UwV8w&
    redirect_uri=https://asp-internal-dev.tfs.toyota.com&response_type=code`
    AMP = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/GetManualPricingList'
    rrm='https://aspservices-internal-dev.tfs.toyota.com/asp-services/RRMApprovalList'
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
    AMP = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/GetManualPricingList'
    rrm='https://aspservices-internal-stage.tfs.toyota.com/asp-services/RRMApprovalList'
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
    AMP = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/GetManualPricingList'
    rrm='https://aspservices-internal-test.tfs.toyota.com/asp-services/RRMApprovalList'
}
else if (hostname.includes('prod')) {
    url = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey'
    groundListUrl = 'https://aspservices-internal.tfs.toyota.com/asp-services/getGroundingList'
    tokenUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData'
    passedVehicleUrl = 'https://aspservices-internal.tfs.toyota.com/asp-services/getPassedVehicles'
    purchasedVehicleUrl = 'https://aspservices-internal.tfs.toyota.com/asp-services/getPurchasedVehicles'
    inspectionAccessoryDetailsUrl = 'https://aspservices-internal.tfs.toyota.com/asp-services/getInspectionAccessoryDetails'
    inspectionWheelTiresDetailsUrl = 'https://aspservices-internal.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails'
    inspectionVehicleDetails = 'https://aspservices-internal.tfs.toyota.com/asp-services/getVehicleInspectionDetails'
    getInspectionDamageDetailsUrl = 'https://aspservices-internal.tfs.toyota.com/asp-services/getInspectionDamageDetails'
    getOEMBuildDetailsUrl = 'https://aspservices-internal.tfs.toyota.com/asp-services/getOEMBuildDetails'
    getDealerActionUrl = 'https://aspservices-internal.tfs.toyota.com/asp-services/DealerAction'
    AMP = 'https://aspservices-internal.tfs.toyota.com/asp-services/GetManualPricingList'
    rrm='https://aspservices-internal.tfs.toyota.com/asp-services/RRMApprovalList'
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

    return await axios.post(inspectionWheelTiresDetailsUrl, inspectionId, options);

}
export async function getInspectionAccessoryDetails(vin) {
    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };


    return await axios.post(`${inspectionAccessoryDetailsUrl}?vin=${vin}`, options);
    

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


    return await axios.post(`${getInspectionDamageDetailsUrl}?inpsectionId=${inspectionId}&vin=${vin}`);
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
    const requestData={
        "Access-Control-Allow-Origin": "*",
    }
       
    return await axios.get(`https://stratus-stg3.mfindealerservices.com/services/oauth2/authorize?client_id=${client_id}&redirect_uri=https://asp-dev.mfindealerservices.com&response_type=code&scope=refresh_token`,requestData);

}
export async function getUserInfo(accessToken) {
       
    return await axios.post(`https://stratus-stg3.mfindealerservices.com/services/oauth2/userinfo?access_token=${accessToken}`);

}
export async function getAccessTokenEndpoint(code) {
    const requestData = {
        "code": code,
        "grant_type": "authorization_code",
        "client_id": "3MVG9_I_oWkIqLrmNgl8unCGrAPmcPODjDz6DA7QLw7qbd0CKBqVuyUVp_4.c4xZdRowJUxirUcXgiGiPYaQ.",
        "client_secret": "A8C495709B3F0BD5972D67EAF464949838E2F35EB623E514F75487A18904D70A",
        "redirect_uri":"https://asp-internal-dev.tfs.toyota.com",
        "format":"json",
    }
       
    return await axios.post(`https://stratus-stg3.mfindealerservices.com/services/oauth2/token`,requestData);

}
export async function awaitManualPricing() {
    const options = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    return await axios.post(AMP,options)
    };
    export async function RRMList() {
        const options = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        return await axios.post(rrm,options)
        };


