import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import './style.css';
import ReactLoading from 'react-loading';
// import Dot from '../Dot/Dot'

let dataCards = [];
let dataCards1 = [];
let dataCards2 = [];
let dataCards3 = [];
let dataCards4 = [];
let flag_show_page = false;
let size = 0;
let index = 0;
let sizeMod = 0;
const number = 4;
let textview = '';
let Has_already_been_typed = false;


const Calculator = () => {
    const [done, setDone] = useState(false);
    const [, setLoading] = useState(false);
    const [, setDataCards] = useState([]);
    const [, setDataCards1] = useState([]);
    const [, setDataCards2] = useState([]);
    const [, setDataCards3] = useState([]);
    const [, setDataCards4] = useState([]);
    const [, setFlag] = useState(false);
    const [, setTextview] = useState();

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
        // https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/
        // https://taal.tech/wp-json/wp/v2/routes/
        if (flag_show_page === false)
            await get('https:///s83.bfa.myftpupload.com/wp-json/wp/v2/routes/', {
                params: {
                    per_page: 99, 'Cache-Control': 'no-cache'
                }
            }).then(res => {
                size = res.length / number;

                setDataCards(
                    dataCards = res.map((value
                    ) => {
                        return {
                            myUsers: value.acf.users,
                            myTitle: value.title.rendered.replace("&#8211;", "-").replace("&#8217;", "'"),
                            myTasks: value.acf.tasks,
                            myId: value.id
                        }
                    })
                )

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
    //-------------------------------------------------------------
    const calc = (val) => {

        textview = document.forms['myForm']['textview']
        if (Has_already_been_typed) {
            setTextview(textview.value = "")


        }
        setTextview(textview.value += "(" + val.myTitle + ")")

        Has_already_been_typed = true;
    }
    //--------------------------------------------------------------
    const Action = (val) => {
        textview = document.forms['myForm']['textview']
        if (Has_already_been_typed) {
            setTextview(textview.value += val)
            Has_already_been_typed = false;
        }

    }
    const enter = () => {
    }
    //--------------------------------------------------------------
    return (
        <>
        <div class="d-flex justify-content-center">
            {!done ? <>
                <h1 float={'right'}>Loading</h1>
                < ReactLoading type={"bars"} className='loading' color={"rgb(180, 175, 199)"} height={'10%'} width={'10%'} />
            </>
                :
                <>
                    <div className="row">
                        <div id="TaskShow" className='col-4 '></div>
                        <div className='col-4 ' id="containerCalc" style={{ width: "600px" }}>
                            <form name="myForm">
                                <input type="text" className='textview' id='textview' disabled ></input>
                            </form>
                            <div className="row">
                                <input type="button" className="col-2" id="btns" value="∪" onClick={() => Action('∪')} ></input>
                                <input type="button" className="col-2" id="btns" value="∩" onClick={() => Action('∩')}></input>
                                <input type="button" className="col-2" id="btns" value="\" onClick={() => Action("-")}></input>
                                <input type="button" className="col-2" id="btns" value="⨁" onClick={() => Action('⨁')}></input>
                            </div>
                            <div className="row">
                                <div className="col-3">{dataCards1.map((value, index) => {
                                    return (
                                        <div key={index} className='App'>
                                            <header key={index}>
                                                <button className='btnRoute' onClick={() => calc(value)} style={{ color: "#000", marginBottom: 15, height: 80, width: 100, borderRadius: "10px" }}>
                                                    <div className='f' style={{ fontSize: "12px" }}>{value.myTitle}</div>
                                                </button>
                                            </header>
                                        </div>
                                    )
                                })}</div>
                                <div className="col-3">{dataCards2.map((value, index) => {
                                    return (
                                        <div key={index} className='App'>
                                            <header key={index}>
                                                <button className='btnRoute' onClick={() => calc(value)} style={{ color: "#000", marginBottom: 15, height: 80, width: 100, borderRadius: "10px" }}>

                                                    <div className='f' style={{ fontSize: "12px" }}>{value.myTitle}</div>
                                                </button>
                                            </header>
                                        </div>
                                    )
                                })}</div>
                                <div className="col-3">{dataCards3.map((value, index) => {
                                    return (
                                        <div key={index} className='App'>
                                            <header key={index}>
                                                <button className='btnRoute' onClick={() => calc(value)} style={{ color: "#000", marginBottom: 15, height: 80, width: 100, borderRadius: "10px" }}>
                                                    <div className='f' style={{ fontSize: "12px" }}>{value.myTitle}</div>
                                                </button>
                                            </header>
                                        </div>
                                    )
                                })}</div>
                                <div className="col-3">{dataCards4.map((value, index) => {
                                    return (
                                        <div key={index} className='App'>
                                            <header key={index}>
                                                <button className='btnRoute' onClick={() => calc(value)} style={{ color: "#000", marginBottom: 15, height: 80, width: 100, borderRadius: "10px" }}>
                                                    <div className='f' style={{ fontSize: "12px" }}>{value.myTitle}</div>
                                                </button>
                                            </header>
                                        </div>
                                    )
                                })} </div>
                            </div>
                            <div className="row">
                                <input type="button" className="col-2" id="btnsOrange" value="AC" onClick={() => calc("value")}  ></input>
                                <input type="button" className="col-2" id="btnsOrange" value="Enter" onClick={() => enter("value")} ></input>
                            </div>
                        </div>
                    </div>
                </>
            }
            </div>
        </>
    );
}
export default Calculator;