import React, { useState, useEffect } from 'react';
import './style.css';
// import { GrDuplicate } from "react-icons/gr";
import { FcOk } from "react-icons/fc";
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
        // /s83.bfa.myftpupload.com/wp-json/wp/v2/places
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
                <div className="Planner" style={{
                    backgroundColor: 'rgb(213, 221, 228)',
                    overflow: "hidden",
                }}>
                    <div className="Actions">
                        <button className="AddRoute" type="submit"
                            onClick={() => {
                                setModalOpen(true);
                            }}
                        >  שמור מסלול &nbsp;&nbsp;<FcOk className='icon' /></button>
                        <input dir='rtl' type="text" className="form-control custom-search-input" onChange={getName} placeholder="רשום את שם המסלול"
                            style={{ fontSize: "x-large" }}>

                        </input>
                    </div>
                    {modalOpen && <Modal setOpenModal={setModalOpen} setText={get_Name} />}
                    <div>
                        <Places />
                    </div>
                </div>
            )}
        </>
    );
}
export default Planner;
