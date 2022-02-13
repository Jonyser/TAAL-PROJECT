import axios from 'axios';
import React, { useState } from 'react';
import { get } from "./../../api/api";
import './style.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragnDrop from "../DragnDrop/DragnDrop";
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink } from "react-icons/fc";

const Shop = () => {

    const [tasksNames, setTasksNames] = useState([])
    const [description, setDescription] = useState([])
    const [image, setImage] = useState([])

    const getData = async () => {
        const new_route = `{
            "id": 222,
            "acf":""
           }`;
        //  const res = await get('https://taal.tech/wp-json/wp/v2/places/', {});
        //const res = await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/747', {});

        const res = await axios.get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/747', {});
        // const res = await axios.post('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes', { new_route });

        if (res) {
            console.log("res")
            console.log(res)
            for (let i = 0; res[i] != undefined; i++) {

                let element = res[i];
                // console.log(element.title.rendered)

                setTasksNames([...tasksNames,
                tasksNames[i] = element.title.rendered
                ])
                setDescription([...description,
                description[i] = element.content.rendered
                ])

                setImage([...image,
                image[i] = element.acf.image.url
                ])
            }
            // console.log("description:", description)
        }
    }
    return (

        <DndProvider backend={HTML5Backend}>
            {/* <img src={Vicon} alt="Vicon"></img> */}
            <div className="Tags">
                <button className='AddRoute'> שמור מסלול  <FcOk className='icon' /> </button>
                <button className='AddRoute' > שכפל מסלול  <GrDuplicate className='icon' /></button>
                <button className='AddRoute' > שייך מסלול לחניך  <FcLink className='icon' /></button>

                <DragnDrop />
            </div>
            {/* <h2>{description}</h2> */}
            <h3>{tasksNames.map((value, index) => { return <li key={index}>{value}</li> })}</h3>
            {/* <h2>{image}</h2> */}

            <h1 onClick={getData}>כפתור בדיקה</h1>

        </DndProvider >
    );
}
export default Shop;

// return (
//     <DndProvider backend={HTML5Backend}>
//       <div className="App">
//         <DragDrop />
//       </div>
//     </DndProvider>


   // const wpConfig = {
        //     siteUrl: clientConfig.siteUrl,
        //     getRoutes: `${clientConfig.siteUrl}wp-json/wp/v2/routes`,
        //     getTasks: `${clientConfig.siteUrl}wp-json/wp/v2/tasks`,
        //     getPlaces: `${clientConfig.siteUrl}wp-json/wp/v2/places`,
        //     getUser: `${clientConfig.siteUrl}wp-json/wp/v2/users/me`
        // };
