import React, { useState, useRef } from 'react';
import "./Modal.css";
import { FcMultipleInputs } from "react-icons/fc";

let obj = { tasks: [], users: [] }
let get_Route_ID = 0;

function Modal_Plases({ setOpenModalPlases }) {
    const [, set_obj] = useState(null);// for TextView
    const [, setDone] = useState(false);
    const [get_title, settitle] = useState("");
    let [getPicture, setPicture] = useState(null);
    let [getSound, setSound] = useState(null);
    const [getDescription, setDescription] = useState("");
    const fileInput = useRef(null)


    const handleFileInput = (e) => {
        // handle validations
        const image = e.target.files[0];
        const sound = e.target.files[1];

        setPicture(getPicture = image)
        setSound(getSound = sound)
        console.log(image)
        console.log(sound)
        // if(file.type.contains('image')){
        //     setPicture(getPicture = file)
        //     console.log(file)
        // }
        
        // if(file.type.contains('mp3')){
        //     setSound(getSound = file)
        //     console.log(file)
        // }
        
      };

    function Post_Place() {
        console.log(getPicture)
        console.log(getSound)
        // setPicture(getPicture = HTMLInputElement.files)
        // setSound(getSound = HTMLInputElement.files[1])

        // if (JSON.parse(localStorage.getItem('New_Routes')) === null) {
        //     alert('Route is empty ! ');
        //     return
        // }
        // else {
        //     set_obj(obj.tasks = JSON.parse(localStorage.getItem('New_Routes')));
        //     console.log("obj : ", obj)

        //     let url_post = `https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes`
        //     fetch(url_post, {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
        //         },

        //         body: JSON.stringify({


        //         })

        //     }).then(function (response) {
        //         return response.json();
        //     }).then(function (post) {
        //         get_Route_ID = post.id
        //         setDone(true)

        //         alert(get_Route_ID)
        //         console.log(post)
        //         window.location.replace("/planner")
        //     })
        // }
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
                            <p>:רשום את שם האתר <FcMultipleInputs /></p>
                            <p><input type="text" style={{
                                textAlign: 'right',
                                width: '350px'
                            }}></input></p>
                        </form>
                        <form id="IPU" className="w3-container">
                            <p>:תאר במשפט את האתר <FcMultipleInputs /></p>
                            <p><input type="text" style={{
                                textAlign: 'right',
                                width: '350px'
                            }}></input></p>
                        </form>
                        <form id="IPU" className="w3-container">
                            <p>:הוסף תמונה של האתר  <FcMultipleInputs /></p>
                            <div className="input-group mb-3">
                                <input accept=".png, .jpg, .jpeg" className='form-control' id='input_file_1' type="file" onChange={handleFileInput} style={{
                                    textAlign: 'right',
                                    width: '350px'
                                }} ></input>
                            </div>
                        </form>
                        <form id="IPU" className="w3-container">
                            <p>:הוסף קטע קול המתאר את האתר <FcMultipleInputs /></p>
                            <p><input accept='.mp3' type="file" onChange={handleFileInput} style={{
                                textAlign: 'right',
                                width: '350px'
                            }}></input></p>
                        </form>

                    </div>
                    <div className="footer">

                        <button className='OK'
                            onClick={Post_Place}
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
export default Modal_Plases;