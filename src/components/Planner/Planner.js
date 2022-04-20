import React, { useState, useEffect } from 'react';
import './style.css';
// import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcMultipleInputs } from "react-icons/fc";
import Places from '../Places/Places';
import 'reactjs-popup/dist/index.css';
import Modal from '../Modal/Modal';
import { get } from "../../api/api";
// import { Dropdown, DropdownButton } from 'react-bootstrap';
// import { Form } from "react-bootstrap";
let resultData = [];

const Planner = () => {
    const [get_Name, setName] = useState(null);// for TextView
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [, setResultData] = useState([]);
    // const [val, setVal] = useState();
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
        // taal.tech/wp-json/wp/v2/places
        ///s83.bfa.myftpupload.com/wp-json/wp/v2/places
        await get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes/', {

            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }

        }).then(res => {
            setResultData(resultData = res)
            console.log("result from planer:", resultData)
        })
    }

    //-------------------input-------------------------
    function getName(val) {
        setName(val.target.value)
    }
    return (
        <>
            {loading && <div>Loading</div>}
            {!loading && (
                <>
                    <div className="Planner" style={{
                        backgroundColor: 'rgb(213, 221, 228)',
                        overflow: "hidden",
                    }}>
                        <div className="Actions">
                            {/* <DropdownButton className="d-inline p-3 text-white" title="שכפל מסלול"
                            >
                                <div className="col-3">{resultData.map((value, index) => {
                                    return (
                                        <div key={index} className='App'>
                                            <header className='dropD' key={index}>
                                                <Dropdown.Item key={index} >
                                                    {value.title.rendered}
                                                </Dropdown.Item>
                                            </header>
                                        </div>
                                    )
                                })}</div>

                            </DropdownButton>) */}


                            {/* <button
                                style={{
                                    margin: "22px",
                                    padding: "20px",
                                    width: "250px",
                                    height: "70px",
                                    color: "white",
                                    backgroundColor: "rgba(74, 94, 114, 0.9)",
                                    borderColor: "rgba(74, 94, 114, 0.9)",
                                    borderRadius: "20px",
                                    border: "1px solid transparent",
                                    position: "relative",
                                    fontSize: "28px",
                                    lineHeight: "32px",
                                    fontFamily: "ReformaNarrowMedium",
                                    fontWeight: "400",
                                    display: "inline-block",
                                    whiteSpace: "nowrap"
                                }}> שכפל מסלול
                                <GrDuplicate className='icon' />
                                <Form.Select
                                    value={val} onChange={(e) => setVal(e.target.value)} >



                                    {resultData.map((value, index) => {
                                        const { name, id } = value;

                                        return <option key={index} value={id}>
                                            {value.title.rendered.replace("&#8211;", "-").replace("&#8217;", "'")}

                                        </option>;

                                    })}

                                </Form.Select>
                            </button> */}

                            {/* <button className='AddRoute' > שייך מסלול לחניך  <FcLink className='icon' /></button> */}
                            {/* <button className='AddRoute' > שכפל מסלול  <GrDuplicate className='icon' /></button> */}


                            {/* 
                            <button className='AddRoute'
                                // onClick={Post_Route}
                                onClick={() => {
                                    setModalOpen(true);
                                }}
                            > שמור מסלול  <FcOk className='icon' /> </button> */}
                            {/* <form id="IPU" className="w3-container">
                                <p id="titleIPU">:רשום את שם המסלול <FcMultipleInputs /></p>
                                <p><input className="w3-input w3-hover-green" type="text" onChange={getName} style={{
                                    textAlign: 'right',
                                    width: '290px'
                                }}></input></p>
                            </form> */}




                            <button className="AddRoute" type="submit"
                                onClick={() => {
                                    setModalOpen(true);
                                }}
                            >שמור מסלול</button>

                            <input dir='rtl' type="text" className="form-control custom-search-input" onChange={getName} placeholder="רשום את שם המסלול"
                                style={{ fontSize: "x-large" }}>

                            </input>
                        </div>

                        {modalOpen && <Modal setOpenModal={setModalOpen} setText={get_Name} />}


                        <div>
                            <Places />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
export default Planner;