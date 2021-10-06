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
  const [token, setToken] = useState([]);
  useEffect(() => {
    getToken();
    getUserAccessInfoToken();
  }, []);

  async function getToken() {
    let apiResponse = await getAccessTokenEndpoint(data);
    console.log("--->",apiResponse)
    setToken(apiResponse.data.access_token);
  }
  async function getUserAccessInfoToken(){
  let resp = await getUserInfoToken(token);
  }
    return (
        <div>
           <h1>login2</h1> 
        </div>
    )
}

export default Login2
