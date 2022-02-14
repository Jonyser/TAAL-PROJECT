import axios from 'axios';
import React, { useState } from 'react';
import { get } from "../../api/api";
import './style.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragnDrop from "../DragnDrop/DragnDrop";
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink } from "react-icons/fc";

const New_route = () => {
    const [name, setName] = useState(null);
    const [tasksNames, setTasksNames] = useState([]);
    const [routesNames, setRoutesNames] = useState([]);
    const [placesNames, setPlacesNames] = useState([]);

    let arrTasks = [];
    let arrRoutes = [];
    let arrPlaces = [];


    // const { onChange } = this.props;
    const getData = async () => {
        const new_route = `{
            "id": 222,
            "acf":""
           }`;


        const resPlaces = await get('https://taal.tech/wp-json/wp/v2/places/', {});
        const resRoutes = await axios.get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes', {});
        const resTasks = await axios.get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/tasks', {});
        // const res2 = await axios.get('https://taal.tech/wp-json/wp/v2/routes', {});
        // const res = await axios.get('https://taal.tech/wp-json/wp/v2/places', {});
        // const res = await axios.post('https://taal.tech/wp-json/wp/v2/routes', { new_route });
        //const res = await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/747', {});
        //---------------------------------------------------------------------------------------------------------------
        if (resTasks) {
            // console.log("resTasks");
            // console.log(resTasks.data[9]);
            // console.log(resTasks);

            for (let i = 0; resTasks.data[i] != undefined; i++) {
                arrTasks[i] = resTasks.data[i];
                let element = resTasks.data[i];
                // console.log(element.title.rendered)

                setTasksNames([...tasksNames,
                tasksNames[i] = element.title.rendered
                ])
            }
            console.log(arrTasks[0].title.rendered);
        }
        //---------------------------------------------------------------------------------------------------------------

        if (resRoutes) {
            for (let i = 0; resRoutes.data[i] != undefined; i++) {
                arrRoutes[i] = resRoutes.data[i];
                let element = resRoutes.data[i];
                setRoutesNames([...routesNames,
                routesNames[i] = element.title.rendered
                ])
            }
            // console.log(arrRoutes);

        }
        //---------------------------------------------------------------------------------------------------------------
        if (resPlaces) {
            // console.log(resPlaces);
            for (let i = 0; resPlaces[i] != undefined; i++) {
                arrPlaces[i] = resPlaces[i];
                let element = resPlaces[i];
                setPlacesNames([...placesNames,
                placesNames[i] = element.name
                ])
            }
            // console.log(arrPlaces);
        }
    }
    //-------------------input-------------------------
    function getName(val) {

        setName(val.target.value)
        console.warn(val.target.value)
    }
    //-------------------------------------------------
    return (
        <>
            <div className="Actions">
                <button className='AddRoute' > שייך מסלול לחניך  <FcLink className='icon' /></button>
                <button className='AddRoute' > שכפל מסלול  <GrDuplicate className='icon' /></button>
                <button className='AddRoute'> שמור מסלול  <FcOk className='icon' /> </button>
            </div>
            {/* <>{name}</> */}
            <div className='textView'>
                <input type="text" className="RouteName" onChange={getName}></input>

            </div>

            <DndProvider backend={HTML5Backend}>
                <div className='NewRouteBody'>
                    <h1 onClick={getData}>כפתור בדיקה</h1>
                </div>
                <DragnDrop />

            </DndProvider >

            <div className='GetElement'>
                {/* <select ClassName="cars" id="cars">
                    <option value="volvo">Volvo</option>
                    <option value="saab">Saab</option>
                    <option value="mercedes">Mercedes</option>
                    <option value="audi">Audi</option>
                </select> */}


                <select onClick={getData}>
                    <option >{tasksNames[0]}</option>

                </select>
                <h3>{tasksNames.map((value, index) => { return <li key={index}>{value}</li> })}</h3>
                <h3>{routesNames.map((value, index) => { return <li key={index}>{value}</li> })}</h3>
                <h3>{placesNames.map((value, index) => { return <li key={index}>{value}</li> })}</h3>
            </div>
        </>
    );
}
export default New_route;

   // const wpConfig = {
        //     siteUrl: clientConfig.siteUrl,
        //     getRoutes: `${clientConfig.siteUrl}wp-json/wp/v2/routes`,
        //     getTasks: `${clientConfig.siteUrl}wp-json/wp/v2/tasks`,
        //     getPlaces: `${clientConfig.siteUrl}wp-json/wp/v2/places`,
        //     getUser: `${clientConfig.siteUrl}wp-json/wp/v2/users/me`
        // };
