// import React, { useState } from 'react'
// import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom'
// import Login from "./Login"
// import Header from '../Header/Header'
// import ProfilePage from './ProfilePage'
// import './styleLogin.css'
// import { CgLogIn, CgProfile } from "react-icons/cg";
// //sort out profile page logged in or not
// //block persist rerender?

// function LoginApp() {
//   const [username, setUsername] = useState('')
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [serverMessage, setServerMessage] = useState(false)
//   return (
//     <>
//       <Router>
//         <Header username={username} isLoggedIn={isLoggedIn} serverMessage={serverMessage}>
//           <nav>
//             <Link className='nav' to='/'><CgProfile />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Profile</Link>
//             <Link className='nav' to="/login"><CgLogIn />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login</Link>
//           </nav>
//         </Header>
//         <Switch>
//           <Route exact path="/">
//             <ProfilePage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} username={username} serverMessage={serverMessage} setServerMessage={setServerMessage} />
//           </Route>
//           <Route path="/login">
//             <Login setUsername={setUsername} setIsLoggedIn={setIsLoggedIn} serverMessage={serverMessage} setServerMessage={setServerMessage} />
//           </Route>
//           <Route path="/signup">
//           </Route>
//         </Switch>
//       </Router>
//     </>
//   );
// }

// export default LoginApp;
