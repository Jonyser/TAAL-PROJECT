import React, { useState } from 'react';
import "./Modal.css";


let obj = { tasks: [], users: [] }
let get_Route_ID = 0;


function Modal({ setOpenModal, setText }) {
    const [, set_obj] = useState(null);// for TextView
    const [, setDone] = useState(false);

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
            console.log("obj.tasks : ", obj.tasks)

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
                            console.log("e.id:", e.id)
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
                <div className="Background">
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
                </div>
            </>
                :
                <div className="Background">
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

                            >לא
                            </button>

                            &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                            <button className='continueBtn'
                                onClick={Post_Route}
                            > כן
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>

    );
}

export default Modal;