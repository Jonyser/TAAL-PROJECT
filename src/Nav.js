import React from 'react';
import { Link } from 'react-router-dom';
// import logo from './logo.jpeg';
function Nav() {
    return (
        <nav>
            <img src={logo} class="logo" alt="logo" />
            <ul className="nav-links">
                <Link to="/" className='link'>
                    <li>כניסה</li>
                </Link>
                <Link to="/about" className='link'>
                    <li>אודות</li>
                </Link>
                <Link to="/New_route" className='link'>
                    <li>הוספת מסלול</li>
                </Link>
            </ul>

        </nav>
    );
}

export default Nav;
//-------------------------------
