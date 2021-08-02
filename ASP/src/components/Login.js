import React from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react';

const Login = ({ config }) => {
    const { oktaAuth, authState } = useOktaAuth();

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
