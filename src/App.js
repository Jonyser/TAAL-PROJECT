import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from './components/Nav/Nav';
import About from './components/About.js/About';
import Shop from './components/Shop/Shop';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Nav className="navigtion" />
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