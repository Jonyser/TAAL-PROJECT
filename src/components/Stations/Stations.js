import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import { BsPencilFill } from "react-icons/bs";
import './style.css';
// import Tasks_comp from "../Tasks_comp/Task_comp"


let allTasks = [];
let tasks = [];
let taskArray = [];

const Stations = (props) => {
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

                // console.log("resssssssssssssssssssssssssssssssss", allTasks[0].places[0]);
                // places = res.filter((item) => item.parent === 0)
                // Places_and_their_stations = places.map((element) => {
                //     return {
                //         parent: element,
                //         related: res.filter((r) => r.parent === element.id)
                //     }
                // })
                // for (let i = 0; i < Places_and_their_stations.length; i++) {
                //     setStatePlaces(statePlaces => [...statePlaces, { value: Places_and_their_stations[i].parent.name, label: Places_and_their_stations[i].parent.name }])
                // }
            });
    }

    const Display_The_Tasks = (e) => {


        // console.log("allTasks:", allTasks[0].places);
        allTasks.forEach(element => {
            console.log("elllllll:", element)
            for (let i = 0; i < element.places.length; i++) {
                if (element.places[i] == e.id) {
                    tasks.push(element)
                }
            }
        });

        // tasks = allTasks.filter((item) => item.places[1] === e.id)

        // console.log("eeee.", e)
        console.log("tasks,", tasks)
    }


    // const Display_The_Stations = (e) => {
    //     if (stationArray.length > 0) {
    //         stationArray = [];
    //     }
    //     // console.log("val:", e);

    //     //If we want the stations
    //     Places_and_their_stations.forEach(element => {

    //         if (element.parent.id === e.id) {

    //             element.related.forEach(rel => {


    //                 setStateStation({ data: stationArray.push(rel) });

    //             });
    //             // console.log("stationArray:", stationArray);
    //         }
    //     });
    // }
    // console.log("isWork:", props.propsData)

    return (
        <>
            {loading && (<div>Loading</div>)}
            {!loading && (
                <>
                    <div className='StationColler'>

                        {props.propsData.map((value, index) => { return (<button className='Station' onClick={() => Display_The_Tasks(value)} key={index}>{value.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BsPencilFill /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>) })} <br></br>
                    </div>

                    <div className='Cover'>
                        <div className='TitleStation'><h2>משימות</h2></div>

                        {/* <Tasks_comp propsDataTask={taskArray} /> */}

                    </div>




                </>

            )}
        </>
    );

}
export default Stations;
//----------------------------------------
