import React, { useState, useEffect } from 'react';
import './style.css';
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink } from "react-icons/fc";
import Cards from '../Cards/Cards';
import $ from 'jquery';

const About = () => {
    const [, setName] = useState(null);// for TextView
    const [, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {

                // useWindowSize()
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    // const [jqry, setJqry] = useState(jq);

    //-------------------input-------------------------
    function getName(val) {
        setName(val.target.value)
        console.warn(val.target.value)
    }
    return (
        <>
            <div className="Actions">
                <button className='AddRoute' > שייך מסלול לחניך  <FcLink className='icon' /></button>
                <button className='AddRoute' > שכפל מסלול  <GrDuplicate className='icon' /></button>
                <button className='AddRoute'> שמור מסלול  <FcOk className='icon' /> </button>
            </div>


            <div className='textView'>
                <input type="text" className="RouteName" onChange={getName}></input>
            </div>

            <div>
                <br></br>
                <br></br>
                <br></br>

                <Cards />

            </div>
        </>


    );
}
const jq = () => {
    $(".TitleTasks").hide();
    $(".TitleStation").hide();
    console.log(document.body.style.zoom)

}

export default About;

