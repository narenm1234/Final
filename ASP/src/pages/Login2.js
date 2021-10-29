import React,{ useState, useEffect } from 'react'
import { getAccessTokenEndpoint, getUserInfoToken } from '../service/api';






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
  const [dealerCode, setDealerCode] = useState('');
  useEffect(() => {
    getToken();
    // getUserAccessInfoToken();
  }, {});
  useEffect(() => {
    getUserAccessInfoToken();
  }, [token]);
  async function getToken() {
    let apiResponse = await getAccessTokenEndpoint(data1);
    console.log("--->",apiResponse)
    setToken(apiResponse?.data.access_token);
  }
  async function getUserAccessInfoToken(){
  let resp = await getUserInfoToken(token);
  setDealerCode(resp.data.custom_attributes.dealerCode);
  localStorage.setItem("dealerCode",resp.data.custom_attributes.dealerCode);
  localStorage.setItem("dealerName",resp.data.custom_attributes.dealerName);
  localStorage.setItem("KintoID",resp.data.custom_attributes.kintoId);
  props.history.push('/grounded')

  console.log(dealerCode);
  }
    return (
        <div>
           
        </div>
    )
}

export default Login2
