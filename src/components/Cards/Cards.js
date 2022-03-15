import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import './style.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.css';
import { Dropdown, DropdownButton, Card } from 'react-bootstrap';
import img1 from '../../Pictures/img1.png';
import img2 from '../../Pictures/img2.png';
import img3 from '../../Pictures/img3.png';
import img4 from '../../Pictures/img6.png';
//----------------------------------------------------|
let dataCards = [];//                                 |
let dataCards1 = [];//                                |
let dataCards2 = [];//                                |
let dataCards3 = [];//                                |
let dataCards4 = [];//                                |
let flag = false;//                                   |
let size = 0;//                                       |
let index = 0;//                                      |
let sizeMod = 0;//                                    |
const number = 4;//                                   |
//----------------------------------------------------|
const Cards = () => {
    const [, setLoading] = useState(false);
    const [, setDataCards] = useState([]);
    const [, setDataCards1] = useState([]);
    const [, setDataCards2] = useState([]);
    const [, setDataCards3] = useState([]);
    const [, setDataCards4] = useState([]);
    const [, setFlag] = useState(false);

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
        if (flag === false)
            await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/', {
                params: {
                    per_page: 99
                }
            }).then(res => {
                // console.log("resres:", res)
                size = res.length / number;

                // console.log("dataCards:", dataCards)
                // console.log("flag:", flag)
                if (flag === false) {
                    setDataCards(

                        dataCards = res.map((value
                        ) => {
                            // console.log("value :", value)
                            return {
                                myUsers: value.acf.users,
                                myTitle: value.title.rendered.replace("&#8211;", "-").replace("&#8217;", "'"),
                                myTasks: value.acf.tasks,
                                myId: value.id
                            }
                        })
                    )
                }
                // console.log("dataCards:", dataCards)
                sizeMod = dataCards.length % number;
                size = (dataCards.length - sizeMod) / number;
                // console.log("size", size)
                // console.log(flag)

                if (flag === false) {
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
                }
                setFlag(flag = true)
                sizeMod = dataCards.length % number;
                size = (dataCards.length - sizeMod) / number;
            });
    }
    return (
        <>
            <div className='container'>
                <div className="row">
                    <div className="col-3">{dataCards1.map((value, index) => {
                        return (
                            <div key={index} className='App'>
                                <header key={index}>
                                    <Card style={{ color: "#000", marginBottom: 15, border: "2px solid rgba(0, 0, 0, 0.125)" }}>
                                        {/* display_name */}
                                        <Card.Img src={img1} style={{ height: 237 }} />
                                        <Card.Body>
                                            <Card.Title >
                                                <div className="text-center ">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-11">
                                                            <h5>{value.myTitle}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Title>
                                            <DropdownButton className="d-inline p-3 text-white" id="dropdown-basic-button" title="משימות" >
                                                {value.myTasks ? <>
                                                    {value.myTasks.map((val, index) =>
                                                        <Dropdown.Item key={index} >
                                                            {val.post_title}
                                                        </Dropdown.Item>)} </>
                                                    : <> <Dropdown.Item href="#/action-1">
                                                        לא קיים
                                                    </Dropdown.Item>
                                                    </>}
                                            </DropdownButton>
                                            <DropdownButton className="d-inline p-3  text-white" id="dropdown-basic-button" title="משוייך ל"  >
                                                {value.myUsers ? <>
                                                    {value.myUsers.map((val, index) =>
                                                        <Dropdown.Item key={index} >
                                                            {val.display_name}
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
                                    <Card style={{ color: "#000", marginBottom: 15, border: "2px solid rgba(0, 0, 0, 0.125)" }}>
                                        <Card.Img src={img2} style={{ height: 237 }} />
                                        <Card.Body>
                                            <Card.Title >
                                                <div className="text-center ">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-11">
                                                            <h5>{value.myTitle}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Title>
                                            <DropdownButton className="d-inline p-3 text-white" id="dropdown-basic-button" title="משימות" >
                                                {value.myTasks ? <>
                                                    {value.myTasks.map((val, index) =>
                                                        <Dropdown.Item key={index} >
                                                            {val.post_title}
                                                        </Dropdown.Item>)} </>
                                                    : <> <Dropdown.Item href="#/action-1">
                                                        לא קיים
                                                    </Dropdown.Item>
                                                    </>}
                                            </DropdownButton>
                                            <DropdownButton className="d-inline p-3 text-white" id="dropdown-basic-button" title="משוייך ל" >
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
                    <div className="col-3">{dataCards3.map((value, index) => {
                        return (
                            <div key={index} className='App'>
                                <header key={index} >
                                    <Card style={{ color: "#000", marginBottom: 15, border: "2px solid rgba(0, 0, 0, 0.125)" }}>
                                        <Card.Img src={img3} style={{ height: 237 }} />
                                        <Card.Body>
                                            <Card.Title >
                                                <div className="text-center ">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-11">
                                                            <h5>{value.myTitle}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Title>
                                            <DropdownButton className="d-inline p-3 text-white" id="dropdown-basic-button" title="משימות" >
                                                {value.myTasks ? <>
                                                    {value.myTasks.map((val, index) =>
                                                        <Dropdown.Item key={index} >
                                                            {val.post_title}
                                                        </Dropdown.Item>)} </>
                                                    : <> <Dropdown.Item href="#/action-1">
                                                        לא קיים
                                                    </Dropdown.Item>
                                                    </>}
                                            </DropdownButton>
                                            <DropdownButton className="d-inline p-3  text-white" id="dropdown-basic-button" title="משוייך ל" >
                                                {value.myUsers ? <>
                                                    {value.myUsers.map((value, index) =>
                                                        <Dropdown.Item key={index} >
                                                            {value.display_name}
                                                        </Dropdown.Item>)}
                                                </> : <>
                                                    <Dropdown.Item href="#/action-1">
                                                        אינו משוייך
                                                    </Dropdown.Item></>}
                                            </DropdownButton>
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
                                    <Card style={{ color: "#000", marginBottom: 15, border: "2px solid rgba(0, 0, 0, 0.125)" }}>

                                        <Card.Img src={img4} style={{ height: 237 }} />
                                        <Card.Body>
                                            <Card.Title >
                                                <div className="text-center ">
                                                    <div className="row align-items-center">
                                                        <div className="col-md-11">
                                                            <h5>{value.myTitle}</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card.Title>
                                            <DropdownButton className="d-inline p-3 " id="dropdown-basic-button" title="משימות" >
                                                {value.myTasks ? <>
                                                    {value.myTasks.map((val, index) =>
                                                        <Dropdown.Item key={index} >

                                                            {val.post_title}
                                                        </Dropdown.Item>)} </>
                                                    : <> <Dropdown.Item href="#/action-1">
                                                        לא קיים
                                                    </Dropdown.Item>
                                                    </>}
                                            </DropdownButton>
                                            <DropdownButton className="d-inline p-3 " id="dropdown-basic-button" title="משוייך ל" >
                                                {value.myUsers ? <>
                                                    {value.myUsers.map((value, index) =>
                                                        <Dropdown.Item key={index} >

                                                            {value.display_name}
                                                        </Dropdown.Item>)}
                                                </> : <>
                                                    <Dropdown.Item href="#/action-1">
                                                        אינו משוייך
                                                    </Dropdown.Item></>}
                                            </DropdownButton>
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