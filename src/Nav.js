import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
function Nav() {
    return (
        <nav>
            <h3>Logo</h3>
            <ul className="nav-links">
                <Link to="/" className='link'>
                    <li>Home</li>
                </Link>
                <Link to="/about" className='link'>
                    <li>About</li>
                </Link>
                <Link to="/shop" className='link'>
                    <li>Shop</li>
                </Link>
            </ul>

        </nav>
    );
}

export default Nav;