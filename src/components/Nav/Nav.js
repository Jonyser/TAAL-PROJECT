import React from 'react';
import { Link } from 'react-router-dom';
import { FcPlus, FcAbout, FcHome, FcBusinessman, FcCalculator } from "react-icons/fc";
import './style.css';
import { FaUser } from "react-icons/fa";
import { AiOutlineIdcard } from "react-icons/ai";


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
                <Link to="/about" className='link'>
                    <li>כרטיסיות <AiOutlineIdcard /></li>
                </Link>
                <Link to="/profile" className='link'>
                    <li>בניית פרופיל <FcBusinessman /></li>
                </Link>
                <Link to="/calc" className='link'>
                    <li>פעולות נוספות <FcCalculator /></li>
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
