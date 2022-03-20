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
import { useState } from "react";



function Reset_localStorage(){

  if(localStorage.getItem('logged_in') == 1){
    localStorage.removeItem('jwt')
    localStorage.removeItem('logged_in')
  } 
}
// window.onbeforeunload = function() {
//   localStorage.removeItem('jwt');
//   localStorage.removeItem('logged_in');
//   return '';
// };

function App() {

  return (
    <>
    <div style={{
      backgroundColor: 'rgba(37,47,57,.9)',
      overflow: "auto",
      height: 'auto', backgroundImage: `url(${background})`,

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