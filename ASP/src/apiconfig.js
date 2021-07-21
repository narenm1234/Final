const oktaAuthConfig = {
    // Note: If your app is configured to use the Implicit flow
    // instead of the Authorization Code with Proof of Code Key Exchange (PKCE)
    // you will need to add `pkce: false`
    issuer: 'https://dev-61574451.okta.com/oauth2/default',
    clientId: '0oa1ack5z129JQd8T5d7',
    redirectUri: window.location.origin + '/login/callback',
};
//narenm1234
//okta@61574451
const oktaSignInConfig = {
    baseUrl: 'https://dev-61574451.okta.com',
    clientId: '0oa1ack5z129JQd8T5d7',
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