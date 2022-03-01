import React, { useState } from 'react'
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom'
import Login from './components/Login/Login'
import Header from './components/Header/Header'
import ProfilePage from './ProfilePage'
import './App.css'

//sort out profile page logged in or not
//block persist rerender?

function App() {
  const [username, setUsername] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [serverMessage, setServerMessage] = useState(false)
    return (
    <>
    <Router>
      <Header username={username} isLoggedIn={isLoggedIn} serverMessage={serverMessage}>
        <nav>
          <Link className='nav' to ='/'>Profile</Link>
          <Link className='nav' to="/login">Login</Link>
        </nav>
      </Header>
      <Switch>
        <Route exact path="/">
          <ProfilePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} username={username} serverMessage={serverMessage} setServerMessage={setServerMessage} />
        </Route>
        <Route path="/login">
          <Login setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} serverMessage={serverMessage} setServerMessage={setServerMessage} />
        </Route>
        <Route path="/signup">
        </Route>
      </Switch>
      </Router>
    </>
  );
}

export default App;
