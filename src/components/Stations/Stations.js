import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import { BsPencilFill } from "react-icons/bs";
import { FcAddDatabase } from "react-icons/fc";
import './style.css';
import Tasks_comp from "../Tasks_comp/Tasks_comp";
import Dot from '../Dot/Dot'
import Modal_Stations from '../Modal/Modal_Stations'

let allTasks = [];
let tasks = [];

const Stations = (props) => {
    // console.log(" props.allStations:", props.allStations)
    // console.log(" props.idTask:", props.idTask)
    const [, setStateTask] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
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
        //'https://taal.tech/wp-json/wp/v2/tasks/'
        //https://s83.bfa.myftpupload.com/wp-json/wp/v2/tasks/
        await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/tasks/', {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        })
            .then(res => {
                allTasks = res;
                console.log("allTasks:", allTasks)
            });
    }
    const Display_The_Tasks = (e) => {
        if (tasks.length > 0) {
            tasks = [];
        }
        allTasks.forEach(element => {
            for (let i = 0; i < element.places.length; i++) {
                if (element.places[i] === e.id) {
                    tasks.push(element)
                }
            }
        })
        setStateTask({ data: tasks })//Updating the state
    }
    //----------------------------------------------------------
    return (
        <>
            {loading && (<div>Loading</div>)}
            {!loading && (
                <>
                    {modalOpen && <Modal_Stations setOpenModalPlaces={setModalOpen} idTasks={props.idTask} />}
                    <div className='Cover_Stations'>
                        <div className='TitleStation'><h3>תחנות</h3></div>
                        <div className='addStationCover'>
                            <button
                                className='AddStation'
                                onClick={() => {
                                    setModalOpen(true);
                                }}>
                                <FcAddDatabase style={{
                                    width: "85px",
                                    height: "30px"
                                }} />
                                <h6>הוסף תחנה</h6>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                        </div>
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
                                })}
                        </div>
                    </div>
                    <Tasks_comp propsDataTask={tasks} allStations={props.allStations} />
                </>
            )}
        </>
    );
}
export default Stations;
//----------------------------------------