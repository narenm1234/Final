import React, { useState, useEffect } from "react";
import { getOktaUserInfo } from "../service/api";

function Login3(props) {
    let data1 = getParameterByName1("id_token");
    let data2 = getParameterByName("access_token");
    function getParameterByName(name, url = window.location.href) {
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
      }
      function getParameterByName1(name, url = window.location.href) {
          name = name.replace(/[\[\]]/g, '\\$&');
          var regex = new RegExp('[#&]' + name + '(=([^&#]*)|&|#|$)'),
              results = regex.exec(url);
          if (!results) return null;
          if (!results[2]) return '';
          return decodeURIComponent(results[2].replace(/\+/g, ' '));
        }

  useEffect(() => {
    setToken();
  }, []);

  async function setToken() {
    localStorage.clear();
    localStorage.setItem("ESGToken",data1);
    localStorage.setItem("okta_access_token",data2);
    let apiResponse1 = await getOktaUserInfo();
    localStorage.setItem("dealerName",apiResponse1.data.name);
    props.history.push("/grounded");
   }


  return <div></div>;
}

export default Login3;
