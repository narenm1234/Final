import "./App.css";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
// import OktaApp from './OktaApp';
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
  const history = useHistory();
  // let { path, url } = useRouteMatch();

  const onAuthRequired = () => {
      history.push('/login');
  };
  const [stateUpdate, setStateUpdate] = useState(1);
  const [selectedDealersData, setSelectedDealersData] = useState([]);
  const oktaAuth = new OktaAuth({
    issuer: 'https://tfs.oktapreview.com/oauth2/ausredslpqIsIjQfz0h7',
    // clientId: '0oazqm6unew4ySMR80h7',
    clientId:'0oa10kchmc4Hjj6gD0h8',
    redirectUri: 'https://asp-stage.mfindealerservices.com/grounded',
    // redirectUri: 'http://localhost:3000/grounded',
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
                <Route
                  path="/"
                  exact
                  exact
                  render={(props) => (
                    <GroundPending {...props} fireEvents={fireEvents} />
                  )}
                />
                <Route
                  path="/home"
                  exact
                  render={(props) => <Home {...props} />}
                />
                <Route path="/adminSearch" exact component={AdminHome} />
                <Route path="/checkinvehicle" exact component={VINSearch} />
                <Route
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
                <Route
                  path="/passed"
                  exact
                  render={(props) => <GroundPending1 {...props} />}
                />
                <Route
                  path="/purchased"
                  exact
                  render={(props) => <GroundPending2 {...props} />}
                />
                <Route
                  path="/grounded/lastchance"
                  exact
                  component={LastChance}
                />

                <Route
                  path="/adminInventoryRequests"
                  exact
                  component={InventoryRequestsTabs}
                />
                <Route
                  path="/conditionreportRequests"
                  exact
                  render={(props) => <ConditionReportRequests {...props} />}
                />
                <Route
                  path="/conditionreport/:vin"
                  exact
                  render={(props) => <ConditionReport {...props} />}
                />
                <Route
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
                <SecureRoute
                  path="/login" exact render={(props)=> <Login {...props} />}/>
                  {/* <Route
                  path="/login" exact render={(props)=> <Login />}/> */}
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
