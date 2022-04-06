import React, { useState, useRef } from 'react';
import "./Modal.css";
import { FcMultipleInputs } from "react-icons/fc";
import { RiAsterisk } from "react-icons/ri";

let obj = { tasks: [], users: [] }
let get_Route_ID = 0;
let myParent = 0;
let getPicture, getSound;
let ichour = 'אישור'
let parentNum = 0;



function Modal_Tasks({ setOpenModalPlases, allStations }) {
    const [, set_obj] = useState(null);// for TextView
    const [, setDone] = useState(false);
    const [, setParent] = useState(0);
    const [get_title, settitle] = useState("");
    const [, setPicture] = useState(null);
    const [, setSound] = useState(null);
    const [getDescription, setDescription] = useState("");
    const fileInput = useRef(null)

    console.log("ModalTask AllStation in:", allStations)



    const handleTitleInput = (e) => {
        settitle(e.target.value)
    }
    const handleDescriptionInput = (e) => {
        setDescription(e.target.value)
    }

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];

        if ((file.type).includes('image')) {
            setPicture(getPicture = file)
            console.log(file)
        }

        if ((file.type).includes('audio')) {
            setSound(getSound = file)
            console.log(file)
        }
    }
    function Post_Task() {

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

            <div className="BackgroundTasks">
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
                        <h3><b>הוסף משימה</b></h3>
                        <form id="IPU" className="w3-container">
                            <h6>:רשום את שם המשימה <RiAsterisk style={{ color: 'red' }} /></h6>
                            <p><input required={true} type="text" onChange={handleTitleInput} style={{
                                textAlign: 'right',
                                width: '420px'
                            }}></input></p>
                        </form>
                        <form id="IPU" className="w3-container">
                            <h6>:תאר במשפט את משימה <RiAsterisk style={{ color: 'red' }} /></h6>
                            <p><input type="text" onChange={handleDescriptionInput} style={{
                                textAlign: 'right',
                                width: '420px'
                            }}></input></p>
                        </form>
                        <form id="IPU" className="w3-container">
                            <h6>: הוסף תמונה של משימה <FcMultipleInputs /></h6>
                            <div className="input-group mb-3">
                                <input required={true} accept=".png, .jpg, .jpeg" className='form-control' type="file" onChange={handleFileInput} style={{
                                    textAlign: 'right',
                                    width: '100%'
                                }} ></input>
                            </div>
                        </form>
                        <form id="IPU" className="w3-container">
                            <h6>: הוסף קטע קול המתאר את המשימה <FcMultipleInputs /></h6>
                            <p><input required={true} accept='.mp3' type="file" className='form-control' onChange={handleFileInput} style={{
                                textAlign: 'right',
                                width: '96%'
                            }}></input></p>

                            <div class="list-group">
                                <h6>:בחר את התחנות שברצונך לשייך את המשימה <RiAsterisk style={{ color: 'red' }} /></h6>
                                {allStations.map((value, index) => {
                                    return (
                                        <label key={index} class="list-group-item">
                                            <input class="form-check-input me-1" type="checkbox" value=""></input>
                                            {value.name}
                                        </label>
                                    )
                                })}
                            </div>
                        </form>

                    </div>
                    <div className="footer">
                        <input type="submit" className='OK' value={ichour} onClick={Post_Task} />

                    </div>

                </div>
            </div>
        </>
    );
}
export default Modal_Tasks;