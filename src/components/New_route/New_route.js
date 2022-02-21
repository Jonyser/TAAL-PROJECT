import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import './style.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragnDrop from "../DragnDrop/DragnDrop";
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink } from "react-icons/fc";
import { BsPencilFill, BsTropicalStorm } from "react-icons/bs";

// import Select from 'react-select';


let tasks = [];
let places = [];
let Places_and_their_stations = [];
// import AsyncSelect from 'react-select/async';
const New_route = () => {
    const [name, setName] = useState(null);// for TextView
    const [loading, setLoading] = useState(false);
    const [statePlaces, setStatePlaces] = useState([]);
    // const [arrTasks, setArrTasks] = useState([]);
    // const [arrRoutes, setArrRoutes] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);

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

    let arrPlaces2 = [];

    const getData = async () => {
        //----------------------------------------------------------------------------------
        //https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/

        const resPlaces = await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/', {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        }).then(res => {
            // console.log("res:", res)
            places = res.filter((item) => item.parent === 0)
            Places_and_their_stations = places.map((element) => {
                return {
                    parent: element,
                    related: res.filter((r) => r.parent === element.id)
                }
            })
            // console.log("grooups", groupes);
            // console.log("plases:", plases)
            for (let i = 0; i < Places_and_their_stations.length; i++) {
                setStatePlaces(statePlaces => [...statePlaces, { value: Places_and_their_stations[i].parent.name, label: Places_and_their_stations[i].parent.name }])

                // console.log(statePlaces[i].value)
            }

        });
        //----------------------------------------------------------------------------------


        const resTasks = await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/tasks/', {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        }).then(res => {
            tasks = res
            // for (let i = 0; res[i] != undefined; i++) {

            //     setArrTasks(arrTasks => [...arrTasks, { value: res[i].title.rendered, label: res[i].title.rendered }])

            // }
            // console.log("arrTasks is: ", arrTasks)

        });
        //---------------------------------מסלול-------------------------------------------------

        // const resRoutes = await get('https://taal.tech/wp-json/wp/v2/routes/', {
        //     params: {
        //         per_page: 99, 'Cache-Control': 'no-cache'
        //     }
        // }).then(res => {
        //     console.log("res3:", res)
        //     for (let i = 0; res[i] != undefined; i++) {

        //         setArrRoutes(arrRoutes => [...arrRoutes, { value: res[i].name, label: res[i].name }])

        //     }
        //     // console.log("arrplaces is: ", arrPlaces)

        // });
        //----------------------------------------------------------------------------------
        // const res2 = await axios.get('https://taal.tech/wp-json/wp/v2/routes', {});
        // const res = await axios.get('https://taal.tech/wp-json/wp/v2/places', {});
        // const res = await axios.post('https://taal.tech/wp-json/wp/v2/routes', { new_route });
        //const res = await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/747', {});
        //---------------------------------------------------------------------------------------------------------------
        // if (resTasks) {
        //     // console.log("resTasks");
        //     // console.log(resTasks.data.length);

        //     for (let i = 0; resTasks.data[i] != undefined; i++) {
        //         arrTasks[i] = resTasks.data[i];
        //         let element = resTasks.data[i];
        //         // console.log(element.title.rendered)
        //         setTasksNames([...tasksNames,
        //         tasksNames[i] = element.title.rendered
        //         ])
        //     }
        //     // console.log(arrTasks);
        // }
        //-----------------------------------------------------------------

        // if (resRoutes) {
        //     for (let i = 0; resRoutes.data[i] != undefined; i++) {
        //         arrRoutes[i] = resRoutes.data[i];
        //         let element = resRoutes.data[i];
        //         setRoutesNames([...routesNames,
        //         routesNames[i] = element.title.rendered
        //         ])
        //     }
        //     console.log(resRoutes.data);

        // }
        //-------------------------------------------------------------------
        // if (resPlaces) {
        //     // console.log(resPlaces);
        //     for (let i = 0; resPlaces[i] != undefined; i++) {

        //         arrPlaces.push({ value: resPlaces[i].name, label: resPlaces[i].name })

        //         let element = resPlaces[i];
        //         setPlacesNames([...placesNames,
        //         placesNames[i] = element.name
        //         ])
        //     }
        //     // { console.log("textGet", arrPlaces) }
        // }
    }
    //-------------------input-------------------------
    function getName(val) {

        setName(val.target.value)
        console.warn(val.target.value)
    }
    //-------------------------------------------------
    let to_add = "";
    let counter = 0;
    function Display_The_Stations(e) {

        //To erase the previous station's display and allow to the new one to be the unique station's display
        counter++;
        if (counter >= 1) {
            console.log("in the station function")
            document.getElementById('stations').innerHTML = "";
            to_add = "";
        }

        //If we want the stations
        Places_and_their_stations.forEach(element => {
            if (element.parent.id === e.id) {

                element.related.forEach(rel => {
                    to_add += "<button class = 'station' name = 'station'>" + rel.name + "</button>";

                });

                document.getElementById('stations').innerHTML = to_add

                //If that set the onclick function of the Stations button to Display_The_tasks
                if (document.getElementsByName('station') != null) {

                    let elements = document.getElementsByName('station');
                    console.log(elements, 'Size of elements : ' + elements.length)

                    for (let i = 0; i < elements.length; i++) {
                        elements[i].onclick = function () { return Display_The_tasks(element) };
                    }

                }
                console.log(element.related[0])
            }
        });
    }
    let to_add_to_tasks = ""

    function Display_The_tasks(element) {

        let tasks_of_the_station;
        console.log(tasks_of_the_station)
        console.log('in the task function', element)
        element.related.forEach(station => {
            tasks.forEach(task => {
                task.places.forEach(place => {

                    if (place === station.id) {
                        console.log(tasks_of_the_station, "name of the task" + task.title.rendered)
                        tasks_of_the_station += task.title.rendered
                    }
                });
            })
            console.log(tasks_of_the_station)
            // tasks_of_the_station.map((e) => to_add_to_tasks += "<h1>" + e.title.rendered + "</h1>")
        });
        document.getElementById('tasks').innerHTML = to_add_to_tasks
        console.log(document.getElementById('tasks'))

    }
    // document.getElementById('station').onclick = Display_The_Tasks();

    // function Display_The_Tasks(){
    //     if(this != null){

    //         let to_add_to_tasks = ""
    //         this.related.forEach(station => {
    //             tasks.forEach(task => {
    //                 if(station.id in task.places){
    //                     to_add_to_tasks += "<button>" + task.title.rendered + "</button>"
    //                 }  
    //             });
    //         });
    //         document.getElementById('tasks').innerHTML = to_add_to_tasks
    //     }

    // }
    return (
        <>
            {loading && <div>Loading</div>}
            {!loading && (
                <>
                    <div className="Actions">
                        <button className='AddRoute' > שייך מסלול לחניך  <FcLink className='icon' /></button>
                        <button className='AddRoute' > שכפל מסלול  <GrDuplicate className='icon' /></button>
                        <button className='AddRoute'> שמור מסלול  <FcOk className='icon' /> </button>
                    </div>
                    <div className='textView'>
                        <input type="text" className="RouteName" onChange={getName}></input>
                    </div>
                    <DndProvider backend={HTML5Backend}>
                        <DragnDrop />
                    </DndProvider >
                    <br></br> <br></br> <br></br>



                    {/* <div className='GetElement'>
                        <h3>{tasksNames.map((value, index) => { return <li key={index}>{value}</li> })}</h3>
                        <h3>{routesNames.map((value, index) => { return <li key={index}>{value}</li> })}</h3>
                        <h3>{placesNames.map((value, index) => { return <li key={index}>{value}</li> })}</h3>

                         {names.map(name => <h2>{name}</h2>)}
                    </div> */}
                    <div>
                        {/* {console.log(places)} */}
                        {/* <h3>{placesNames.map((value, index) => { return <li key={index}>{value}</li> })}</h3> */}
                        <div className='Cover1'>
                            <div className='TitlePlaces'><h2>אתרים</h2></div>

                            <div className='Places'>
                                {places.map((value, index) => { return (<button className='place' onClick={() => Display_The_Stations(value)} key={index}>{value.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BsPencilFill /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>) })} <br></br>
                            </div>
                        </div>
                        <div className='Cover2'>
                            <div className='TitleStation'><h2>תחנות</h2></div>
                            <div id='stations'></div>
                            <div id='tasks'></div>
                        </div>
                        {/* {<Select options={statePlaces} className="Dropdown"
                            onChange={setSelectedOption} />

                        } */}


                    </div>
                </>
            )}
        </>
    );
}



export default New_route;

   // const wpConfig = {
        //     siteUrl: clientConfig.siteUrl,
        //     getRoutes: `${clientConfig.siteUrl}wp-json/wp/v2/s83.bfa.myftpupload.com`,
        //     getTasks: `${clientConfig.siteUrl}wp-json/wp/v2/tasks`,
        //     getPlaces: `${clientConfig.siteUrl}wp-json/wp/v2/places`,
        //     getUser: `${clientConfig.siteUrl}wp-json/wp/v2/users/me`
        // };