import React,{ useState, useEffect } from 'react'
import { getAccessTokenEndpoint, getUserInfoToken } from '../service/api';

let data = getParameterByName("code");
function getParameterByName(name, url = window.location.href) {
  name = name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}


function Login2() {
  useEffect(() => {
    getToken();
    getUserAccessInfoToken();
  }, []);
  async function getUserAccessInfoToken(){
    let resp = await getUserInfoToken();
  }
  async function getToken() {
    let apiResponse = await getAccessTokenEndpoint(data);
    console.log("--->",apiResponse)
  }
    return (
        <div>
           <h1>login2</h1> 
        </div>
    )
}

export default Login2
