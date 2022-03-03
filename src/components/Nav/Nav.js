import React from 'react';
import { Link } from 'react-router-dom';
import { FcPlus, FcAbout, FcHome } from "react-icons/fc";
import './style.css';
import { FaUser } from "react-icons/fa";

const Nav = () => {
    return (
        <nav>
            <ul className="nav-links">
                <Link to="/" className='link'>
                    <li>כניסה <FcHome /></li>
                </Link>
                <Link to="/about" className='link'>
                    <li>אודות <FcAbout /></li>
                </Link>
                <Link to="/planner" className='link'>
                    <li>הוספת מסלול <FcPlus /></li>
                </Link>

            </ul>
            שרה ישראלי<br />
            משאבי אנוש

            {/* ---------------------------- */}
            <div className='user'>

                {/* ---------------------------- */}
                <FaUser className='UserIcon' />
            </div>

        </nav>
    );
}

export default Nav;
//----------------------------------------
