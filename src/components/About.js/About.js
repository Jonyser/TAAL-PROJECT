import React, { useState, useEffect } from 'react';
import './style.css';
import Cards from '../Cards/Cards';
import ReactLoading from 'react-loading';


const About = () => {
    // const [, setName] = useState(null);// for TextView
    // const [, setLoading] = useState(false);
    const [done, setDone] = useState(undefined);

    useEffect(() => {
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/posts/1') //https://jsonplaceholder.typicode.com/guide/ api
                .then((response) => response.json())
                .then(() => {
                    setDone(true);
                });
        }, 2000);

    }, [])

    return (
        <>
            {!done ?
                <>
                    <h1 float={'right'}>loading</h1>
                    < ReactLoading className="loading" type={"bars"} color={"rgb(194, 219, 240)"} height={'10%'} width={'10%'} />
                </>
                :
                <>
                    <br></br>
                    <br></br>


                    <Cards />

                </>
            }
        </>


    );
}


export default About;

