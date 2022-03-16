import React, { useState, useEffect } from 'react';
import './style.css';
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink } from "react-icons/fc";
import Places from '../Places/Places';
// import $ from 'jquery';

const Planner = () => {
    const [, setName] = useState(null);// for TextView
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                jq();
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
            {loading && <div>Loading</div>}
            {!loading && (
                <>
                    <div className="Actions">
                        <button className='AddRoute' > שייך מסלול לחניך  <FcLink className='icon' /></button>
                        <button className='AddRoute' > שכפל מסלול  <GrDuplicate className='icon' /></button>
                        <button className='AddRoute'> שמור מסלול  <FcOk className='icon' /> </button>
                    </div>

                    <form id="IPU" className="w3-container">

                        <p id="titleIPU">:רשום את שם המסלול</p>

                        <p><input className="w3-input w3-hover-green" type="text"></input></p>

                    </form>



                    {/* <div className='textInput'>
                        
                        <input type="text" className="RouteName" onChange={getName}></input>
                    </div> */}

                    <div>


                        <Places />

                    </div>
                </>
            )}
        </>
    );
}
const jq = () => {
    // $(".TitleTasks").hide();
    // $(".TitleStation").hide();


}

export default Planner;
