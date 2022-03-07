import './style.css';
import React, { useState, useEffect } from 'react';


let index = 0;
let tempCard = [];


const Card = (props) => {
    const [index, setIndex] = useState([])


    console.log("prop.myTitleprop.myTitle: ", props)


    // props.myTasks.map((value, index) => {
    //     console.log("value: ", value)




    // })
    const foo = () => {
        // props.myTasks.forEach(element => {
        //     return (element.post_title)
        // })
    }


    return (
        <>
            <div className="Card">
                {
                    props.myTitle
                }
                {foo()}

            </div>


        </>
    );

}
export default Card;

