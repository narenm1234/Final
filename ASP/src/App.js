import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import GroundPending from './pages/GroundPending/GroundPending';
import GroundPending1 from './pages/GroundPending/GroundPending1';
import GroundPending2 from './pages/GroundPending/GroundPending2';
import { Grounded, Grounded1, LastChance, Purchased } from './pages/Grounded';
import '../src/assets/WebFont/ToyotaType-Book.ttf'
import '../src/sass/main.scss'
import VINSearch from './pages/GroundPending/VINSearch';
import ConditionReport from './pages/ConditionReport';
import AdminHome from './pages/AdminHome'
import AppWithRouterAccess from './AppWithRouterAccess';
import InventoryRequestsTabs from './components/InventoryRequestsTabs';
function App() {

  return (
    <>
      <div>
        <Header></Header>
        <Router>
          <div>
            <Sidebar />

            <Switch>
               <Route path='/home' exact component={Home} />
              <Route path='/adminSearch' exact component={AdminHome} />
              <Route path='/checkinvehicle' exact component={VINSearch} />
              <Route path='/grounded' exact exact render={
                (props) => (<GroundPending {...props} />
                )
              } />
              <Route path='/passed' exact component={GroundPending1} />
              <Route path='/purchased' exact component={GroundPending2} />
              <Route path='/grounded/lastchance' exact component={LastChance} />
              <Route path='/conditionreport/:vin' exact render={
                (props) => (<ConditionReport {...props} />
                )
                }/>
                <Route path='/adminInventoryRequests' exact component={InventoryRequestsTabs} />
              
            </Switch>
          </div>
        </Router>
      </div>
      {/* <Router>
        <AppWithRouterAccess />
      </Router> */}

    </>
  );
}

export default App;
