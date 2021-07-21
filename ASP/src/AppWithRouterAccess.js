import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header/Header';
import { Route, useHistory, Switch } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import OktaHome from './OktaHome';
import { oktaAuthConfig, oktaSignInConfig } from './apiconfig';
import Login from './components/Login';
import Protected from './components/Protected';
import GroundPending from './pages/GroundPending/GroundPending';
import GroundPending1 from './pages/GroundPending/GroundPending1';
import GroundPending2 from './pages/GroundPending/GroundPending2';
import '../src/assets/WebFont/ToyotaType-Book.ttf'
import '../src/sass/main.scss'
import VINSearch from './pages/GroundPending/VINSearch';
import ConditionReport from './pages/ConditionReport';
import AdminHome from './pages/AdminHome'
const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {
    const history = useHistory();

    const customAuthHandler = () => {
        history.push('/login');
    };

    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        history.replace(toRelativeUrl(originalUri, window.location.origin));
    };

    return (
        <Security
            oktaAuth={oktaAuth}
            onAuthRequired={customAuthHandler}
            restoreOriginalUri={restoreOriginalUri}
        >
            <Switch>
                <Route path='/' exact={true} component={OktaHome} />
                <SecureRoute path='/protected' component={Protected} />
                <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
                <Route path='/login/callback' component={LoginCallback} />
                <Route path='/login' exact component={Login} />
                <Route path='/adminSearch' exact component={AdminHome} />
                <Route path='/checkinvehicle' exact component={VINSearch} />
                <Route path='/grounded' exact exact render={
                    (props) => (<GroundPending {...props} />
                    )
                } />
                <Route path='/passed' exact component={GroundPending1} />
                <Route path='/purchased' exact component={GroundPending2} />
                <Route path='/conditionreport' exact render={
                    (props) => (<ConditionReport {...props} />
                    )
                } />
                <AppWithRouterAccess />
            </Switch>
        </Security>
    );
};
export default AppWithRouterAccess;
