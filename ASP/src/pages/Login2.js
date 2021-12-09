import React,{ useState, useEffect } from 'react'
import { getAccessTokenEndpoint, getForgeRockToken, getRefreshTokenEndpoint, getUserInfoToken } from '../service/api';
import jwt_decode from "jwt-decode";
import { ControlPointDuplicateOutlined } from '@material-ui/icons';






function Login2(props) {

  let data1 = getParameterByName("code");
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
  const [token, setToken] = useState();
  const [Idtoken, setIdToken] = useState();
  const [dealerCode, setDealerCode] = useState('');
  useEffect(() => {
    getToken();
    getUserAccessInfoToken();
    // getUserAccessInfoToken();
  }, {});
  
  async function getToken() {
    
    let apiResponse = await getAccessTokenEndpoint(data1);
    console.log("--->",apiResponse)
    localStorage.setItem("bearerToken",apiResponse.data.access_token);
    localStorage.setItem("userToken",apiResponse.data.id_token);
    localStorage.setItem("refreshToken",apiResponse.data.refresh_token);
    let usertoken=localStorage.getItem("userToken");  
    let userInfo = jwt_decode(usertoken);
    console.log(userInfo);
    
  setDealerCode(userInfo.custom_attributes.dealerCode);
  localStorage.setItem("dealerCode",userInfo.custom_attributes.dealerCode);
  localStorage.setItem("dealerName",userInfo.custom_attributes.dealerName);
  localStorage.setItem("KintoID",userInfo.custom_attributes.kintoId);
  localStorage.setItem("tenantID",userInfo.custom_attributes.tenantId);
  

    
  }
  var refresh2 = window.localStorage.getItem('refresh2');
console.log(refresh2);
if (refresh2===null){
    window.location.reload();
    window.localStorage.setItem('refresh2', "1");
}
  useEffect(() => {
   
  }, {});

  async function getUserAccessInfoToken(){
  let resp = await getForgeRockToken();
  console.log("forgerock", resp);
  localStorage.setItem("ForgeRockToken",resp.data.forgeRockToken);
  setInterval(async ()  =>{
    let apiResponse =  await getRefreshTokenEndpoint();
    localStorage.setItem("bearerToken",apiResponse.data.access_token);
    // localStorage.setItem("refreshToken",apiResponse.data.refresh_token);
    let resp1 =   await getForgeRockToken();
    localStorage.setItem("ForgeRockToken",resp1.data.forgeRockToken);
},120000)
var refresh1 = window.localStorage.getItem('refresh1');
console.log(refresh1);
if (refresh1===null){
    window.location.reload();
    window.localStorage.setItem('refresh1', "1");
}

  props.history.push('/grounded')

 
  }
    return (
        <div>
           
        </div>
    )
}

export default Login2
