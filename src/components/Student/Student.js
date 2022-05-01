import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Card } from 'react-bootstrap';
import profile from '../../Pictures/profile1.png';
import logo from '../../Pictures/logo.jpeg';
import ReactLoading from 'react-loading';
import Modal_Student from '../Modal/Modal_Student'
import Image from 'react-bootstrap/Image';
// import { Form } from "react-bootstrap";
//----------------------------------------------------|
let dataCards = [];//                                 |
let dataCards1 = [];//                                |
let dataCards2 = [];//                                |
let dataCards3 = [];//                                |
let dataCards4 = [];//                                |
let flag_show_page = false;//                         |
let size = 0;//                                       |
let index = 0;//                                      |
let sizeMod = 0;//                                    |
const number = 4;//                                   |
let getMyUsers = [];//                                |
//                                                    |
//----------------------------------------------------|
const Cards = () => {
    const [done, setDone] = useState(false);
    const [, setLoading] = useState(false);
    const [, setDataCards] = useState([]);
    const [, setDataCards1] = useState([]);
    const [, setDataCards2] = useState([]);
    const [, setDataCards3] = useState([]);
    const [, setDataCards4] = useState([]);
    const [, setFlag] = useState(false);
    // const [, setResultData] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [, setMyUsers] = useState([]);

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
    const getData = () => {
        if (flag_show_page === false)
            get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/users/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                },
                params: {
                    per_page: 99, 'Cache-Control': 'no-cache'
                }
            }).then(res => {
                console.log("Users:", res)
                size = res.length / number;
                setDataCards(dataCards = res.filter((item) => item.acf.risk_profile > 0))
                console.log("dataCards:", dataCards)
                sizeMod = dataCards.length % number;
                size = (dataCards.length - sizeMod) / number;

                for (let i = 0; i < size; i++) {
                    setDataCards1(dataCards1[i] = dataCards[index]);
                    index++;
                    setDataCards2(dataCards2[i] = dataCards[index])
                    index++;
                    setDataCards3(dataCards3[i] = dataCards[index])
                    index++;
                    setDataCards4(dataCards4[i] = dataCards[index])
                    index++;
                }
                for (let i = 0; i < sizeMod; i++) {
                    if (i < sizeMod) {
                        setDataCards4(dataCards4[size] = dataCards[index]);
                        i++;
                        index++;
                    }
                    if (i < sizeMod) {
                        setDataCards3(dataCards3[size] = dataCards[index]);
                        i++;
                        index++;
                    }
                    if (i < sizeMod) {
                        setDataCards2(dataCards2[size] = dataCards[index]);
                        i++;
                        index++;
                    }
                    if (i < sizeMod) {
                        setDataCards1(dataCards1[size] = dataCards[index]);
                        i++;
                        index++;
                    }
                }
                setFlag(flag_show_page = true)
                sizeMod = dataCards.length % number;
                size = (dataCards.length - sizeMod) / number;
            });

        setDone(true)
    }
    // const Replication = (val) => {
    //     setModalOpen(true);
    //     setMyRoute(myRoute = val)
    //     setFlagTasks(flagTasks = false)
    //     setFlagUsers(flagUsers = false)
    // }
    // const myTasks = (val) => {
    //     console.log("getMyTasks:", val.myTasks)
    //     setMyTasks(getMyTasks = val.myTasks);
    //     setModalOpen(true);
    //     setFlagTasks(flagTasks = true)
    //     console.log("myval:", getMyTasks)
    //     setFlagUsers(flagUsers = false)
    // }
    const myUsersfunc = (val) => {
        console.log("getMyUsers.name:", val.name);
        setMyUsers(getMyUsers = val);
        setModalOpen(true);
    }
    return (
        <>
            {!done ? <>
                <h1 float={'right'} style={{ color: 'white' }}>Loading</h1>
                < ReactLoading type={"bars"} className='loading' color={"rgb(180, 175, 199)"} height={'10%'} width={'10%'} />
            </>
                :
                <>
                    <div style={{
                        backgroundColor: 'rgb(213, 221, 228)',
                        overflow: "hidden",
                    }}>
                        {modalOpen && <Modal_Student setOpenModal={setModalOpen} thisGetMyUsers={getMyUsers} />}
                        <br></br>
                        <div className='container' >
                            <div className="row">
                                <div className="col-3">{dataCards1.map((value, index) => {
                                    return (
                                        <div key={index} className='App'>
                                            <header key={index}>
                                                <Card style={{ color: "#000", marginBottom: 15, border: "3px solid rgb(106 185 48)" }}>
                                                    {/* display_name */}

                                                    {value.acf.image ? <>
                                                        <Image style={{ height: 237, width: '97%' }}
                                                            src={value.acf.image.url}
                                                            alt="new"
                                                        />
                                                    </> :
                                                        <Card.Img src={profile} style={{ height: 237, width: '97%' }} />}



                                                    <Card.Body src={logo}>
                                                        <Card.Title >

                                                            <div className="text-center ">
                                                                <div className="row align-items-center">
                                                                    <div className="col-md-11">
                                                                        <h5>{value.name}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card.Title>
                                                        <button className="btn btn-primary" id="dropdown-basic-button" style={{ marginLeft: "90px" }} onClick={() => myUsersfunc(value)}>מידע נוסף
                                                        </button>
                                                        <br></br>
                                                        <br></br>

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
                                                <Card style={{ color: "#000", marginBottom: 15, border: "3px solid rgb(106 185 48)" }}>
                                                    {/* <Card.Img src={profile} style={{ height: 237, width: '97%' }} /> */}
                                                    {value.acf.image ? <>
                                                        <Image style={{ height: 237, width: '97%' }}
                                                            src={value.acf.image.url}
                                                            alt="new"
                                                        />
                                                    </> :
                                                        <Card.Img src={profile} style={{ height: 237, width: '97%' }} />}

                                                    <Card.Body>
                                                        <Card.Title >
                                                            <div className="text-center ">
                                                                <div className="row align-items-center">
                                                                    <div className="col-md-12">
                                                                        <h5>{value.name}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card.Title>
                                                        <button className="btn btn-primary" id="dropdown-basic-button" style={{ marginLeft: "90px" }} onClick={() => myUsersfunc(value)}>מידע נוסף
                                                        </button>
                                                        <br></br>
                                                        <br></br>
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
                                                <Card style={{ color: "#000", marginBottom: 15, border: "3px solid rgb(106 185 48)" }}>
                                                    {/* <Card.Img src={profile} style={{ height: 237, width: '97%' }} /> */}
                                                    {value.acf.image ? <>
                                                        <Image style={{ height: 237, width: '97%' }}
                                                            src={value.acf.image.url}
                                                            alt="new"
                                                        />
                                                    </> :
                                                        <Card.Img src={profile} style={{ height: 237, width: '97%' }} />}

                                                    <Card.Body>
                                                        <Card.Title >
                                                            <div className="text-center ">
                                                                <div className="row align-items-center">
                                                                    <div className="col-md-11">
                                                                        <h5>{value.name}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card.Title>
                                                        <button className="btn btn-primary" id="dropdown-basic-button" style={{ marginLeft: "90px" }} onClick={() => myUsersfunc(value)}>מידע נוסף
                                                        </button>
                                                        <br></br>
                                                        <br></br>

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
                                                <Card style={{ color: "#000", marginBottom: 15, border: "3px solid rgb(106 185 48)" }}>
                                                    {/* <Card.Img src={profile} style={{ height: 237, width: '97%' }} /> */}
                                                    {value.acf.image ? <>
                                                        <Image style={{ height: 237, width: '97%' }}
                                                            src={value.acf.image.url}
                                                            alt="new"
                                                        />
                                                    </> :
                                                        <Card.Img src={profile} style={{ height: 237, width: '97%' }} />}

                                                    <Card.Body>
                                                        <Card.Title >
                                                            <div className="text-center ">
                                                                <div className="row align-items-center">
                                                                    <div className="col-md-11">
                                                                        <h5>{value.name}</h5>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </Card.Title>
                                                        <button className="btn btn-primary" id="dropdown-basic-button" style={{ marginLeft: "90px" }} onClick={() => myUsersfunc(value)}>מידע נוסף
                                                        </button>
                                                        <br></br>
                                                        <br></br>
                                                    </Card.Body>
                                                </Card>
                                            </header>
                                        </div>
                                    )
                                })}</div>

                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}
export default Cards;