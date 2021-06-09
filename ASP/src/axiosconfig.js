import axios from 'axios'

export const getAuthToken = () => {
    return axios.post('/tokenData');
}

export const getAccountDetails = (token, accountNumbers) => {
    const options = {
        "Authorization": token
    };
    const requestData = {
        "TenantContext": {
            "ConsumerSystemId": "AutoLL",
            "ClientId": "MAZDAUS",
            "ConsumerEnvironmentId": "UAT",
            "TenantId": "TFSMFIN"
        },
        "ActivityContext": {
            "UserId": "TFSWLI",
            "ActivityId": ""
        },
        "AccountNumbers": accountNumbers
    };
    return axios.post('/accountDetails', requestData, options);
}