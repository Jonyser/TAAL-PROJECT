import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import './style.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
// /

import img1 from '../../Pictures/img1.png';
import img2 from '../../Pictures/img2.png';
import img3 from '../../Pictures/img3.png';
import img4 from '../../Pictures/img6.png';
import {
    Button,
    Dropdown,
    DropdownButton,
    Card
} from 'react-bootstrap';

let dataCards = [];
let dataCards1 = [];
let dataCards2 = [];
let dataCards3 = [];
let dataCards4 = [];
let size = 0;
let index;

const number = 4;

const Cards = () => {


    const [, setLoading] = useState(false);
    const [, setDataCards] = useState([]);
    const [, setDataCards1] = useState([]);
    const [, setDataCards2] = useState([]);
    const [, setDataCards3] = useState([]);
    const [, setDataCards4] = useState([]);



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

    const getData = async () => {

        await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/', {
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        }).then(res => {
            size = res.length / number;


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
            size = dataCards.length / number;
            for (index = 0; index < size; index++) {
                setDataCards1(dataCards1[index] = dataCards[index])

            }
            console.log(dataCards)
            console.log(index)
            console.log("dataCards1", dataCards1)


            for (let i = 0; i < size; i++, index++) {

                setDataCards2(dataCards2[i] = dataCards[index])


            }
            console.log("dataCards2", dataCards2)

            for (let i = 0; i < size; i++, index++) {

                setDataCards3(dataCards3[i] = dataCards[index])


            }
            console.log("dataCards3", dataCards3);

            for (let i = 0; i < size; i++, index++) {

                setDataCards4(dataCards4[i] = dataCards[index])


            }
            console.log("dataCards4", dataCards4)
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

            <div className='container'>

                <div className="row">
                    <div className="col-3">{dataCards1.map((value, index) => {
                        return (
                            <div key={index} className='App'>
                                <header key={index}>
                                    <Card style={{ color: "#000", marginBottom: 15 }}>
                                        {/* display_name */}
                                        <Card.Img src={img1} style={{ height: 237 }} />
                                        <Card.Body>
                                            <Card.Title>
                                                {value.myTitle}
                                            </Card.Title>
                                            <Card.Subtitle >

                                            </Card.Subtitle>


                                            <DropdownButton className="d-inline p-2 text-white" id="dropdown-basic-button" title="משימות" >

                                                {value.myTasks.map((value, index) =>
                                                    <Dropdown.Item key={index} >

                                                        {value.post_title}
                                                    </Dropdown.Item>)}

                                            </DropdownButton>
                                            <DropdownButton className="d-inline p-2  text-white" id="dropdown-basic-button" title="משוייך ל" >
                                                {value.myUsers ? <>

                                                    {value.myUsers.map((value, index) =>
                                                        <Dropdown.Item key={index} >

                                                            {value.display_name}
                                                        </Dropdown.Item>)}
                                                </> : <>

                                                    <Dropdown.Item href="#/action-1">

                                                        אינו משוייך

                                                    </Dropdown.Item>
                                                </>}

                                            </DropdownButton>

                                        </Card.Body>
                                    </Card>
                                </header>
                            </div>
                        )
                    })}</div>
                    <div className="col-3">{dataCards2.map((value, index) => {
                        return (
                            <div key={index} className='App'>
                                <header key={index} >
                                    <Card className="mb-3" style={{ color: "#000", marginBottom: 7 }}>

                                        <Card.Img src={img2} style={{ height: 237 }} />
                                        <Card.Body>
                                            <Card.Title>
                                                {value.myTitle}
                                            </Card.Title>
                                            <Card.Subtitle >
                                                <DropdownButton className="d-inline p-2 text-white" id="dropdown-basic-button" title="משימות" >

                                                    {value.myTasks.map((value, index) =>
                                                        <Dropdown.Item key={index} >

                                                            {value.post_title}
                                                        </Dropdown.Item>)}
                                                </DropdownButton>
                                                <DropdownButton className="d-inline p-2  text-white" id="dropdown-basic-button" title="משוייך ל" >
                                                    {value.myUsers ? <>

                                                        {value.myUsers.map((value, index) =>
                                                            <Dropdown.Item key={index} >

                                                                {value.display_name}
                                                            </Dropdown.Item>)}
                                                    </> : <>

                                                        <Dropdown.Item href="#/action-1">
                                                            {console.log("אינו משוייך")}
                                                            אינו משוייך

                                                        </Dropdown.Item>
                                                    </>}

                                                </DropdownButton>
                                            </Card.Subtitle>
                                        </Card.Body>


                                    </Card>
                                </header>
                            </div>
                        )
                    })}</div>
                    <div className="col-3">{dataCards3.map((value, index) => {
                        return (
                            <div key={index} className='App'>
                                <header key={index} >
                                    <Card className="mb-3" style={{ color: "#000", marginBottom: 7 }}>

                                        <Card.Img src={img3} style={{ height: 237 }} />
                                        <Card.Body>
                                            <Card.Title>
                                                {value.myTitle}
                                            </Card.Title>
                                            <Card.Subtitle >

                                                <DropdownButton className="d-inline p-2 text-white" id="dropdown-basic-button" title="משימות" >

                                                    {value.myTasks.map((value, index) =>
                                                        <Dropdown.Item key={index} >

                                                            {value.post_title}
                                                        </Dropdown.Item>)}
                                                </DropdownButton>

                                                <DropdownButton className="d-inline p-2  text-white" id="dropdown-basic-button" title="משוייך ל" >
                                                    {value.myUsers ? <>



                                                        {value.myUsers.map((value, index) =>
                                                            <Dropdown.Item key={index} >

                                                                {value.display_name}
                                                            </Dropdown.Item>)}
                                                    </> : <>
                                                        <Dropdown.Item href="#/action-1">
                                                            {console.log("אינו משוייך")}
                                                            אינו משוייך

                                                        </Dropdown.Item></>}

                                                </DropdownButton>

                                            </Card.Subtitle>
                                        </Card.Body>

                                    </Card>
                                </header>
                            </div>
                        )
                    })}</div>
                    <div className="col-3">{dataCards4.map((value, index) => {
                        return (
                            <div key={index} className='App'>
                                <header key={index} >
                                    <Card className="mb-3" style={{ color: "#000", marginBottom: 7 }}>

                                        <Card.Img src={img4} style={{ height: 237 }} />
                                        <Card.Body>
                                            <Card.Title>
                                                {value.myTitle}

                                            </Card.Title>

                                            <Card.Subtitle >

                                                <DropdownButton className="d-inline p-2 " id="dropdown-basic-button" title="משימות" >

                                                    {value.myTasks.map((value, index) =>
                                                        <Dropdown.Item key={index}>

                                                            {value.post_title}
                                                        </Dropdown.Item>)}
                                                </DropdownButton>
                                                <DropdownButton className="d-inline p-2 " id="dropdown-basic-button" title="משוייך ל" >
                                                    {value.myUsers ? <>
                                                        {value.myUsers.map((value, index) =>
                                                            <Dropdown.Item key={index} >

                                                                {value.display_name}
                                                            </Dropdown.Item>)}
                                                    </> : <>
                                                        <Dropdown.Item href="#/action-1">
                                                            {console.log("אינו משוייך")}
                                                            אינו משוייך

                                                        </Dropdown.Item></>}

                                                </DropdownButton>
                                            </Card.Subtitle>
                                        </Card.Body>
                                    </Card>
                                </header>
                            </div>
                        )
                    })}</div>

                </div>
            </div>
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
