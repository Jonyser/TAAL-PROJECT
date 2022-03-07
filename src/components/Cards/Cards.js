import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import ReactLoading from 'react-loading';
import Card from '../Card/Card'
import { keys } from 'mobx';

// import Select from 'react-select';

let dataCards = [];



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
                dataCards = res.map((element) => {
                    return {
                        myUsers: element.acf.users,
                        myTitle: element.title.rendered,
                        myTasks: element.acf.tasks

                    }
                })
            )
            console.log("dataCardssssssssssssssss", dataCards)



        });
    }

    //----------------------------------------------------------------------

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
                            <div
                                key={index}>
                                <Card myTitle={value.myTitle} myTasks={value.myTasks} size={dataCards.length} />
                            </div>
                        )
                    })} <br></br>

                    {/* {dataCards.map((value, index) => {

                        return (
                            <div> key={index}
                                <Card myTitle={value.myTitle} />

                            </div>




                        )

                        //  console.log("dataCardsdataCardsdataCards: ", element.myTitle)


                    })} */}

                    {/* {dataCards.map((value, index) => { return (<button className='Place' key={index}>{value}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>) })} <br></br> */}

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
