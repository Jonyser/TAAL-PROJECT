import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from './components/Nav/Nav';
// import About from './components/About.js/About';
import Planner from './components/Planner/Planner';
import Profile from './components/Profile/Profile';
import Calc from './components/Calc/Calc';
import './App.css';
import Login from './components/Login/Login';
import { Provider } from 'react-redux';
import store from './redux/store';
import background from './Pictures/img8.jpg';
import Cards from './components/Cards/Cards'
// import CallState from "./components/CallState/CallState";


function App() {

  return (
    <>
    <div style={{
      backgroundColor: 'rgb(213, 221, 228)',
      overflow: "auto",
    }}>

      <Provider store={store}>
        <Router>
          <div>
          {sessionStorage.logged_in == 1 ?  <><Nav /></>:null}
            <Switch>
              {/* <CallState /> */}
              <Route path="/" exact component={Home}></Route>
              <Route path="/planner" component={Planner}></Route>
              <Route path="/profile" component={Profile}></Route>
              <Route path="/calc" component={Calc}></Route>
              <Route path="/routes_cards" component={Cards}></Route>

              {/* <Route path="/about" component={About}></Route> */}
            </Switch>
          </div>
        </Router>
      </Provider>
    </div >

    </>
  );
}

const Home = () => (

  <Login />

)
export default App;