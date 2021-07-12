import axios from 'axios'
const url = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey'
const groundListUrl = 'http://internal-a50e6ebab05f54b63bde1da01edfb6a9-814886826.us-east-1.elb.amazonaws.com/asp-services/getGroundingList'
const tokenUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData'
const passedVehicleUrl = 'http://internal-a50e6ebab05f54b63bde1da01edfb6a9-814886826.us-east-1.elb.amazonaws.com/asp-services/getPassedVehicles'
const purchasedVehicleUrl = 'http://internal-a50e6ebab05f54b63bde1da01edfb6a9-814886826.us-east-1.elb.amazonaws.com/asp-services/getPurchasedVehicles'
const inspectionAccessoryDetailsUrl = 'http://internal-a50e6ebab05f54b63bde1da01edfb6a9-814886826.us-east-1.elb.amazonaws.com/asp-services/getInspectionAccessoryDetails'
const inspectionWheelTiresDetailsUrl = 'http://internal-a50e6ebab05f54b63bde1da01edfb6a9-814886826.us-east-1.elb.amazonaws.com/asp-services/getInspectionWheelTiresDetails'
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
export async function getPurchasedList() {
    const options = {
        headers: {
            "Content-Type": "application/json"
             }
             
    };
    const requestData =  "ALL";

    return await axios.post(purchasedVehicleUrl,requestData , options);

}
export async function getInspectionVehicleDetails(VINumber) {
    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };

    return await axios.post(`http://internal-a50e6ebab05f54b63bde1da01edfb6a9-814886826.us-east-1.elb.amazonaws.com/asp-services/getVehicleInsectionDetails?vin=${VINumber}`,options);

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

    return await axios.post(inspectionWheelTiresDetailsUrl,inspectionId, options);

}
export async function getInspectionAccessoryDetails(inspectionId) {
    const options = {
        headers: {
            "Content-Type": "application/json"
        }

    };
    const requestData = {
        "LookupValue": inspectionId
    };

    return await axios.post(inspectionAccessoryDetailsUrl, requestData, options);

}


