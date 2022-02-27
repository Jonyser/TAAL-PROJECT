import React, { useState, useEffect, useRef } from 'react';
import { get } from "../../api/api";
import './style.css';
import { BsPencilFill } from "react-icons/bs";
import Stations from '../Stations/Stations'
import Dot from '../Dot/Dot'
import $ from 'jquery'

// import Select from 'react-select';

let places = [];
let stationArray = [];
let Places_and_their_stations = [];


const jq = () => {
    $(".TitleStation").show();

}

// const jq = () => {
//     $(".TitleStation").show();

//     // $(".TitlePlaces").fadeTo("slow", 1);
// }
const Places = () => {
    // memo//משתנים,coolbake//pפונ
    const [loading, setLoading] = useState(false);
    const [statePlaces, setStatePlaces] = useState([]);
    const [stateStation, setStateStation] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                getData();
                jq();
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const getData = async () => {

        //----------------------------------------------------------------------------------
        //https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/

        await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/', {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        }).then(res => {
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
        jq()
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
    }

    //----------------------------------------------------------------------

    return (
        <>
            {loading && (<div>Loading</div>)}
            {!loading && (
                <>
                    <div className='Cover'>
                        <div className='TitlePlaces'><h2>אתרים</h2></div>

                        <div className='Places'>

                            {places.map((value, index) => { return (<button className='place' onClick={() => Display_The_Stations(value)} key={index}>{value.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BsPencilFill /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Dot color="rgb(161, 147, 229)" /></button>) })} <br></br>
                        </div>

                    </div>
                    <Stations propsData={stationArray} />
                </>
            )}
        </>
    );

}
export default Places;

