import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import ReactLoading from 'react-loading';
import './style.css';
import { GrScorecard } from "react-icons/gr";
import img1 from '../../Pictures/img1.png';
import img2 from '../../Pictures/img2.png';
import img3 from '../../Pictures/img3.png';
import img4 from '../../Pictures/img4.png';
import img5 from '../../Pictures/img5.png';
import img6 from '../../Pictures/img7.png';
let result = 0;
let dataCards = [];
let i = 1;

const Cards = () => {
    const [, setData] = useState([]);
    const [done, setDone] = useState(undefined);

    const [, setLoading] = useState(false);
    const [, setDataCards] = useState([]);



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
    useEffect(() => {
        setTimeout(() => {
            fetch('https://jsonplaceholder.typicode.com/posts/1') //https://jsonplaceholder.typicode.com/guide/ api
                .then((response) => response.json())
                .then((json) => {
                    setData(json);
                    setDone(true);
                });
        }, 2000);

    }, [])

    const getData = async () => {

        await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/', {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        }).then(res => {
            console.log("routes:", res)
            setDataCards(
                dataCards = res.map((value
                ) => {
                    return {

                        myUsers: value.acf.users,
                        myTitle: value.title.rendered,
                        myTasks: value.acf.tasks,
                        myId: value.id
                    }
                })
            )
            console.log(dataCards)
        });
    }

    //----------------------------------------------------------------------
    // const foo = () => {
    //     result = "img" + i
    //     i++;
    //     if (i == 7) {
    //         i = 1
    //     }
    //     console.log("res:", result)


    // }
    return (
        <>
            {!done ?
                <>
                    <h1 float={'right'}>loading</h1>
                    < ReactLoading type={"bars"} color={"rgb(180, 175, 199)"} height={'10%'} width={'10%'} />
                </>
                :
                <>

                    {dataCards.map((value, index) => {
                        return (

                            <div key={index} className='Cards' >

                                <button key={index} className='Card'>
                                    {/* {foo()}
                                    {console.log("res:", typeof result)} */}
                                    <img className='img' src={img1}></img>
                                    <h4> <GrScorecard />{value.myTitle}</h4>


                                    <div className='Task_s'>
                                        {value.myTasks.map((value, index) =>

                                            <p className='Task'
                                                key={index}>

                                                {value.post_title}

                                            </p>)}


                                    </div>


                                </button>
                            </div>
                        )
                    })}





                </>
            }

        </>
    );

}
export default Cards;


// connect(
//     undefined,
//     (dispatch) => {
//         return {
//             changeNameFromPlaces:
//                 (newName) => dispatch(setName(newName))
//         }

//     }

// )(Places);

 // let a = "https://s83.bfa.myftpupload.com/?rest_route=/simple-jwt-login/v1/auth"

        // fetch(a, { method: "POST", body: "email=jonassp@post.jce.ac.il&password=GvS7GZJUDLt0DKBM" }).then(r => r.json()).then(console.log)
        // ----------------------------------------------------------------------------
        //https://s83.bfa.myftpupload.com/wp-json/wp/v2/places/


        // await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/', {
        //     params: {
        //         per_page: 99, 'Cache-Control': 'no-cache'
        //     }
        // }).then(res => {
        //     places = res.filter((item) => item.parent === 0)

        //     Places_and_their_stations = places.map((element) => {
        //         return {
        //             parent: element,
        //             related: res.filter((r) => r.parent === element.id)
        //         }
        //     })

        //     for (let i = 0; i < Places_and_their_stations.length; i++) {
        //         let temp = Places_and_their_stations[i]
        //         setStatePlaces(statePlaces => [...statePlaces, { value: temp.parent.name, label: temp.parent.name }])
        //     }
        // });

        // await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/', {
        //     params: {
        //         per_page: 99, 'Cache-Control': 'no-cache'
        //     }
        // }).then(res => {
        //     console.log("masloulims :", res)
        // })

        // var token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2N…hcyJ9.IdhRTqgRouzeJHx6CmPu1oNVFddK5bjtfmxOk2Fnb1s`;
        // let url_post = `https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes`
        // fetch(url_post, {
        //     method: "POST",
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`,


        //     },
        //     body: JSON.stringify({
        //         title: 'Lorem ipsum',
        //         content: 'Lorem ipsum dolor sit amet.',
        //         status: 'draft'
        //     })
        // }).then(function (response) {
        //     return response.json();
        // }).then(function (post) {
        //     console.log(post);
        // });
