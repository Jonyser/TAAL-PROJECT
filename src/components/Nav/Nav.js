import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Nav = () => {
    return (
        <nav>
            <ul className="nav-links">
                <Link to="/" className='link'>
                    <li>בית</li>
                </Link>
                <Link to="/about" className='link'>
                    <li>אודות</li>
                </Link>
                <Link to="/shop" className='link'>
                    <li>הוספת מסלול</li>
                </Link>
            </ul>

        </nav>
    );
}

export default Nav;
//----------------------------------------
