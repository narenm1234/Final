import axios from "axios";
import getHeaders from "./headers";
let xmlFile = require("../assets/car.xml");

// const DEV_BASE = 'https://aspservices-internal-dev.tfs.toyota.com/asp-services/';
// const TEST_BASE = 'https://aspservices-internal-test.tfs.toyota.com/asp-services/';
// const PROD_BASE = 'https://aspservices-internal-prod.tfs.toyota.com/asp-services/';
// const STAGE_BASE = 'https://aspservices-internal-stage.tfs.toyota.com/asp-services/';
const headers = getHeaders();

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
let redirectURL;
let dealerDrop;
let submitPayment;
let dealerVehicleCount;
let mileageDiscList;
let transportDetails;
let clientID;
let clientSecret;

// let code ='aPrxyoOWGvXqBxqwZTQG7bATs.5vkEP2UmwQ_Eeu7GT7g4TQrfoMjW6F_s7s__kGco4_nvPVrg==';
// let grant_type='authorization_code';
// let client_secret= 'A8C495709B3F0BD5972D67EAF464949838E2F35EB623E514F75487A18904D70A';
//  let  redirect_uri='http://localhost:3000/purchased'

const hostname = window.location.hostname;

if (hostname.includes("dev")) {
  transportDetails =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getTransportationDetails";
  mileageDiscList =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getMileageDiscList";
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
  redirectURL = "https://asp-dev.mfindealerservices.com/login2";
  dealerDrop =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getAllDealerDetails";
  submitPayment =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/dealerpayment/submitPayment";
  dealerVehicleCount =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getDealerVehicleCount";
  clientID =
    "3MVG9_I_oWkIqLrmNgl8unCGrAPmcPODjDz6DA7QLw7qbd0CKBqVuyUVp_4.c4xZdRowJUxirUcXgiGiPYaQ.";
  clientSecret =
    "A8C495709B3F0BD5972D67EAF464949838E2F35EB623E514F75487A18904D70A";
} else if (hostname.includes("local")) {
  mileageDiscList =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getMileageDiscList";
  redirectURL = "http://localhost:3000/login2";
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
  redirectURL = "https://asp-dev.mfindealerservices.com/login2";
  dealerDrop =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getAllDealerDetails";
  submitPayment =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/dealerpayment/submitPayment";
  dealerVehicleCount =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getDealerVehicleCount";
  transportDetails =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getTransportationDetails";
} else if (hostname.includes("stage")) {
  transportDetails =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getTransportationDetails";
  mileageDiscList =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getMileageDiscList";
  url =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey";
  groundListUrl =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getGroundingList";
  tokenUrl =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData";
  passedVehicleUrl =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getPassedVehicles";
  purchasedVehicleUrl =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getPurchasedVehicles";
  inspectionAccessoryDetailsUrl =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getAccessoryDetails";
  inspectionWheelTiresDetailsUrl =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getInspectionWheelTiresDetails";
  inspectionVehicleDetails =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getVehicleInspectionDetails";
  getInspectionDamageDetailsUrl =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getInspectionDamageDetails";
  getOEMBuildDetailsUrl =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getOEMBuildDetails";
  getDealerActionUrl =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/DealerAction";
  AMP =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/GetManualPricingList";
  rrm =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/RRMApprovalList";
  MileageDiscList =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getMileageDiscList";
  getImages =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getImage";
  getDealerPayments =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/dealerpayment/paymentmethod";
  getPurchaseDetailsApi =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getPurchaseDetails";
  redirectURL = "https://asp-stage.mfindealerservices.com/login2";
  dealerDrop =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getAllDealerDetails";
  submitPayment =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/dealerpayment/submitPayment";
  dealerVehicleCount =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getDealerVehicleCount";
  // clientID="3MVG9Eroh42Z9.iX.MtFAU7OREmQl3nLs7Kmfi9V1URQvsFxFqb46_Srme9DxYCu._LPDbUufv8__VWp.AXRV";
  // clientSecret="A604297A76C82F37CBDE9AAE30475D00A62B349BAE1E0FCAA4E4D17F198C8FA9";
  clientID =
    "3MVG9_I_oWkIqLrmNgl8unCGrAPmcPODjDz6DA7QLw7qbd0CKBqVuyUVp_4.c4xZdRowJUxirUcXgiGiPYaQ.";
  clientSecret =
    "A8C495709B3F0BD5972D67EAF464949838E2F35EB623E514F75487A18904D70A";
} else if (hostname.includes("test")) {
  transportDetails =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getTransportationDetails";
  mileageDiscList =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getMileageDiscList";
  url =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey";
  groundListUrl =
    "https://apigateway-test.mfindealerservices.com/apigw-router/auctionsalesplatform/asp-services/getGroundingList";
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
  redirectURL = "https://asp-test.mfindealerservices.com/login2";
  dealerDrop =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getAllDealerDetails";
  submitPayment =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/dealerpayment/submitPayment";
  dealerVehicleCount =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getDealerVehicleCount";
} else {
  transportDetails =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getTransportationDetails";
  mileageDiscList =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getMileageDiscList";
  url =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey";
  groundListUrl =
    "https://apigateway-stage.toyotafinancial.com/web-apigw-router/auctionsalesplatform/asp-services/getGroundingList";
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
  redirectURL = "https://asp.mfindealerservices.com/login2";
  dealerDrop =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getAllDealerDetails";
  submitPayment =
    "https://aspservices-internal.tfs.toyota.com/asp-services/dealerpayment/submitPayment";
  dealerVehicleCount =
    "https://aspservices-internal.tfs.toyota.com/asp-services/getDealerVehicleCount";
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
  let token = localStorage.getItem("ForgeRockToken");
  let stringData = localStorage.getItem("dealerCode");
  let payload = stringData ? stringData : "ALL";
  var data = JSON.stringify([payload]);

  var config = {
    method: "post",
    url: groundListUrl,
    headers: headers,
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
    headers: headers,
    data: data,
  };

  return await axios(config);
}

export async function getPassedList1() {
  const options = {
    headers: headers,
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
    headers: headers,
    data: data,
  };

  return await axios(config);
}

export async function getInspectionVehicleDetails(vin) {
  var config = {
    method: "post",
    url: `${inspectionVehicleDetails}?vin=${vin}`,
    headers: headers,
  };
  return await axios(config);
}
export async function getInspectionWheelTiresDetails(inspectionId) {
  var data = JSON.stringify(inspectionId);

  var config = {
    method: "post",
    url: inspectionWheelTiresDetailsUrl,
    headers: headers,
    data: data,
  };
  return await axios(config);
}

export async function getInspectionAccessoryDetails(vin) {
  var config = {
    method: "post",
    url: `${inspectionAccessoryDetailsUrl}?vin=${vin}`,
    headers: headers,
  };
  return await axios(config);
}
export async function getInspectionDamageDetailsApi(inspectionId, vin) {
  let tenant = localStorage.getItem("tenantId")
    ? localStorage.getItem("tenantId")
    : "t002";

  var config = {
    method: "post",
    url: `${getInspectionDamageDetailsUrl}?inpsectionId=${inspectionId}&tenantId=${tenant}&vin=${vin}`,
    headers: headers,
  };
  return await axios(config);
}
export async function getOEMBuildDetailsApi(vin) {
  var data = vin;

  var config = {
    method: "post",
    url: getOEMBuildDetailsUrl,
    headers: headers,
    data: data,
  };
  return await axios(config);
}
export async function postDealerActionPassOnVehicle(vin, groundId) {
  var config = {
    method: "post",
    url: `${getDealerActionUrl}?dealerAction=Pass&groundingId=${groundId}&vin=${vin}`,
    headers: headers,
  };
  return await axios(config);
}
export async function postDealerActionPurchaseOnVehicle(vin, groundId) {
  var config = {
    method: "post",
    url: `${getDealerActionUrl}?dealerAction=Purchase&groundingId=${groundId}&vin=${vin}`,
    headers: headers,
  };
  return await axios(config);
}
export async function awaitManualPricing() {
  const options = {
    headers: headers,
  };
  return await axios.post(AMP, options);
}
export async function RRMList() {
  const options = {
    headers: headers,
  };
  return await axios.post(rrm, options);
}
export async function getMileageDiscList() {
  const options = {
    headers: headers,
  };
  return await axios.post(`${mileageDiscList}?vin=JM3KFACM0M0366307`, options);
  //return await axios.post(MileageDiscList, options);
}

var qs = require("qs");
export async function getAccessTokenEndpoint(code) {
  var data = qs.stringify({
    grant_type: "authorization_code",
    client_id: clientID,
    code: code,
    client_secret: clientSecret,
    redirect_uri: redirectURL,
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
export async function getRefreshTokenEndpoint() {
  var data = qs.stringify({
    grant_type: "refresh_token",
    client_id: clientID,
    refresh_token: localStorage.getItem("refreshToken"),
    client_secret: clientSecret,
    redirect_uri: redirectURL,
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
// export async function getUserInfoToken(token) {
//   var qs = require("qs");
//   var config = {
//     method: "post",
//     url: `https://stratus-stg3.mfindealerservices.com/services/oauth2/userinfo?access_token=${token}`,
//   };

//   return await axios(config);
// }
export async function getForgeRockToken() {
  var config = {
    method: "get",
    url: "https://stratus-stg3.mfindealerservices.com/services/apexrest/v1/stratusapi/getToken",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
      Cookie: "CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1",
    },
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
    headers: headers,
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
    headers: headers,
  };

  if (!!localStorage.getItem("KintoID")) {
    getDealerPayments =
      getDealerPayments + "?KintoId=" + localStorage.getItem("KintoID");
  }
  //getDealerPayments = getDealerPayments + "?KintoId=t002-51690";
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
    headers: headers,
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

export async function getTransportationDetails(vinlist) {
  var config = {
    method: "post",
    url: `${transportDetails}?` + vinlist,
    // vinList=JM3KFADM6L0797974&vinList=JM3KFBDM0K1698372'
    headers: headers,
  };

  return await axios(config);
}

export async function getDealerDropData() {
  var config = {
    method: "post",
    url: dealerDrop,
    headers: headers,
  };

  return await axios(config);
}

export async function onSubmitPayment(data) {
  var config = {
    method: "post",
    url: submitPayment,
    headers: headers,
    data: data,
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

export async function getDealerVehicleCount() {
  let stringData = localStorage.getItem("dealerCode");
  let payload = stringData ? stringData : "ALL";
  var data = JSON.stringify([payload]);

  var config = {
    method: "post",
    url: dealerVehicleCount,
    headers: headers,
    data: data,
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
