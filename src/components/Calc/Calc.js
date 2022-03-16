import React, { useState, useEffect } from 'react';
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink } from "react-icons/fc";
import ReactLoading from 'react-loading';
import Calculator from '../Calculator/Calculator'

const About = () => {
    // const [, setName] = useState(null);// for TextView
    // const [, setLoading] = useState(false);
    const [done, setDone] = useState(undefined);

    useEffect(() => {
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/posts/1') //https://jsonplaceholder.typicode.com/guide/ api
                .then((response) => response.json())
                .then((json) => {
                    setDone(true);
                });
        }, 2000);

    }, [])

    //-------------------input-------------------------

    return (
        <>
            {!done ?
                <>
                    <h1 float={'right'}>loading</h1>
                    < ReactLoading className="loading" type={"bars"} color={"rgb(194, 219, 240)"} height={'10%'} width={'10%'} />
                </>
                :
                <>
                    <div className="Actions">
                        <button className='AddRoute' > שייך מסלול לחניך  <FcLink className='icon' /></button>
                        <button className='AddRoute' > שכפל מסלול  <GrDuplicate className='icon' /></button>
                        <button className='AddRoute'> שמור מסלול  <FcOk className='icon' /> </button>
                    </div>
                    <br></br>
                    <br></br>
                    <Calculator />
                </>
            }
        </>


    );
}


export default About;

