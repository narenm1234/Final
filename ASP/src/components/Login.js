import React, {useEffect} from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react';
import jwt_decode from "jwt-decode";

const Login = ({ config }) => {

    const { oktaAuth, authState } = useOktaAuth();
    let data1 = getParameterByName1("id_token");
    let data2 = getParameterByName("access_token");
    localStorage.setItem("okta_id_token",data1);
    localStorage.setItem("okta_access_token",data2);
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
        getToken();
        // getUserAccessInfoToken();
      }, []);
      async function getToken(){
        let usertoken = localStorage.getItem("okta_id_token");
        console.log("tessst",usertoken)
        let userInfo = jwt_decode(usertoken);
        console.log("........======",userInfo);

      }
      

    const onSuccess = (tokens) => {
        oktaAuth.handleLoginRedirect(tokens);
    };

    const onError = (err) => {
        console.log('error logging in', err);
    };

    if (!authState) return null;

    return authState.isAuthenticated ?
        <Redirect to={{ pathname: '/adminSearch' }} /> : 
        // <OktaSignInWidget
        //     config={config}
        //     onSuccess={onSuccess}
        //     onError={onError} />;
        <Redirect to={{ pathname: 'https://tfs.oktapreview.com/login/default' }} />
};
export default Login;
