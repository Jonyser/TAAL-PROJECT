import React, { useState } from 'react';
import "./Modal.css";
import { FcMultipleInputs } from "react-icons/fc";
import { RiAsterisk } from "react-icons/ri";
import Modal_Loading from "./Modal_Loading";
//--------------------------
let getPicture, getSound;
let ichour = 'אישור'
let parentNum = 0;
let file = {};
let flagClickOK = false;
//--------------------------
function Modal_Plases({ setOpenModalPlaces }) {
    const [get_title, setTitle] = useState("");
    const [getDescription, setDescription] = useState("");
    const [, setSound] = useState(null);
    const [, setPicture] = useState(null);
    const [, setFile] = useState({});
    const [, setFlagClickOK] = useState(false);

    //----------------------------------
    const handleTitleInput = (e) => {
        setTitle(e.target.value)
    }
    //----------------------------------
    const handleDescriptionInput = (e) => {
        setDescription(e.target.value)
    }
    //----------------------------------
    const handleFileInput = (e) => {
        setFile(file = e.target.files[0]);
        console.log("File:", file)
        if ((file.type).includes('image')) {
            setPicture(getPicture = file)
        }
        if ((file.type).includes('audio')) {
            setSound(getSound = file)
            alert("file:", getPicture)
        }
    };
    //----------------------------------
    function Post_Place() {

        // console.log("Picture from post function", getPicture)
        // console.log("Sound from post function", getSound)
        // console.log("Title from post function", get_title)
        // console.log("Description from post function", getDescription)


        console.log("get_title:", get_title)
        if (get_title === "" || getDescription === "") {
            alert("עליך למלא שדות חובה המסומנים בכוכבית")
        }
        else {
            setFlagClickOK(flagClickOK = true)
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
                    parent: parentNum,
                    fields: [{
                        qr: false,
                        defaultPath: "str",
                        image: file,
                        audio: getSound
                    }]
                    // "title": get_title,
                    // "fields": [
                    //     {
                    //         "key": "field_602fcb1e9b14a",
                    //         "label": file,
                    //         "name": "image",
                    //         "type": "image",
                    //         "instructions": "",
                    //         "required": 1,
                    //         "conditional_logic": 0,

                    //     },
                    // ],
                })
            }).then(function (response) {
                return response.json();
            }).then(function (post) {
                console.log("post:", post)
                if (post.message === "כבר יש מונח עם אותו שם ועם אותו הורה.")
                    alert("כבר יש אתר עם אותו שם, בחר/י בשם אחר")
                else {
                    setFlagClickOK(flagClickOK = false);
                    window.location.replace("/planner");
                }
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
                                setOpenModalPlaces(false);
                            }}
                        >
                            X
                        </button>
                    </div>
                    <div className="title">
                        <h3><b>הוסף אתר</b></h3>
                    </div>
                    <div className="body">
                        <form id="IPU" className="w3-container">
                            <h6>:רשום את שם האתר <RiAsterisk style={{ color: 'red' }} /></h6>
                            <p><input required={true} type="text" onChange={handleTitleInput} style={{
                                textAlign: 'right',
                                width: '420px'
                            }}></input></p>
                        </form>
                        <form id="IPU" className="w3-container">
                            <h6>:תאר במשפט את האתר <RiAsterisk style={{ color: 'red' }} /></h6>
                            <p><input type="text" onChange={handleDescriptionInput} style={{
                                textAlign: 'right',
                                width: '420px'
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
                        <input type="submit" className='OK' value={ichour} onClick={Post_Place} />
                    </div>
                    {flagClickOK ? <><Modal_Loading props={false} /></> : <></>}
                </div>
            </div>
        </>
    );
}
export default Modal_Plases;