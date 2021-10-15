import axios from "axios";
let xmlFile = require("../assets/car.xml");

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
let client_id =
  "3MVG9_I_oWkIqLrmNgl8unCGrAPmcPODjDz6DA7QLw7qbd0CKBqVuyUVp_4.c4xZdRowJUxirUcXgiGiPYaQ.";
let rrm;
let AMP;
let MileageDiscList;

let getImages;

let getDealerPayments;

let getPurchaseDetailsApi;

// let code ='aPrxyoOWGvXqBxqwZTQG7bATs.5vkEP2UmwQ_Eeu7GT7g4TQrfoMjW6F_s7s__kGco4_nvPVrg==';
// let grant_type='authorization_code';
// let client_secret= 'A8C495709B3F0BD5972D67EAF464949838E2F35EB623E514F75487A18904D70A';
//  let  redirect_uri='http://localhost:3000/purchased'

const hostname = window.location.hostname;

if (hostname.includes("dev")) {
  url =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getAccountDetailsBykey";
  groundListUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getGroundingList";
  tokenUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/tokenData";
  passedVehicleUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPassedVehicles";
  purchasedVehicleUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPurchasedVehicles";
  inspectionAccessoryDetailsUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getAccessoryDetails";
  inspectionWheelTiresDetailsUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails";
  inspectionVehicleDetails =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getVehicleInspectionDetails";
  getInspectionDamageDetailsUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionDamageDetails";
  getOEMBuildDetailsUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getOEMBuildDetails";
  getDealerActionUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/DealerAction";
  AMP =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/GetManualPricingList";
  rrm =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/RRMApprovalList";
  MileageDiscList =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getMileageDiscList";
  getImages =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getImage";
  getDealerPayments =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/dealerpayment/paymentmethod";
  getPurchaseDetailsApi =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPurchaseDetails";
} else if (hostname.includes("local")) {
  url =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey";
  groundListUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getGroundingList";
  tokenUrl =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData";
  passedVehicleUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPassedVehicles";
  purchasedVehicleUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPurchasedVehicles";
  inspectionAccessoryDetailsUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getAccessoryDetails";
  inspectionWheelTiresDetailsUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails";
  inspectionVehicleDetails =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getVehicleInspectionDetails";
  getInspectionDamageDetailsUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getInspectionDamageDetails";
  getOEMBuildDetailsUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getOEMBuildDetails";
  getDealerActionUrl =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/DealerAction";
  getTokenSSO = `https://tfs-srm--sdeaug21.lightning.force.com/services/oauth2/authorize?
    client_id=3MVG9lJB4lV8F4Sgt2q5xweJxaNJkT.Eo7pP8V_v9BuuKeRPjY6GPmF9hylp7_oqSOMocQG1Kha4z125UwV8w&
    redirect_uri=https://asp-internal-dev.tfs.toyota.com&response_type=code`;
  AMP =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/GetManualPricingList";
  rrm =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/RRMApprovalList";
  MileageDiscList =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getMileageDiscList";
  getImages =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getImage";
  getDealerPayments =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/dealerpayment/paymentmethod";
  getPurchaseDetailsApi =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPurchaseDetails";
} else if (hostname.includes("stage")) {
  url =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey";
  groundListUrl =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/getGroundingList";
  tokenUrl =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData";
  passedVehicleUrl =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/getPassedVehicles";
  purchasedVehicleUrl =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/getPurchasedVehicles";
  inspectionAccessoryDetailsUrl =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/getAccessoryDetails";
  inspectionWheelTiresDetailsUrl =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails";
  inspectionVehicleDetails =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/getVehicleInspectionDetails";
  getInspectionDamageDetailsUrl =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/getInspectionDamageDetails";
  getOEMBuildDetailsUrl =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/getOEMBuildDetails";
  getDealerActionUrl =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/DealerAction";
  AMP =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/GetManualPricingList";
  rrm =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/RRMApprovalList";
  MileageDiscList =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/getMileageDiscList";
  getImages =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/getImage";
  getDealerPayments =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/dealerpayment/paymentmethod";
  getPurchaseDetailsApi =
    "https://aspservices-internal-stage.tfs.toyota.com/asp-services/getPurchaseDetails";
} else if (hostname.includes("test")) {
  url =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey";
  groundListUrl =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getGroundingList";
  tokenUrl =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData";
  passedVehicleUrl =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getPassedVehicles";
  purchasedVehicleUrl =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getPurchasedVehicles";
  inspectionAccessoryDetailsUrl =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getAccessoryDetails";
  inspectionWheelTiresDetailsUrl =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails";
  inspectionVehicleDetails =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getVehicleInspectionDetails";
  getInspectionDamageDetailsUrl =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getInspectionDamageDetails";
  getOEMBuildDetailsUrl =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getOEMBuildDetails";
  getDealerActionUrl =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/DealerAction";
  AMP =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/GetManualPricingList";
  rrm =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/RRMApprovalList";
  MileageDiscList =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getMileageDiscList";
  getImages =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getImage";
  getDealerPayments =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/dealerpayment/paymentmethod";
  getPurchaseDetailsApi =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getPurchaseDetails";
} else if (hostname.includes("prod")) {
  url =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey";
  groundListUrl =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getGroundingList";
  tokenUrl =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData";
  passedVehicleUrl =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getPassedVehicles";
  purchasedVehicleUrl =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getPurchasedVehicles";
  inspectionAccessoryDetailsUrl =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getAccessoryDetails";
  inspectionWheelTiresDetailsUrl =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getInspectionWheelTiresDetails";
  inspectionVehicleDetails =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getVehicleInspectionDetails";
  getInspectionDamageDetailsUrl =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getInspectionDamageDetails";
  getOEMBuildDetailsUrl =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getOEMBuildDetails";
  getDealerActionUrl =
    "https://aspservices-internal.tfs.toyota.com/asp-services/DealerAction";
  AMP =
    "https://aspservices-internal.tfs.toyota.com/asp-services/GetManualPricingList";
  rrm =
    "https://aspservices-internal.tfs.toyota.com/asp-services/RRMApprovalList";
  MileageDiscList =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getMileageDiscList";
  getImages =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getImage";
  getDealerPayments =
    "https://aspservices-internal.tfs.toyota.com/asp-services/dealerpayment/paymentmethod";
  getPurchaseDetailsApi =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getPurchaseDetails";
}

export async function getAuthToken() {
  const options = {
    headers: {
      "content-type": "application/x-www-form-urlencoded",
    },
  };
  const requestData = {
    grant_type: "client_credentials",
    client_id: "0oaxox9wq1633Vljm0h7",
    client_secret: "SsRgC6iwc6KGxytMZdflK4cO7bxfBSw8LxTJbZVa",
  };

  return await axios.post(tokenUrl, requestData, options);
}

export async function getVehicleDetails(token, VINumber) {
  const options = {
    headers: {
      Authorization: token,
    },
  };
  const requestData = {
    LookupKey: "FullVINOnly",
    //"LookupValue": "JM3KFBDM0K1698372"
    LookupValue: VINumber,
  };
  return await axios.post(url, requestData, options);
}
export async function getGroundingList() {
  let stringData = localStorage.getItem("dealerCode");
  let payload = stringData ? stringData : "ALL";
  var data = JSON.stringify([payload]);

  var config = {
    method: "post",
    url: groundListUrl,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
  // .then(function (response) {
  //   console.log(JSON.stringify(response.data));
  //   return response.data;
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
}

export async function getPassedList(data) {
  let stringData = localStorage.getItem("dealerCode");
  let payload = stringData ? stringData : "ALL";
  var data = JSON.stringify([payload]);

  var config = {
    method: "post",
    url: passedVehicleUrl,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
}

export async function getPassedList1() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const requestData = "ALL";

  return await axios.post(passedVehicleUrl, requestData, options);
}
export async function getPurchasedList(data) {
  let stringData = localStorage.getItem("dealerCode");
  let payload = stringData ? stringData : "ALL";
  var data = JSON.stringify([payload]);

  var config = {
    method: "post",
    url: purchasedVehicleUrl,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
    data: data,
  };

  return await axios(config);
}

export async function getInspectionVehicleDetails(vin) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios.post(`${inspectionVehicleDetails}?vin=${vin}`, options);
}
export async function getInspectionWheelTiresDetails(inspectionId) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios.post(
    inspectionWheelTiresDetailsUrl,
    inspectionId,
    options
  );
}
export async function getInspectionAccessoryDetails(vin) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios.post(
    `${inspectionAccessoryDetailsUrl}?vin=${vin}`,
    options
  );
}

//getInspectionDamageDetails

export async function getInspectionDamageDetailsApi(inspectionId, vin) {
  console.log("inspectionId", inspectionId);
  console.log("Vin", vin);

  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios.post(
    `${getInspectionDamageDetailsUrl}?inpsectionId=${inspectionId}&tenantId=t002&vin=${vin}`
  );
}

export async function getOEMBuildDetailsApi(vin) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios.post(`${getOEMBuildDetailsUrl}`, vin);
}

export async function postDealerActionPassOnVehicle(VINumber) {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  return await axios.post(
    `${getDealerActionUrl}?dealerAction=Pass&vin=${VINumber}`,
    options
  );
}
export async function getAuthTokenSSO() {
  const requestData = {
    "Access-Control-Allow-Origin": "*",
  };

  return await axios.get(
    `https://srmstg3-stratus2.cs194.force.com/services/oauth2/authorize?client_id=${client_id}&redirect_uri=https://asp-dev.mfindealerservices.com/purchased&response_type=code&scope=refresh_token`,
    requestData
  );
}
export async function getUserInfo(accessToken) {
  return await axios.post(
    `https://srmstg3-stratus2.cs194.force.com/services/oauth2/userinfo?access_token=${accessToken}`
  );
}
// export async function getAccessTokenEndpoint() {
//     const options = {
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//             "Content-type": "application/x-www-form-urlencoded",
//         }
//     }

//     return await axios.post(`https://tfs-srm--srmstg3.my.salesforce.com/services/oauth2/token?code=${code}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&grant_type=${grant_type}`,options);

export async function awaitManualPricing() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.post(AMP, options);
}
export async function RRMList() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.post(rrm, options);
}
export async function getMileageDiscList() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.post(
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getMileageDiscList?vin=JM3KFACM0M0366307",
    options
  );
  //return await axios.post(MileageDiscList, options);
}

//var querystring = require('querystring');
// export async function getAccessTokenEndpoint(code) {

//     const options = {
//         headers: {
//             "Access-Control-Allow-Origin": "*",
//             "content-type": 'application/x-www-form-urlencoded'
//         }
//     }

//     return await axios.post(`https://srmstg3-tfs-srm.cs194.force.com/stratus2/services/oauth2/token`,querystring.stringify({
//         "code": code,
//         "grant_type": "authorization_code",
//         "client_id": "3MVG9_I_oWkIqLrmNgl8unCGrAPmcPODjDz6DA7QLw7qbd0CKBqVuyUVp_4.c4xZdRowJUxirUcXgiGiPYaQ.",
//         "client_secret": "A8C495709B3F0BD5972D67EAF464949838E2F35EB623E514F75487A18904D70A",
//         "redirect_uri":"https://asp-dev.mfindealerservices.com/purchased",
//      }),options);

// }

//var axios = require('axios');
// module.exports = typeof self == 'object' ? self.FormData : window.FormData;

// var FormData = require('form-data');
// var data = new FormData();
// data.append('code', 'aPrxyoOWGvXqBxqwZTQG7bATs2Ckp_5Qy7bslY.WBV6GFmJQDg8gvg1uHZunOlYpobQYuTxDUQ==');
// data.append('grant_type', 'authorization_code');
// data.append('client_id', '3MVG9_I_oWkIqLrmNgl8unCGrAPmcPODjDz6DA7QLw7qbd0CKBqVuyUVp_4.c4xZdRowJUxirUcXgiGiPYaQ.');
// data.append('client_secret', 'A8C495709B3F0BD5972D67EAF464949838E2F35EB623E514F75487A18904D70A\n\n');
// data.append('redirect_uri', 'http://localhost:3000/purchased');
// const http = require('http');

// var config = {
//   method: 'post',
//   url: 'https://srmstg3-stratus2.cs194.force.com/services/oauth2/token',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     ...data.getHeaders()
//   },
//   data : data
// };

// export async function getAccessTokenEndpoint(code) {

//     axios(config)
// .then(function (response) {
//   console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
//   console.log(error);
// });

// }
// var FormData = require('form-data');
var qs = require("qs");
export async function getAccessTokenEndpoint(code) {
  var data = qs.stringify({
    grant_type: "authorization_code",
    client_id:
      "3MVG9_I_oWkIqLrmNgl8unCGrAPmcPODjDz6DA7QLw7qbd0CKBqVuyUVp_4.c4xZdRowJUxirUcXgiGiPYaQ.",
    code: code,
    client_secret:
      "A8C495709B3F0BD5972D67EAF464949838E2F35EB623E514F75487A18904D70A",
    redirect_uri: "https://asp-dev.mfindealerservices.com/login2",
    // redirect_uri: "http://localhost:3000/login2",
  });
  var config = {
    method: "post",
    url: "https://stratus-stg3.mfindealerservices.com/services/oauth2/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      //   Cookie:
      //     "BrowserId=LAkGcCGXEeyO6WviLU7-xw; CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1",
    },
    data: data,
  };

  return await axios(config);
}
export async function getUserInfoToken(token) {
  var qs = require("qs");
  var config = {
    method: "post",
    url: `https://stratus-stg3.mfindealerservices.com/services/oauth2/userinfo?access_token=${token}`,
  };

  return await axios(config);
}

export async function getImageData(obj) {
  // let data = {
  //   "inspectionId": 18495852,
  //   "paramForImage": "All",
  //   "tenantId": "t002"
  // };
  var config = {
    method: "post",
    url: getImages,
    headers: {
      "Content-Type": "application/json",
    },
    data: obj,
  };
  return await axios(config).then(
    (res) => {
      return res;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function getCarXml() {
  return await axios(xmlFile.default).then(
    (res) => {
      return res;
    },
    (err) => {
      console.log(err);
    }
  );
}

export async function getDealerPaymentsData() {
  const options = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  return await axios.get(getDealerPayments, options);
}

export async function getPurchaseDetails(vin) {
  // let data = {
  //   "inspectionId": 18495852,
  //   "paramForImage": "All",
  //   "tenantId": "t002"
  // };
  var config = {
    method: "post",
    url: getPurchaseDetailsApi,
    headers: {
      "Content-Type": "application/json",
    },
    data: vin,
  };
  return await axios(config).then(
    (res) => {
      return res;
    },
    (err) => {
      console.log(err);
    }
  );
}
export async function getTransportationDetails() {
var config = {
  method: 'post',
  url: 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/getTransportationDetails?vinList=JM3KFADM6L0797974&vinList=JM3KFBDM0K1698372',
  headers: { 
    'accept': 'application/json'
  }
};

return await axios(config);
}
