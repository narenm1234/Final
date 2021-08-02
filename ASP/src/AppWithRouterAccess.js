import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { Security, SecureRoute, LoginCallback, OktaContext } from '@okta/okta-react';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import OktaHome from './OktaHome';
import { oktaAuthConfig, oktaSignInConfig } from './apiconfig';
import Login from './components/Login';
import Home from './pages/Home';
import Protected from './components/Protected';
import GroundPending from './pages/GroundPending/GroundPending';
import GroundPending1 from './pages/GroundPending/GroundPending1';
import GroundPending2 from './pages/GroundPending/GroundPending2';
import '../src/assets/WebFont/ToyotaType-Book.ttf'
import '../src/sass/main.scss'
import VINSearch from './pages/GroundPending/VINSearch';
import ConditionReport from './pages/ConditionReport';
import AdminHome from './pages/AdminHome'
import InventoryRequestsTabs from './components/InventoryRequestsTabs';
import ConditionReportRequests from './pages/ConditionReportRequests';
const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {
    const history = useHistory();

    const customAuthHandler = () => {
        history.push('/login');
    };
    const [authParam, setAuthParam] = React.useState({})
    const restoreOriginalUri = async (_oktaAuth, originalUri) => {
        console.log("_oktaAuth ", _oktaAuth)
        console.log("originalUri ", originalUri)
        setAuthParam(_oktaAuth)
        //history.replace(toRelativeUrl(originalUri, window.location.origin));
    };

    return (
        // {<Security
        //     oktaAuth={oktaAuth}
        //     onAuthRequired={customAuthHandler}
        //     restoreOriginalUri={restoreOriginalUri}
        // >
        //     <Switch>
        //         <SecureRoute path='/home' exact component={Home} />
        //         <SecureRoute path='/' exact={true} component={OktaHome} />
        //         <SecureRoute path='/protected' component={Protected} />
        //         <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
        //         <Route path='/login/callback' component={LoginCallback} />
        //         <SecureRoute path='/adminSearch' exact component={AdminHome} />
        //         <SecureRoute path='/checkinvehicle' exact component={VINSearch} />
        //         <SecureRoute path='/grounded' exact exact render={
        //             (props) => (<GroundPending {...props} />
        //             )
        //         } />
        //         <SecureRoute path='/passed' exact component={GroundPending1} />
        //         <SecureRoute path='/purchased' exact component={GroundPending2} />
        //         <SecureRoute path='/conditionreport' exact render={
        //             (props) => (<ConditionReport {...props} />
        //             )
        //         } />
        //     </Switch>
        // </Security>}

        <>
            <div>

                {authParam.authStateManager && authParam.authStateManager._authState && authParam.authStateManager._authState.isAuthenticated ? <Header></Header> : ''}

                <Router>
                    <div>
                        {authParam.authStateManager && authParam.authStateManager._authState && authParam.authStateManager._authState.isAuthenticated ? <Sidebar /> : ''}

                        <Security
                            oktaAuth={oktaAuth}
                            onAuthRequired={customAuthHandler}
                            restoreOriginalUri={restoreOriginalUri}
                        >
                            <Switch>
                                <SecureRoute path='/home' exact component={Home} />
                                <SecureRoute path='/' exact={true} component={OktaHome} />
                                <SecureRoute path='/protected' component={Protected} />
                                <Route path='/login' render={() => <Login config={oktaSignInConfig} />} />
                                <Route path='/login/callback' component={LoginCallback} />
                                <SecureRoute path='/adminSearch' exact component={AdminHome} />
                                <SecureRoute path='/checkinvehicle' exact component={VINSearch} />
                                <SecureRoute path='/grounded' exact exact render={
                                    (props) => (<GroundPending {...props} />
                                    )
                                } />
                                <SecureRoute path='/adminInventoryRequests' exact render={
                                    (props) => (<InventoryRequestsTabs {...props} />
                                    )
                                } />
                                <SecureRoute path='/purchased' exact component={GroundPending2} />
                                <SecureRoute path='/conditionreport' exact render={
                                    (props) => (<ConditionReport {...props} />
                                    )
                                } />
                                <SecureRoute path='/conditionreportRequests' exact render={
                                    (props) => (<ConditionReportRequests {...props} />
                                    )
                                } />
                            </Switch>
                        </Security>
                    </div>
                </Router>
            </div>
        </>
    );
};
export default AppWithRouterAccess;
