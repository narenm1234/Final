const TEST_CLIENT_ID = '0oa10kbu8utGtVjgY0h8';
const STAGE_CLIENT_ID = 'your-stage-client-id';
const LOCALHOST_CLIENT_ID = '0oazqm6unew4ySMR80h7';
const PROD_CLIENT_ID = 'your-prod-client-id';
const DEV_CLIENT_ID = ' 0oa10kchmc4Hjj6gD0h8';

const ISSUER_URL = 'https://tfs.oktapreview.com/oauth2/ausredslpqIsIjQfz0h7';
const DEV_ISSUER_URL = 'https://tfs.oktapreview.com/oauth2/ausredslpqIsIjQfz0h7';
const TEST_ISSUER_URL = 'https://tfs.oktapreview.com/oauth2/ausredslpqIsIjQfz0h7';
const STAGE_ISSUER_URL = 'https://tfs.oktapreview.com/oauth2/ausredslpqIsIjQfz0h7';
const PROD_ISSUER_URL = 'https://tfs.oktapreview.com/oauth2/ausredslpqIsIjQfz0h7';

const hostname = window.location.hostname;

const getIssuerUrl = () => {

    if (hostname.includes('test'))
        return TEST_ISSUER_URL;
    else if (hostname.includes('stage'))
        return STAGE_ISSUER_URL;
    else if (hostname.includes('localhost'))
        return ISSUER_URL;
    else if (hostname.includes('dev'))
        return DEV_ISSUER_URL;
    else
        return PROD_ISSUER_URL;
}

const getClientId = () => {

    if (hostname.includes('test'))
        return TEST_CLIENT_ID;
    else if (hostname.includes('stage'))
        return STAGE_CLIENT_ID;
    else if (hostname.includes('localhost'))
        return LOCALHOST_CLIENT_ID;
    else if (hostname.includes('dev'))
        return DEV_CLIENT_ID;
    else
        return PROD_CLIENT_ID;
}


const oktaAuthConfig = {
    // Note: If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to add `pkce: false`
     issuer: getIssuerUrl(),
    //issuer: 'https://tfs.oktapreview.com/oauth2/ausredslpqIsIjQfz0h7',
     clientId: getClientId(),
    //clientId: ' 0oazqm6unew4ySMR80h7',
    redirectUri: window.location.origin + '/login/callback',
};
//narenm1234
//okta@61574451
const oktaSignInConfig = {
    baseUrl: 'https://tfs.oktapreview.com/login/default',
   // baseUrl:'https://dev-61574451.okta.com',
     clientId: '0oazqm6unew4ySMR80h7',
    //clientId: '0oa1ack5z129JQd8T5d7',
    redirectUri: window.location.origin + '/login/callback',
    authParams: {
        // If your app is configured to use the Implicit flow
        // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
        // you will need to uncomment the below line
        // pkce: false
    }
    // Additional documentation on config options can be found at https://github.com/okta/okta-signin-widget#basic-config-options
};

export { oktaAuthConfig, oktaSignInConfig };