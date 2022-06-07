import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FcPlus, FcCalculator } from "react-icons/fc";
import './style.css';
import { FaUser, FaAddressCard, FaRoute } from "react-icons/fa";
import { useState } from 'react';
import { baseUrl } from "../../config";

let flag_token = false

const Nav = () => {
    const [, login_token] = useState('')
    const [complete_name, setcomplete_name] = useState('')
    useEffect(() => {
        const url2 = `${baseUrl}/wp-json/wp/v2/users/me/`
        fetch(url2, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
                'Authorization': 'Bearer' + sessionStorage.jwt
            },
        })
            .then((response) => response.json())
            .then(function (user) {
                if (!flag_token) {
                    login_token(flag_token = true)
                    // console.log("user: ", user)
                    setcomplete_name(user.name)
                }
            });
    })
    return (
        <nav>
            <ul className="nav-links">
                <Link to="/student" className='link'>
                    <li>חניכים  <FaAddressCard style={{ fontSize: '24px' }} /></li>
                </Link>
                <Link to="/routes_cards" className='link'>
                    <li>מסלולים <FaRoute style={{ fontSize: '24px' }} /></li>
                </Link>

                <Link to="/Calculator" className='link'>
                    <li>פעולות נוספות <FcCalculator style={{ fontSize: '24px' }} /></li>
                </Link>
                <Link to="/planner" className='link'>
                    <li>הוספת מסלול <FcPlus style={{ fontSize: '24px' }} /></li>
                </Link>
            </ul>
            {complete_name}
            <div className='user'>
                <FaUser className='UserIcon' />
            </div>
        </nav>
    );
}
export default Nav;
//----------------------------------------
