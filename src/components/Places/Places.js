import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import './style.css';
import { BsPencilFill } from "react-icons/bs";
import { FcAddDatabase } from "react-icons/fc";
import Stations from '../Stations/Stations'
import Dot from '../Dot/Dot'
import ReactLoading from 'react-loading';
import Modal_Places from '../Modal/Model_Places'

let places = [];
let onlyAllStation = [];
let stationArray = [];
let Places_and_their_stations = [];
let thisIdTask = 0;

const Places = () => {
    const [done, setDone] = useState(false);
    const [, setLoading] = useState(false);
    const [, setStateStation] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [, setThisIdTask] = useState(0)
    const [, setOnlyAllStation] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                getData();
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const getData = async () => {
        // taal.tech/wp-json/wp/v2/places
        ///s83.bfa.myftpupload.com/wp-json/wp/v2/places
        await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/', {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }

        }).then(res => {
            console.log("res: ", res)
            places = res.filter((item) => item.parent === 0)
            setOnlyAllStation(onlyAllStation = res.filter((item) => item.parent > 0))
            Places_and_their_stations = places.map((element) => {
                return {
                    parent: element,
                    related: res.filter((r) => r.parent === element.id)
                }
            })
        });
        setDone(true)
        // setData_Loaded(true)
    }
    const Display_The_Stations = (e) => {
        setThisIdTask(thisIdTask = e.id)
        if (stationArray.length > 0) {
            stationArray = [];
        }
        // console.log("val:", e);
        Places_and_their_stations.forEach(element => {
            if (element.parent.id === e.id) {
                element.related.forEach(rel => {
                    setStateStation({ data: stationArray.push(rel) });
                });
                // console.log("stationArray:", stationArray);
            }
        });
        setStateStation({ data: stationArray })
    }
    //----------------------------------------------------------------------
    return (
        <>
            {!done ? <>
                <h1 style={{ textAlign: "center" }}>Loading</h1>
                < ReactLoading type={"bars"} className='loading' color={"rgb(180, 175, 199)"} height={'10%'} width={'10%'} />
            </>
                :
                <>
                    {modalOpen && <Modal_Places setOpenModalPlaces={setModalOpen} />}
                    <div className='Cover_Places'>
                        <div className='TitlePlaces'><h3>אתרים</h3></div>
                        <div className='addPlaceCover'>
                            <button
                                className='AddPlace'
                                onClick={() => {
                                    setModalOpen(true);
                                }}>
                                <FcAddDatabase style={{
                                    width: "85px",
                                    height: "30px"
                                }} />
                                <h6>הוסף אתר</h6>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>
                        </div>
                        <div className='Places'>
                            {places.map((value, index) => {
                                return (
                                    <button
                                        className='Place'
                                        onClick={() => Display_The_Stations(value)}
                                        key={index}>{value.name}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <BsPencilFill />
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        <Dot color="rgb(161, 147, 229)" />
                                    </button>
                                )
                            })}

                        </div>
                    </div>
                    <Stations propsData={stationArray} idTask={thisIdTask} allStations={onlyAllStation} />
                </>
            }
        </>
    );
}
export default Places;