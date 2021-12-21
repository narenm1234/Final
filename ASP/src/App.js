import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
// import OktaApp from './OktaApp';
import React, { useState } from "react";
import Home from "./pages/Home";
import GroundPending from "./pages/GroundPending/GroundPending";
import GroundPending1 from "./pages/GroundPending/GroundPending1";
import GroundPending2 from "./pages/GroundPending/GroundPending2";
import { Grounded, Grounded1, LastChance, Purchased } from "./pages/Grounded";
import "../src/assets/WebFont/ToyotaType-Book.ttf";
import "../src/sass/main.scss";
import VINSearch from "./pages/GroundPending/VINSearch";
import ConditionReport from "./pages/ConditionReport";
import AdminHome from "./pages/AdminHome";
import ConditionReportRequests from "./pages/ConditionReportRequests";
import InventoryRequestsTabs from "./components/InventoryRequestsTabs";
import Login2 from "./pages/Login2";
import Login from "./components/Login";
function App() {
  const [stateUpdate, setStateUpdate] = useState(1);
  const [selectedDealersData, setSelectedDealersData] = useState([]);
  const oktaAuth = new OktaAuth({
    issuer: 'https://tfs.oktapreview.com/oauth2/ausredslpqIsIjQfz0h7',
    clientId: '0oa10kchmc4Hjj6gD0h8',
    redirectUri: 'https://asp-dev.mfindealerservices.com/login',
    restoreOriginalUri:'http://localhost:3000/login',

    onAuthRequired: onAuthRequired,
    pkce: false
});
  const fireEvents = () => {
    setStateUpdate(stateUpdate + 1);
  };
  const selectedDealers = (data) => {
    setSelectedDealersData(data);
  };

  return (
    <>
      <div>
      <Security oktaAuth={oktaAuth} restoreOriginalUri='http://localhost:3000'>
      {/* <OktaApp /> */}
        <Router>
          <Header selectedDealers={selectedDealers}></Header>
          <div>
            <Sidebar stateUpdate={stateUpdate}>
              <Switch>
                <SecureRoute
                  path="/"
                  exact
                  exact
                  render={(props) => (
                    <GroundPending {...props} fireEvents={fireEvents} />
                  )}
                />
                <SecureRoute
                  path="/home"
                  exact
                  render={(props) => <Home {...props} />}
                />
                <SecureRoute path="/adminSearch" exact component={AdminHome} />
                <SecureRoute path="/checkinvehicle" exact component={VINSearch} />
                <SecureRoute
                  path="/grounded"
                  exact
                  exact
                  render={(props) => (
                    <GroundPending
                      {...props}
                      fireEvents={fireEvents}
                      selectedDealersData={selectedDealersData}
                    />
                  )}
                />
                <SecureRoute
                  path="/passed"
                  exact
                  render={(props) => <GroundPending1 {...props} />}
                />
                <SecureRoute
                  path="/purchased"
                  exact
                  render={(props) => <GroundPending2 {...props} />}
                />
                <SecureRoute
                  path="/grounded/lastchance"
                  exact
                  component={LastChance}
                />

                <SecureRoute
                  path="/adminInventoryRequests"
                  exact
                  component={InventoryRequestsTabs}
                />
                <SecureRoute
                  path="/conditionreportRequests"
                  exact
                  render={(props) => <ConditionReportRequests {...props} />}
                />
                <SecureRoute
                  path="/conditionreport/:vin"
                  exact
                  render={(props) => <ConditionReport {...props} />}
                />
                <SecureRoute
                  path="/conditionreport"
                  exact
                  render={(props) => <ConditionReport {...props} />}
                />
                <Route
                  path="/login2"
                  exact
                  render={(props) => (
                    <Login2 {...props} fireEvents={fireEvents} />
                  )}
                />
                <Route
                  path="/login" exact render={(props)=> <Login />}/>
                <Header selectedDealers={selectedDealers}></Header>
              </Switch>
            </Sidebar>
          </div>
        </Router>
        </Security>
      </div>
      {/* <Router>
        <AppWithRouterAccess />
      </Router> */}
    </>
  );
}

export default App;
