import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import { BsPencilFill } from "react-icons/bs";
import './style.css';
import Tasks_comp from "../Tasks_comp/Tasks_comp";
import Dot from '../Dot/Dot'
// import $ from 'jquery'

let allTasks = [];
let tasks = [];

const Stations = (props) => {
    const [, setStateTask] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                getingData();
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);


    const getingData = async () => {

        //----------------------------------------------------------------------------------
        //https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/

        await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/tasks/', {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        })
            .then(res => {
                allTasks = res;
                console.log("temp:", allTasks)
            });
    }

    const Display_The_Tasks = (e) => {
        if (tasks.length > 0) {
            tasks = [];
        }
        // console.log("allTasks:", allTasks[0].places);
        allTasks.forEach(element => {
            // console.log("elllllll:", element)
            for (let i = 0; i < element.places.length; i++) {
                if (element.places[i] === e.id) {
                    tasks.push(element)
                }
            }
        })
        setStateTask({ data: tasks })//Updating the state

    }
    return (
        <>
            {loading && (<div>Loading</div>)}
            {!loading && (
                <>
                    <div className='Cover_Stations'>
                        <div className='TitleStation'><h2>תחנות</h2></div>
                        <div className='Stations'>
                            {
                                props.propsData.map((value, index) => {
                                    return (
                                        <button className='Station'
                                            onClick={() => Display_The_Tasks(value)}
                                            key={index}>
                                            {value.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <BsPencilFill /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <Dot color="#e29e62" />
                                        </button>
                                    )
                                })} <br></br>
                        </div>
                    </div>
                    <Tasks_comp propsDataTask={tasks} />
                </>

            )}
        </>
    );

}
export default Stations;
//----------------------------------------
