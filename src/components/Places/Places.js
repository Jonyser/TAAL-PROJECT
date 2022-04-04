import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import './style.css';
import { BsPencilFill } from "react-icons/bs";
import { FcAddDatabase } from "react-icons/fc";
import Stations from '../Stations/Stations'
import Dot from '../Dot/Dot'
import $, { } from 'jquery'
import ReactLoading from 'react-loading';
// import Popup from 'reactjs-popup';

let places = [];
let stationArray = [];
let Places_and_their_stations = [];


const Places = () => {
    const [done, setDone] = useState(false);
    const [, setLoading] = useState(false);
    const [, setStateStation] = useState([]);

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
        // taal.tech/wp-json/wp/v2/places
        ///s83.bfa.myftpupload.com/wp-json/wp/v2/places
        await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/', {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }

        }).then(res => {

            console.log("res: ", res)
            places = res.filter((item) => item.parent === 0)

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
    const jq = () => {
        // setJQ($(".TitleStation").hide())
    }
    //----------------------------------------------------------------------
    const AddPlace = () => {
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
                    <div className='Cover_Places'>
                        <div className='TitlePlaces'><h3>אתרים</h3></div>
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

                            <button
                                className='AddPlace'
                                onClick={() => AddPlace()}>
                                <FcAddDatabase style={{
                                    width: "85px",
                                    height: "30px"
                                }} />
                                <h6 >הוסף אתר</h6>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </button>

                        </div>
                    </div>
                    <Stations propsData={stationArray} />
                </>
            }
        </>
    );
}
export default Places;
















































// import React, { useState, useEffect } from 'react';
// import { get } from "../../api/api";
// import './style.css';
// import { BsPencilFill } from "react-icons/bs";
// import Stations from '../Stations/Stations'
// import Dot from '../Dot/Dot'
// import $, { } from 'jquery'
// import ReactLoading from 'react-loading';


// let places = [];
// let stationArray = [];
// let Places_and_their_stations = [];
// const jq = () => {
//     // $(".TitleStation").hide();
//     // console.log("ttt")
// }

// const Places = () => {
//     const [done, setDone] = useState(false);
//     const [, setLoading] = useState(false);
//     const [, setStateStation] = useState([]);


//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 getData();
//                 jq();

//             } catch (error) {
//                 console.error(error.message);
//             }
//             setLoading(false);
//         }
//         fetchData();
//     }, []);

//     const getData = async () => {
//         // taal.tech/wp-json/wp/v2/places
//         ///s83.bfa.myftpupload.com/wp-json/wp/v2/places
//         await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/', {
//             params: {
//                 per_page: 99, 'Cache-Control': 'no-cache'
//             }

//         }).then(res => {

//             console.log("res: ", res)
//             places = res.filter((item) => item.parent === 0)

//             Places_and_their_stations = places.map((element) => {
//                 return {
//                     parent: element,
//                     related: res.filter((r) => r.parent === element.id)
//                 }
//             })
//         });
//         setDone(true)
//         // setData_Loaded(true)

//     }

//     const Display_The_Stations = (e) => {
//         jq()
//         if (stationArray.length > 0) {
//             stationArray = [];
//         }
//         // console.log("val:", e);


//         Places_and_their_stations.forEach(element => {

//             if (element.parent.id === e.id) {

//                 element.related.forEach(rel => {

//                     setStateStation({ data: stationArray.push(rel) });

//                 });
//                 // console.log("stationArray:", stationArray);
//             }
//         });
//     }

//     //----------------------------------------------------------------------

//     return (
//         <>
//             {!done ? <>
//                 <h1 float={'right'}>Loading</h1>
//                 < ReactLoading type={"bars"} className='loading' color={"rgb(180, 175, 199)"} height={'10%'} width={'10%'} />
//             </>
//                 :
//                 <>
//                     <div className='Cover_Places'>
//                         <div className='TitlePlaces'><h3>אתרים</h3></div>

//                         <div className='Places'>

//                             {places.map((value, index) => {
//                                 return (
//                                     <button
//                                         className='Place'
//                                         onClick={() => Display_The_Stations(value)}
//                                         key={index}>{value.name}  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                         <BsPencilFill />
//                                         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                                         <Dot color="rgb(161, 147, 229)" />
//                                     </button>
//                                 )
//                             })}

//                         </div>
//                     </div>
//                     <Stations propsData={stationArray} />
//                 </>
//             }
//         </>
//     );

// }
// export default Places;


// // connect(
// //     undefined,
// //     (dispatch) => {
// //         return {
// //             changeNameFromPlaces:
// //                 (newName) => dispatch(setName(newName))
// //         }

// //     }

// // )(Places);

//  // let a = "https://s83.bfa.myftpupload.com/?rest_route=/simple-jwt-login/v1/auth"

//         // fetch(a, { method: "POST", body: "email=jonassp@post.jce.ac.il&password=GvS7GZJUDLt0DKBM" }).then(r => r.json()).then(console.log)
//         // ----------------------------------------------------------------------------
//         //https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/


//         // await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/', {
//         //     params: {
//         //         per_page: 99, 'Cache-Control': 'no-cache'
//         //     }
//         // }).then(res => {
//         //     places = res.filter((item) => item.parent === 0)

//         //     Places_and_their_stations = places.map((element) => {
//         //         return {
//         //             parent: element,
//         //             related: res.filter((r) => r.parent === element.id)
//         //         }
//         //     })

//         //     for (let i = 0; i < Places_and_their_stations.length; i++) {
//         //         let temp = Places_and_their_stations[i]
//         //         setStatePlaces(statePlaces => [...statePlaces, { value: temp.parent.name, label: temp.parent.name }])
//         //     }
//         // });

//         // await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/', {
//         //     params: {
//         //         per_page: 99, 'Cache-Control': 'no-cache'
//         //     }
//         // }).then(res => {
//         //     console.log("masloulims :", res)
//         // })

//         // var token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2N…hcyJ9.IdhRTqgRouzeJHx6CmPu1oNVFddK5bjtfmxOk2Fnb1s`;
