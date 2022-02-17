import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import './style.css';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DragnDrop from "../DragnDrop/DragnDrop";
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink } from "react-icons/fc";
import Select from 'react-select';
// import AsyncSelect from 'react-select/async';
const New_route = () => {
    const [name, setName] = useState(null);// for TextView
    const [loading, setLoading] = useState(true);
    const [arrPlaces, setArrPlaces] = useState([]);
    const [arrTasks, setArrTasks] = useState([]);
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

        const resPlaces = await get('https://taal.tech/wp-json/wp/v2/places/', {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        }).then(res => {
            console.log("resPlaces:", res)
            const plases = res.filter((item) => item.parent === 0)
            const grupes = plases.map((element) => {
                return {
                    parent: element,
                    related: res.filter((r) => r.parent === element.id)
                }
            })
            console.log(grupes);
            // console.log("plases:", plases)
            for (let i = 0; i < grupes.length; i++) {
                setArrPlaces(arrPlaces => [...arrPlaces, { value: grupes[i].parent.name, label: grupes[i].parent.name }])
            }
        });
        //----------------------------------------------------------------------------------


        const resTasks = await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/tasks/', {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        }).then(res => {

            for (let i = 0; res[i] != undefined; i++) {

                setArrTasks(arrTasks => [...arrTasks, { value: res[i].title.rendered, label: res[i].title.rendered }])

            }
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
                    {/* <div className='GetElement'>
                        <h3>{tasksNames.map((value, index) => { return <li key={index}>{value}</li> })}</h3>
                        <h3>{routesNames.map((value, index) => { return <li key={index}>{value}</li> })}</h3>
                        <h3>{placesNames.map((value, index) => { return <li key={index}>{value}</li> })}</h3>
                    </div> */}
                    <div>
                        {<Select options={arrPlaces} className="Dropdown"
                            onChange={setSelectedOption} />}
                        {/* {<Select options={arrRoutes}
                            onChange={setSelectedOption} />} */}

                        {<Select options={arrTasks} className="Dropdown"
                            onChange={setSelectedOption} />}
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
