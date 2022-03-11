import React, { useState, useEffect } from 'react';
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink } from "react-icons/fc";
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
                .then((json) => {
                    setDone(true);
                });
        }, 2000);

    }, [])

    // const [jqry, setJqry] = useState(jq);

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

                    {/* <div className='cardsCover'> */}
                    {/* <form className='textView'>
                        <input type="text" className="textview" onChange={getName}></input>
                    </form> */}


                    <br></br>
                    <br></br>


                    {/* 
                        <button className='Calc' value="∪">∪</button>
                        <button className='Calc' value="∪">∩</button>
                        <button className='Calc' value="\">\</button> */}





                    {/* <table>
                            <tr>
                                <td> <input type="button" class="button symbol " value="∪" onclick="action('∪')"> </td>
                                <td> <input type="button" class="button symbol " value="∩" onclick="action('∩')"></td>
                                <td> <input type="button" class="button symbol " value="\" onclick="action('-')"> </td>
                                <td> <input type="button" class="button symbol " value="⨁" onclick="action('⨁')"> </td>
                                <td> <input type="button" class="button symbol " value="×" onclick="action('×')"> </td>
                                <td><input type="button" class="button groups empty " value="Ø" onclick="organ('Ø')"> </td>
                            </tr>
                        </table> */}
                    {/* 
                    <Cards /> */}


                    {/* </div> */}
                </>
            }
        </>


    );
}


export default About;

