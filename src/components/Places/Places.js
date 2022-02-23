import React, { useState, useEffect, useRef } from 'react';
import { get } from "../../api/api";
import './style.css';
import { BsPencilFill } from "react-icons/bs";
import Stations from '../Stations/Stations'

// import Select from 'react-select';

let places = [];
let to_add = "";
let counter = 0;
let stationArray = [];
let Places_and_their_stations = [];



const Places = () => {
    // memo//משתנים,coolbake//pפונ
    const [loading, setLoading] = useState(false);
    const [statePlaces, setStatePlaces] = useState([]);
    const [stateStation, setStateStation] = useState([]);
    const [text, setText] = useState("");
    const buttonRef = useRef(null);


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

    // useEffect(() => {
    //     buttonRef.current.click();
    // }, [stateStation]);

    const getData = async () => {

        //----------------------------------------------------------------------------------
        //https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/

        await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/', {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        }).then(res => {
            // console.log("res11111111111111111,", res)
            places = res.filter((item) => item.parent === 0)

            Places_and_their_stations = places.map((element) => {
                return {
                    parent: element,
                    related: res.filter((r) => r.parent === element.id)
                }
            })
            for (let i = 0; i < Places_and_their_stations.length; i++) {
                setStatePlaces(statePlaces => [...statePlaces, { value: Places_and_their_stations[i].parent.name, label: Places_and_their_stations[i].parent.name }])
            }
        });
    }

    const Display_The_Stations = (e) => {
        if (stationArray.length > 0) {
            stationArray = [];
        }
        // console.log("val:", e);

        //If we want the stations
        Places_and_their_stations.forEach(element => {

            if (element.parent.id === e.id) {

                element.related.forEach(rel => {


                    setStateStation({ data: stationArray.push(rel) });

                });
                // console.log("stationArray:", stationArray);
            }
        });
    }
    function funTest() {
        setText(text = "תחנות");
    }
    //----------------------------------------------------------------------
    // if (flag === true) {
    //     console.log("hi")
    //     return (<Stations name="Noa" />)
    // }
    return (
        <>
            {loading && (<div>Loading</div>)}
            {!loading && (
                <>

                    <div className='Cover'>
                        <div className='TitlePlaces'><h2>אתרים</h2></div>

                        <div className='Places'>
                            {/* {console.log("places:", places)} */}

                            {/* <Stations data={stateStation.data} /> */}
                            {places.map((value, index) => { return (<button className='place' onClick={() => Display_The_Stations(value)} key={index}>{value.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BsPencilFill /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>) })} <br></br>
                            {/* <Stations /> */}
                            {/* {console.log("stationArrayHTML:", stationArray)} */}

                        </div>
                        {/* <div className='testState'>
                            <button onClick={funTest}>Click</button>
                            <span>{count}</span>

                        </div> */}


                    </div>
                    <div className='Cover'>
                        <div className='TitleStation'><h2>תחנות</h2></div>

                        <Stations propsData={stationArray} />

                    </div>
                    {/* <div className='Cover2'>
                        <div className='TitleStation'><h2>תחנות</h2></div>
                        <div id='stations'></div>
                        <div id='tasks'></div>
                        {console.log("stateStation:", stateStation)}
                    </div> */}

                </>
            )}
        </>
    );

}
export default Places;

