import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from './components/Nav/Nav';
import About from './components/About.js/About';
import Planner from './components/Planner/Planner';
import './App.css';
import LoginApp from './components/Login/LoginApp';
import { Provider } from 'react-redux';
import store from './redux/store';
// import CallState from "./components/CallState/CallState";
function App() {
  return (

    <Provider store={store}>
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* <CallState /> */}
            <Route path="/planner" component={Planner}></Route>
            <Route path="/about" component={About}></Route>
            <Route path="/" exact component={Home}></Route>

          </Switch>
        </div>
      </Router>
    </Provider>

  );
}

const Home = () => (

  <LoginApp />

)
export default App;