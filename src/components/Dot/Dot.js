import React, { useState, useEffect, useRef } from 'react';
import { get } from "../../api/api";
import './style.css';
import { BsPencilFill } from "react-icons/bs";
import Stations from '../Stations/Stations'

const Dot = (props) => {
    // memo//משתנים,coolbake//pפונ

    return (
        <>
            {/* <span class="dot"></span>  */}

            <span className="dot" style={{ backgroundColor: props.color }}></span>


        </>
    );

}
export default Dot;

