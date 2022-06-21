import React, { useState, useEffect } from 'react';
import './style.css';
import { FcOk } from "react-icons/fc";
import Places from '../Places/Places';
import 'reactjs-popup/dist/index.css';
import Modal from '../Modal/Modal';

//-------------------------
const Planner = () => {

    const [get_logged_in, setLogged_in] = useState(false);// for TextView
    const [get_Name, setName] = useState(null);// for TextView
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                setLogged_in(sessionStorage.getItem('logged_in'))
                // getData();
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    //-------------------input-------------------------
    function getName(val) {
        setName(val.target.value)
    }
    return (
        <>
            {!get_logged_in ? <div style={{color:"white"}}>Please connect properly !</div>:
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
            }
            
        </>
    );
}
export default Planner;
