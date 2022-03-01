import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from './components/Nav/Nav';
import About from './components/About.js/About';
import Planner from './components/Planner/Planner';
import './App.css';
import LoginApp from './components/Login/LoginApp';

function App() {
  return (
    <>
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route path="/about" component={About}></Route>
            <Route path="/planner" component={Planner}></Route>
            <Route path="/" exact component={Home}></Route>
          </Switch>
        </div>
      </Router>
    </>
  );
}

const Home = () => (

  <LoginApp />

)
export default App;