import React, { useState, useEffect } from "react";
import {
  getAccessTokenEndpoint,
  getForgeRockToken,
  getRefreshTokenEndpoint,
  getUserInfoToken,
} from "../service/api";
import jwt_decode from "jwt-decode";
import { ControlPointDuplicateOutlined } from "@material-ui/icons";

function Login2(props) {
  let data1 = getParameterByName("code");
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  const [token, setToken] = useState();
  const [Idtoken, setIdToken] = useState();
  const [dealerCode, setDealerCode] = useState("");

  useEffect(() => {
    getUserAccessInfoToken();
    getToken();
    
    // getUserAccessInfoToken();
  }, []);

  async function getToken() {
    localStorage.clear();
    let apiResponse = await getAccessTokenEndpoint(data1);
    console.log("--->", apiResponse);
    localStorage.setItem("bearerToken", apiResponse.data.access_token);
    localStorage.setItem("userToken", apiResponse.data.id_token);
    localStorage.setItem("refreshToken", apiResponse.data.refresh_token);
    let usertoken = localStorage.getItem("userToken");
    let userInfo = jwt_decode(usertoken);
    console.log(userInfo);

    setDealerCode(userInfo.custom_attributes.dealerCode);
    localStorage.setItem("dealerCode", userInfo.custom_attributes.dealerCode);
    localStorage.setItem("dealerName", userInfo.custom_attributes.dealerName);
    localStorage.setItem("KintoID", userInfo.custom_attributes.kintoId);
    localStorage.setItem("tenantID", userInfo.custom_attributes.tenantId);
    let resp = await getForgeRockToken();
    console.log("forgerock", resp);
    localStorage.setItem("ESGToken", resp.data.forgeRockToken);
    props.history.push("/grounded");
  }

 async function getUserAccessInfoToken() {
    setInterval(async () => {
      let apiResponse = await getRefreshTokenEndpoint();
      localStorage.setItem("bearerToken", apiResponse.data.access_token);
      // localStorage.setItem("refreshToken",apiResponse.data.refresh_token);
      let resp1 = await getForgeRockToken();
      localStorage.setItem("ESGToken", resp1.data.forgeRockToken);
    }, 120000);
  } 
  return <div></div>;
}

export default Login2;
