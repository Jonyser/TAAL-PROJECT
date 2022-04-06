import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import './style.css';
import ReactLoading from 'react-loading';
import Modal_Calculator from '../Modal/Modal_Calculator'
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


let actionMode = "";
let actionFlag = false;
let helpFlag = false;
let arrayIdTasks = []

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
    const [, setActionMode] = useState("");
    const [, setArrayIdTasks] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [, setActionFlag] = useState(false);
    const [, setHelpFlag] = useState(false);


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
            setArrayIdTasks(arrayIdTasks = []) // reset array
            setActionMode(actionMode = "")
        }
        if (actionMode === "") {

            setArrayIdTasks(val.myTasks.map((value) => {
                arrayIdTasks.push(value.ID)
            }))
            setActionFlag(actionFlag = false);
        }
        if (actionMode === "∪") {

            setArrayIdTasks(val.myTasks.map((value) => {
                arrayIdTasks.push(value.ID)

            }))
            setActionFlag(actionFlag = true);
        }
        //------------------------------
        if (actionMode === "∩") {
            let tempArray = [];
            val.myTasks.forEach(element => {
                for (let i = 0; i < arrayIdTasks.length; i++) {
                    if (element.ID === arrayIdTasks[i]) {
                        tempArray.push(element.ID)
                    }
                }
            })
            setArrayIdTasks(arrayIdTasks = [])
            setArrayIdTasks(arrayIdTasks = tempArray)
            setActionFlag(actionFlag = true);
        }
        //------------------------------
        if (actionMode === "-") {
            let tempArray = [];
            let newTempArray = [];
            val.myTasks.forEach(element => {
                for (let i = 0; i < arrayIdTasks.length; i++) {
                    if (element.ID === arrayIdTasks[i]) {
                        tempArray.push(element.ID)
                    }
                }
            })
            for (let i = 0; i < arrayIdTasks.length; i++) {
                let flag = false;
                for (let j = 0; j < tempArray.length; j++) {
                    if (tempArray[j] === arrayIdTasks[i]) {
                        flag = true;
                    }
                }
                if (!flag) {
                    newTempArray.push(arrayIdTasks[i])
                }
            }
            setArrayIdTasks(arrayIdTasks = [])
            setArrayIdTasks(arrayIdTasks = newTempArray)
            setActionFlag(actionFlag = true);
        }
        setTextview(textview.value += "(" + val.myTitle + ")")
        Has_already_been_typed = true;
        console.log("arrayIdTasks:", arrayIdTasks)
    }
    //--------------------------------------------------------------
    const Action = (val) => {
        textview = document.forms['myForm']['textview']
        if (Has_already_been_typed) {
            setTextview(textview.value += val)
            setActionMode(actionMode = val) // save the action choice 
            Has_already_been_typed = false;
        }
    }
    //--------------------------------------------------------------
    const reset = () => {
        window.location.replace("/Calculator")
    }
    const help = () => {
        setHelpFlag(helpFlag = true)
        setModalOpen(true);
    }
    //--------------------------------------------------------------
    return (
        <>
            <div className="d-flex justify-content-center">
                {!done ? <>
                    <h1 float={'right'}>Loading</h1>
                    < ReactLoading type={"bars"} className='loading' color={"rgb(180, 175, 199)"} height={'10%'} width={'10%'} />
                </>
                    :
                    <>
                        {modalOpen && <Modal_Calculator setOpenModal={setModalOpen} idsTasks={arrayIdTasks} propActionFlag={actionFlag} helpProps={helpFlag} />}
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


                                    <input type="button" className="col-2" id="btnsOrange" value="AC" onClick={() => reset("value")}  ></input>
                                    <input type="button" className="col-2" id="btnsOrange" value="Enter" onClick={() => {
                                        setModalOpen(true);
                                        setHelpFlag(helpFlag = false)

                                    }}></input>
                                </div>
                                <div className="row" id="dataFromServerButton">
                                    <div className="col-3">{dataCards1.map((value, index) => {
                                        return (
                                            <div key={index} className='App'>
                                                <header key={index}>
                                                    <button className='btnRoute' onClick={() => calc(value)} style={{ marginBottom: 15, height: 80, width: 100, borderRadius: "10px" }}>
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
                                                    <button className='btnRoute' onClick={() => calc(value)} style={{ marginBottom: 15, height: 80, width: 100, borderRadius: "10px" }}>

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
                                                    <button className='btnRoute' onClick={() => calc(value)} style={{ marginBottom: 15, height: 80, width: 100, borderRadius: "10px" }}>
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
                                                    <button className='btnRoute' onClick={() => calc(value)} style={{ marginBottom: 15, height: 80, width: 100, borderRadius: "10px" }}>
                                                        <div className='f' style={{ fontSize: "12px" }}>{value.myTitle}</div>
                                                    </button>
                                                </header>
                                            </div>
                                        )
                                    })} </div>
                                </div>
                                <input type="button" className="col-2" id="btnsOrange" value="Help" onClick={() => {
                                    help()

                                }}  ></input>

                            </div>

                        </div>

                    </>
                }
            </div>
        </>
    );
}
export default Calculator;