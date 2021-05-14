import axios from 'axios'
const url = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey'
const groundListUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getGroundingList'
const tokenUrl = 'http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData'
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
    return await axios.post(groundListUrl,{} , options);

}