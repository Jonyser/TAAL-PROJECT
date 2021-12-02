import React from 'react';
import './App.css';
import Nav from './Nav';
import About from './About';
import Shop from './Shop';
import {
  BrowserRouter as Router, Switch, Route, Link
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>

          <Route path="/about" component={About}></Route>

          <Route path="/shop" component={Shop}></Route>
          <Route path="/" exact component={Home}></Route>
        </Switch>
      </div>
    </Router>
  );
}
const Home = () => (
  <div className='hom'>
    <h1>Home page</h1>
  </div>
)
export default App;