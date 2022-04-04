import React, { useState } from 'react';
import "./Modal.css";
import { FcMultipleInputs } from "react-icons/fc";

let obj = { tasks: [], users: [] }
let get_Route_ID = 0;

function Modal_Tasks({ setOpenModalPlases }) {
    const [, set_obj] = useState(null);// for TextView
    const [, setDone] = useState(false);


    function Post_Route() {

        if (JSON.parse(localStorage.getItem('New_Routes')) === null) {
            alert('Route is empty ! ');
            return
        }
        else {
            set_obj(obj.tasks = JSON.parse(localStorage.getItem('New_Routes')));
            console.log("obj : ", obj)

            let url_post = `https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes`
            fetch(url_post, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                },

                body: JSON.stringify({


                })

            }).then(function (response) {
                return response.json();
            }).then(function (post) {
                get_Route_ID = post.id
                setDone(true)

                alert(get_Route_ID)
                console.log(post)
                window.location.replace("/planner")
            })
        }
    }
    return (
        <>
            <div className="BackgroundPlases">
                <div className="modalContainerPlases">
                    <div className="titleCloseBtnPlases">
                        <button
                            onClick={() => {
                                setOpenModalPlases(false);
                            }}
                        >
                            X
                        </button>
                    </div>
                    <div className="title">

                    </div>
                    <div className="body">
                        <form id="IPU" className="w3-container">
                            <p>:רשום את שם המשימה <FcMultipleInputs /></p>
                            <p><input type="text" style={{
                                textAlign: 'right',
                                width: '350px'
                            }}></input></p>
                        </form>
                        <form id="IPU" className="w3-container">
                            <p>:תאר במשפט את המשימה <FcMultipleInputs /></p>
                            <p><input type="text" style={{
                                textAlign: 'right',
                                width: '350px'
                            }}></input></p>
                        </form>
                        <form id="IPU" className="w3-container">
                            <p>:הוסף תמונה של המשימה  <FcMultipleInputs /></p>
                            <p><input type="text" style={{
                                textAlign: 'right',
                                width: '350px'
                            }}></input></p>
                        </form>
                        <form id="IPU" className="w3-container">
                            <p>:הוסף קטע קול המתאר את המשימה <FcMultipleInputs /></p>
                            <p><input type="text" style={{
                                textAlign: 'right',
                                width: '350px'
                            }}></input></p>
                        </form>

                    </div>
                    <div className="footer">

                        <button className='OK'
                            onClick={Post_Route}
                        >
                            אישור
                        </button>
                        {/* <button className='cancelBtn'
                            onClick={() => {
                                setOpenModalPlases(false);
                            }}
                        >
                            Cancel
                        </button> */}
                    </div>

                </div>
            </div>
        </>
    );
}
export default Modal_Tasks;