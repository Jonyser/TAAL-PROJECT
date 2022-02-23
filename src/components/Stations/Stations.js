import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import { BsPencilFill } from "react-icons/bs";
import './style.css';
import Tasks_comp from "../Tasks_comp/Tasks_comp";


let allTasks = [];
let tasks = [];
let taskArray = [];

const Stations = (props) => {
    const [statetask, setStateTask] = useState([]);
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
                if (element.places[i] == e.id) {
                    tasks.push(element)
                }
            }
        })
        setStateTask({ data: tasks })//Updating the state

        // tasks = allTasks.filter((item) => item.places[1] === e.id)

        // console.log("eeee.", e)
        console.log("tasks,", tasks)
    }
    return (
        <>
            {loading && (<div>Loading</div>)}
            {!loading && (
                <>
                    <div className='Cover'>
                        <div className='TitleStation'><h2>תחנות</h2></div>
                        <div className='StationColler'>

                            {props.propsData.map((value, index) => { return (<button className='Station' onClick={() => Display_The_Tasks(value)} key={index}>{value.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BsPencilFill /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>) })} <br></br>
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
