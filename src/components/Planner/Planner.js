import React, { useState, useEffect } from 'react';
import './style.css';
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink, FcMultipleInputs } from "react-icons/fc";
import Places from '../Places/Places';
import 'reactjs-popup/dist/index.css';
import Modal from '../Modal/Modal'


const Planner = () => {
    const [get_Name, setName] = useState(null);// for TextView
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
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
            {loading && <div>Loading</div>}
            {!loading && (
                <>
                    <div className="Planner">

                        <div className="Actions">
                            <button className='AddRoute' > שייך מסלול לחניך  <FcLink className='icon' /></button>
                            <button className='AddRoute' > שכפל מסלול  <GrDuplicate className='icon' /></button>
                            <button className='AddRoute'
                                // onClick={Post_Route}
                                onClick={() => {
                                    setModalOpen(true);

                                }}
                            > שמור מסלול  <FcOk className='icon' /> </button>
                        </div>
                        {/* <button
                        className="openModalBtn"
                        onClick={() => {
                            setModalOpen(true);
                        }}
                        >
                        Open
                    </button> */}
                        {modalOpen && <Modal setOpenModal={setModalOpen} setText={get_Name} />}


                        <form id="IPU" className="w3-container">
                            <p id="titleIPU">:רשום את שם המסלול <FcMultipleInputs /></p>
                            <p><input className="w3-input w3-hover-green" type="text" onChange={getName} style={{
                                textAlign: 'right',
                                width: '290px'
                            }}></input></p>
                        </form>

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
