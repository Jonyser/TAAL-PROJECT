import React, { useState, useEffect } from 'react';
import './style.css';
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink } from "react-icons/fc";
import Places from '../Places/Places';
import $ from 'jquery';

let tasks = [];
let places = [];

const jq =() =>{
    $(".TitleTasks").hide();
    $(".TitleStation").hide();
    console.log(document.body.style.zoom)

}
// function useWindowSize() {
//     const [size, setSize] = useState([10, 0]);
//     useLayoutEffect(() => {
//       function updateSize() {
//         setSize([window.innerWidth, window.innerHeight]);
//       }
//       window.addEventListener('resize', updateSize);
//       updateSize();
//       return () => window.removeEventListener('resize', updateSize);
//     }, []);
//     return size;
//   }
const Planner = () => {
    const [name, setName] = useState(null);// for TextView
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                jq();
                // useWindowSize()
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    // const [jqry, setJqry] = useState(jq);

    //-------------------input-------------------------
    function getName(val) {
        setName(val.target.value)
        console.warn(val.target.value)  
    } 
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

                    <div>
                        <br></br>
                         <br></br> 

                        <Places />

                    </div>
                </>
            )}
        </>
    );
}

export default Planner;

   // const wpConfig = {
        //     siteUrl: clientConfig.siteUrl,
        //     getRoutes: `${clientConfig.siteUrl}wp-json/wp/v2/s83.bfa.myftpupload.com`,
        //     getTasks: `${clientConfig.siteUrl}wp-json/wp/v2/tasks`,
        //     getPlaces: `${clientConfig.siteUrl}wp-json/wp/v2/places`,
        //     getUser: `${clientConfig.siteUrl}wp-json/wp/v2/users/me`
        // };




             //----------------------------------------------------------------------------------


        // const resTasks = await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/tasks/', {
        //     params: {
        //         per_page: 99, 'Cache-Control': 'no-cache'
        //     }
        // }).then(res => {
        //     tasks = res
        //     // for (let i = 0; res[i] != undefined; i++) {

        //     //     setArrTasks(arrTasks => [...arrTasks, { value: res[i].title.rendered, label: res[i].title.rendered }])

        //     // }
        //     // console.log("arrTasks is: ", arrTasks)

        // });
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