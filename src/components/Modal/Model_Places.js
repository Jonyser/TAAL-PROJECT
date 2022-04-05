import React, { useState, useRef } from 'react';
import "./Modal.css";
import { FcMultipleInputs } from "react-icons/fc";

let obj = { tasks: [], users: [] }
let get_Route_ID = 0;
let getPicture,getSound;
let ichour = 'אישור'


function Modal_Plases({ setOpenModalPlases }) {
    const [, set_obj] = useState(null);// for TextView
    const [, setDone] = useState(false);
    const [get_title, settitle] = useState("");
    const [, setPicture] = useState(null);
    const [, setSound] = useState(null);
    const [getDescription, setDescription] = useState("");
    const fileInput = useRef(null)


    const handleTitleInput = (e)=>{
        settitle(e.target.value)
    }
    const handleDescriptionInput = (e)=>{
        setDescription(e.target.value)
    }

    const handleFileInput = (e) => {
        // handle validations
        const file = e.target.files[0];

        if((file.type).includes('image')){
            setPicture(getPicture = file)
            console.log(file)
        }

        if((file.type).includes('audio')){
            setSound(getSound = file)
            console.log(file)
        }

      };

    function Post_Place() {
        console.log("Picture from post function",getPicture)
        console.log("Sound from post function",getSound)
        console.log("Title from post function",get_title)
        console.log("Description from post function",getDescription)

        if (getPicture == null || getSound == null) {
            alert('Please provide an image and a sound')
            return
        }
        else {
            set_obj(obj.tasks = JSON.parse(localStorage.getItem('New_Routes')));
            console.log("obj : ", obj)

            let url_post = `https://s83.bfa.myftpupload.com/wp-json/wp/v2/places`
            fetch(url_post, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                },

                body: JSON.stringify({
                    name: get_title,
                    description: getDescription,
                    fields:{
                        audio: getSound,
                        image: getPicture
                    }


                })

            }).then(function (response) {
                return response.json();
            }).then(function (post) {
               
                console.log(post)
                // window.location.replace("/planner")
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
                        <h3><b>הוסף אתר</b></h3>
                        <form id="IPU" className="w3-container">
                            <h6>:רשום את שם האתר <FcMultipleInputs /></h6>
                            <p><input required={true} type="text" onChange={handleTitleInput} style={{
                                textAlign: 'right',
                                width: '350px'
                            }}></input></p>
                        </form>
                        <form id="IPU" className="w3-container">
                            <h6>:תאר במשפט את האתר <FcMultipleInputs /></h6>
                            <p><input type="text" onChange={handleDescriptionInput} style={{
                                textAlign: 'right',
                                width: '350px'
                            }}></input></p>
                        </form>
                        <form id="IPU" className="w3-container">
                            <h6>: הוסף תמונה של האתר <FcMultipleInputs /></h6>
                            <div className="input-group mb-3">
                                <input required={true} accept=".png, .jpg, .jpeg" className='form-control' type="file" onChange={handleFileInput} style={{
                                    textAlign: 'right',
                                    width: '100%'
                                }} ></input>
                            </div>
                        </form>
                        <form id="IPU" className="w3-container">
                            <h6>: הוסף קטע קול המתאר את האתר <FcMultipleInputs /></h6>
                            <p><input required={true} accept='.mp3' type="file" className='form-control' onChange={handleFileInput} style={{
                                textAlign: 'right',
                                width: '96%'
                            }}></input></p>
                        </form>

                    </div>
                    <div className="footer">
                        <input type="submit" className='OK' value={ichour} onClick={Post_Place}/>
                        {/* <button type='submit' className='OK'
                            onClick={Post_Place}
                        >
                            אישור
                        </button> */}
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