import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FcPlus, FcAbout, FcHome, FcBusinessman, FcCalculator } from "react-icons/fc";
import './style.css';
import { FaUser } from "react-icons/fa";
import { AiOutlineIdcard } from "react-icons/ai";
import { useState } from 'react';

let flag_token = false


const Nav = () => {

    const [, login_token] = useState('')
    const [complete_name,setcomplete_name] = useState('')
    const [role,setRole] = useState('')

    useEffect(()=>{

        const url2 = 'https://s83.bfa.myftpupload.com/wp-json/wp/v2/users/me'
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
                    console.log("user: ", user)
                    setcomplete_name(user.name)
                    // setRole(user.)
                }
            });
    })



    let url_post = `https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes`
        fetch(url_post, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,


            },
            body: JSON.stringify({
                title: 'Lorem ipsum',
                content: 'Lorem ipsum dolor sit amet.',
                acf: 
                    tasks: sess,
                status: 'publish'
            })
        }).then(function (response) {
            return response.json();
        }).then(function (post) {
            console.log(post);
        });


    return (
        <nav>
            <ul className="nav-links">
                {/* <Link to="/" className='link'>
                    <li>כניסה <FcHome /></li>
                </Link> */}
                <Link to="/about" className='link'>
                    <li>אודות <FcAbout /></li>
                </Link>
                <Link to="/routes_cards" className='link'>
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
             {complete_name}
             

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
