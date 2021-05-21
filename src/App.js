import './App.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header/Header';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import GroundPending from './pages/GroundPending/GroundPending';
import GroundPending1 from './pages/GroundPending/GroundPending1';
import GroundPending2 from './pages/GroundPending/GroundPending2';
import { Grounded, Grounded1, LastChance,  Purchased } from './pages/Grounded';
import '../src/assets/WebFont/ToyotaType-Book.ttf'
import '../src/sass/main.scss'
import VINSearch from './pages/GroundPending/VINSearch';
import GroundPassed from './pages/GroundPassed';
import GroundPurchased from './pages/GroundPurchased';
import CheckinVehicle from './pages/CheckinVehicle';

function App() {
  // useEffect(() => {
  //    const tokenResponse =await axiosConfig.getAuthToken();
  //    const token = tokenResponse.get("access_token");
  //    const accountResponse = await axiosConfig.getAccountDetails(token,  ["0000000277"]);
  // });
  return (
    <>
      <div>
        <Header></Header>
        <Router>
          <Sidebar />
          <Switch>

            <Route path='/home' exact component={Home} />
            {/* <Route path='/groundpending' exact component={VINSearch} /> */}
            {/* <Route path='/grounded' exact component={GroundPending} />
            <Route path='/passed' exact component={GroundPending1} />
            <Route path='/purchased' exact component={GroundPending2} />
            <Route path='/groundpending' exact component={GroundPending} />
            <Route path='/grounded' exact component={Grounded} /> */}
            <Route path='/checkinvehicle' exact component={VINSearch} />
            <Route path='/grounded' exact component={GroundPending} />
            <Route path='/passed' exact component={GroundPending1} />
            <Route path='/purchased' exact component={GroundPending2} />
            <Route path='/grounded/lastchance' exact component={LastChance} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
