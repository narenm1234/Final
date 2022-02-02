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
let AccessTokenURI;
let ForgeRockTokenURI;
let getGroundingDetailsURI;
let getVehicleSaleInfoURI;
let getNotesURI;
let insertNotesURI;
let getVehicleStatusHistoryURI;
let updateMileageURI;
let updatePricingHistoryURI;
let getCarfaxStatusURI;
let getPricingHistory;

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
  getNotesURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getNotes";
  insertNotesURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/insertNotes";
  getGroundingDetailsURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getGroundingDetails";
  getVehicleSaleInfoURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getVehicleSaleInfo";
  getVehicleStatusHistoryURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getVehicleStatusHistory";
  updateMileageURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/updateMileage";
  updatePricingHistoryURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/updatePricingHistory";
    getCarfaxStatusURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getCarfaxStatus";
    getPricingHistory = 
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPricingHistory";

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
  getGroundingDetailsURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getGroundingDetails";
  getVehicleSaleInfoURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getVehicleSaleInfo";
  getNotesURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getNotes";
  insertNotesURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/insertNotes";
  getVehicleStatusHistoryURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getVehicleStatusHistory";
  updateMileageURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/updateMileage";
  updatePricingHistoryURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/updatePricingHistory";
    getCarfaxStatusURI =
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getCarfaxStatus";
    getPricingHistory = 
    "https://aspservices-internal-dev.tfs.toyota.com/asp-services/getPricingHistory";
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
  AccessTokenURI =
    "https://stratus-stg3.mfindealerservices.com/services/oauth2/token";
  ForgeRockTokenURI =
    "https://stratus-stg3.mfindealerservices.com/services/apexrest/v1/stratusapi/getToken";
  getGroundingDetailsURI =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getGroundingDetails";
  getVehicleSaleInfoURI =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getVehicleSaleInfo";
  getNotesURI =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/asp-services/getNotes";
  insertNotesURI =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/insertNotes";
  getVehicleStatusHistoryURI =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getVehicleStatusHistory";
  updateMileageURI =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/updateMileage";
  updatePricingHistoryURI =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/updatePricingHistory";
    getCarfaxStatusURI =
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getCarfaxStatus";
    getPricingHistory = 
    "https://apigateway-stage.toyotafinancial.com/apigw-router/auctionsalesplatform/getPricingHistory";
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

  getGroundingDetailsURI =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getGroundingDetails";
  getVehicleSaleInfoURI =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getVehicleSaleInfo";
  getNotesURI =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getNotes";
  insertNotesURI =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/insertNotes";
  getVehicleStatusHistoryURI =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getVehicleStatusHistory";
  updateMileageURI =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/updateMileage";
  updatePricingHistoryURI =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/updatePricingHistory";
    getCarfaxStatusURI =
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getCarfaxStatus";
    getPricingHistory = 
    "https://aspservices-internal-test.tfs.toyota.com/asp-services/getPricingHistory";
} else {
  transportDetails =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getTransportationDetails";
  mileageDiscList =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getMileageDiscList";
  url =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/getAccountDetailsBykey";
  groundListUrl =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getGroundingList";
  tokenUrl =
    "http://internal-a3e2a8608d24e4c5f8b42aed9c3587d7-2044184104.us-east-1.elb.amazonaws.com/tokenData";
  passedVehicleUrl =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getPassedVehicles";
  purchasedVehicleUrl =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getPurchasedVehicles";
  inspectionAccessoryDetailsUrl =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getAccessoryDetails";
  inspectionWheelTiresDetailsUrl =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getInspectionWheelTiresDetails";
  inspectionVehicleDetails =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getVehicleInspectionDetails";
  getInspectionDamageDetailsUrl =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getInspectionDamageDetails";
  getOEMBuildDetailsUrl =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getOEMBuildDetails";
  getDealerActionUrl =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/DealerAction";
  AMP =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/GetManualPricingList";
  rrm =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/RRMApprovalList";
  MileageDiscList =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getMileageDiscList";
  getImages =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getImage";
  getDealerPayments =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/dealerpayment/paymentmethod";
  getPurchaseDetailsApi =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getPurchaseDetails";
  redirectURL = "https://asp.mfindealerservices.com/login2";
  dealerDrop =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getAllDealerDetails";
  submitPayment =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/dealerpayment/submitPayment";
  dealerVehicleCount =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getDealerVehicleCount";
  // clientID="3MVG9Eroh42Z9.iX.MtFAU7OREmQl3nLs7Kmfi9V1URQvsFxFqb46_Srme9DxYCu._LPDbUufv8__VWp.AXRV";
  // clientSecret="A604297A76C82F37CBDE9AAE30475D00A62B349BAE1E0FCAA4E4D17F198C8FA9";
  clientID =
    "3MVG9szVa2RxsqBZCdUNvurdG6kEyf6lT2Ubd5U8aHZuzgO6XcONTR2ZJYYB8ed5Fo4zhwDRDPirRcUc3kClf";
  clientSecret =
    "62883D8AFB8D34934F67CF9100E3CF33305F5A1F3C19A67D8165C39370478BCC";
  AccessTokenURI =
    "https://stratus.mfindealerservices.com/services/oauth2/token";
  ForgeRockTokenURI =
    "https://stratus.mfindealerservices.com/services/apexrest/v1/stratusapi/getToken";

  getGroundingDetailsURI =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getGroundingDetails";
  getVehicleSaleInfoURI =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getVehicleSaleInfo";
  getNotesURI =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getNotes";
  insertNotesURI =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/insertNotes";
  getVehicleStatusHistoryURI =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getVehicleStatusHistory";
  updateMileageURI =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/updateMileage";
  updatePricingHistoryURI =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/updatePricingHistory";
    getCarfaxStatusURI =
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getCarfaxStatus";
    getPricingHistory = 
    "https://apigateway.toyotafinancial.com/apigw-router/auctionsalesplatform/getPricingHistory";
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
export async function getPurchasedList(index) {
  let stringData = localStorage.getItem("dealerCode");
  let payload = stringData ? stringData : "ALL";
  var data = JSON.stringify([payload]);

  var config = {
    method: "post",
    url: `${purchasedVehicleUrl}?pageNumber=${index}`,
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
export async function postDealerActionPassOnVehicle(vin, groundId, dealerName) {
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
 
  var config = {
    method: "post",
    url: AMP,
    headers: headers,
  };
  return await axios(config);
}
export async function RRMList() {
  var config = {
    method: "post",
    url: rrm,
    headers: headers,
  };
  return await axios(config);
}
export async function getMileageDiscList() {
  var config = {
    method: "post",
    url: `${mileageDiscList}?vin=JM3KFACM0M0366307`,
    headers: headers,
  };
  return await axios(config);
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
    url: AccessTokenURI,
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
    url: AccessTokenURI,
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
    url: ForgeRockTokenURI,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("bearerToken")}`,
      Cookie: "CookieConsentPolicy=0:1; LSKey-c$CookieConsentPolicy=0:1",
    },
  };
  return await axios(config);
}

export async function getOktaUserInfo() {
var config = {
  method: 'get',
  url: 'https://tfs.oktapreview.com/oauth2/ausredslpqIsIjQfz0h7/v1/userinfo',
  headers: { 
    'Accept': 'application/json', 
    'Authorization':  `Bearer ${localStorage.getItem("okta_access_token")}`, 
    'Cookie': 'DT=DI04xgdsdpbT-6S2joEtp5Bdg'
  }
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
  let dealerPayment = "";
  dealerPayment = getDealerPayments + "?KintoId=null";
  if (!!localStorage.getItem("KintoID")) {
    dealerPayment =
      getDealerPayments + "?KintoId=" + localStorage.getItem("KintoID");
  }
  //getDealerPayments = getDealerPayments + "?KintoId=t002-51690";
  return await axios.get(dealerPayment, options);
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

export async function getGroundingDetailsByVin(vin) {
  var config = {
    method: "post",
    url: getGroundingDetailsURI,
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

export async function getVehicleSaleInfoByVin(vin) {
  var config = {
    method: "post",
    url: getVehicleSaleInfoURI + `?vin=${vin}`,
    headers: headers,
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

export async function getNotes(vin) {
  var config = {
    method: "post",
    url: getNotesURI + "?vin=" + vin,
    headers: headers,
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

export async function insertNotes({ vin, notes }) {
  var config = {
    method: "post",
    url: insertNotesURI + `?notes=${notes}&vin=${vin}`,
    headers: headers,
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

export async function getVehicalStatusHistory(vin) {
  var config = {
    method: "post",
    url: getVehicleStatusHistoryURI + `?vin=${vin}`,
    headers: headers,
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


var updateMileageType = {
  adjustedBy: "",
  dealerName: "",
  groundingMileage: null,
  reasonForUpdate: "",
  vin: "",
};
export async function updateMileage(body) {
  var config = {
    method: "post",
    url: updateMileageURI,
    headers: headers,
    data: body,
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
// http://localhost:8083/asp-services/updatePricingHistory?
// priceMethod=Manual&providerName=Test%20User&vehicle_price=27000&vin=JM3KFBCM6M0494704
export async function updatePricingHistory({
  priceMethod,
  providerName,
  vehicle_price,
  MMR,
  vin,
}) {
  var config = {
    method: "post",
    url:
      updatePricingHistoryURI +
      `?priceMethod=${priceMethod}&providerName=${providerName}&mmr_price=${MMR}&vehicle_price=${vehicle_price}&vin=${vin}`,
    headers: headers,
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


export async function getClearfaxStatusByVin(vin) {
  var config = {
    method: "get",
    url: getCarfaxStatusURI + `?vin=${vin}`,
    headers: headers,
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

export async function getPricingHistoryByVin(vin) {
  var config = {
    method: "post",
    url: getPricingHistory + `?vin=${vin}`,
    headers: headers,
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
