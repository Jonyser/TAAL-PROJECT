import React, { useState, useEffect } from 'react';
import "./Modal.css";
import { FcOk, FcLink, FcMultipleInputs } from "react-icons/fc";


let obj = { tasks: [], users: [] }
let get_Route_ID = 0;


function Modal({ setOpenModal, setText }) {
    const [posts, setPosts] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [, set_obj] = useState(null);// for TextView
    const [get_Name, setName] = useState(null);// for TextView
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [done, setDone] = useState(false);

    function getName(val) {
        setName(val.target.value)
        console.warn(val.target.value)
    }
    function Post_Route() {

        if (setText === null || setText === "") {
            alert('Please give the Route a title !')
            return
        }

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
                    title: setText,
                    status: 'publish',

                    fields: {
                        // tasks: obj.tasks[0].id,
                        tasks: obj.tasks.map((e) => {
                            return e.id
                        }),
                        users: obj.tasks,
                    }
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
            {setText === null || setText === "" ? <>

                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            X
                        </button>
                    </div>
                    <div className="title">
                        <h3>נא להקליד את שם המסלול ולגרור משימות </h3>
                    </div>
                    <div className="body">

                    </div>
                    <div className="footer">
                        <button className='cancelBtn'
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            Cancel
                        </button>
                    </div>

                </div>
            </>
                :
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button
                            onClick={() => {
                                setOpenModal(false);
                            }}
                        >
                            X
                        </button>
                    </div>
                    <div className="title">
                        <h2>  האם את/ה בטוח</h2>
                    </div>
                    <div className="body">

                    </div>
                    <div className="footer">
                        <button className='cancelBtn'
                            onClick={() => {
                                setOpenModal(false);
                            }}

                        >
                            לא
                        </button>

                        &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                        <button className='continueBtn'
                            onClick={Post_Route}
                        >
                            כן
                        </button>
                    </div>

                </div>
            }
        </>

    );
}

export default Modal;