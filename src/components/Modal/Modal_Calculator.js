import React, { useState } from 'react';
import "./Modal.css";
import { RiAsterisk } from "react-icons/ri";


let get_title = ""
function Modal({ setOpenModal, propActionFlag, idsTasks }) {
    const [, settitle] = useState("");

    const handleTitleInput = (e) => {
        settitle(get_title = e.target.value)
    }
    console.log("idsTasks:", idsTasks)


    function Post_Route() {

        let url_post = `https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes`
        fetch(url_post, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
            },

            body: JSON.stringify({
                title: get_title,
                status: 'publish',

                fields: {
                    // tasks: obj.tasks[0].id,
                    tasks: idsTasks.map((e) => {
                        return e
                    })

                }
            })

        }).then(function (response) {
            return response.json();
        }).then(function (post) {

            console.log(post)
            window.location.replace("/planner")
        })

    }
    return (
        <>
            {!propActionFlag ? <>
                <div className="Background">
                    <div className="modalContainer">
                        <div className="titleCloseBtn">
                            <button
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                            > X
                            </button>
                        </div>
                        <div className="title">
                            <h3>נא לבחור את המסלולים ולבצע עליהם את הפעולה הרצויה למשל  </h3>
                            <h2 style={{ color: "red" }}>בנק הפועלים ∪ קפה קרולינה</h2>
                        </div>
                        <div className="body">

                        </div>
                        {/* <div className="footer">
                            <button className='cancelBtn'
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                            >
                                Cancel
                            </button>
                        </div> */}
                    </div>
                </div>
            </>
                :
                <div className="Background">
                    <div className="modalContainerCalculator">
                        <div className="titleCloseBtn">
                            <button
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                            > X
                            </button>
                        </div>
                        <div className="title">
                            <h4 style={{ textAlign: 'center', color: 'red' }}>בניית מסלול חדש</h4>
                        </div>
                        <div className="body">
                            <form id="IPU" className="w3-container">
                                <h6 style={{ textAlign: 'right' }}> :רשום את שם המסלול <RiAsterisk style={{ color: 'red' }} /></h6>
                                <p><input required={true} type="text" onChange={handleTitleInput} style={{
                                    textAlign: 'right',
                                    width: '420px',
                                    height: '35px'
                                }}></input></p>
                            </form>

                        </div>
                        <h6 style={{ textAlign: 'right' }}>?האם ברצונך לשמור מסלול זה</h6>
                        <div className="footer" style={{ textAlign: 'right' }}>
                            <button className='cancelBtn'
                                onClick={() => {
                                    setOpenModal(false);
                                }}
                            >                                לא
                            </button>
                            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <button className='continueBtn'
                                onClick={Post_Route}
                            >כן
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

export default Modal;