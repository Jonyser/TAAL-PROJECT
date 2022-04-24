import React, { useState } from 'react';
import "./Modal.css";
import img1 from '../../Pictures/img1.png';
import img2 from '../../Pictures/img2.png';

let obj = { tasks: [], users: [] }
let get_Route_ID = 0;


function Modal({ setOpenModal, setText, thisMyRoute, thisGetMyTasks, thisFlagTasks, thisGetMyUsers, thisFlagUsers }) {

    console.log("thisGetMyTasks:", thisGetMyTasks)

    // console.log("thisMyRoute:", thisMyRoute)
    const [, set_obj] = useState(null);// for TextView
    const [, setDone] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };

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
                    status: "draft",
                    title: thisMyRoute.myTitle + "-duplicate-1",

                    fields: {
                        // tasks: obj.tasks[0].id,
                        tasks: thisMyRoute.myTasks.map((e) => {
                            console.log("e.id:", e.ID)
                            return e.ID
                        }),
                        // users: obj.tasks,
                    }
                })
            }).then(function (response) {
                return response.json();
            }).then(function (post) {
                get_Route_ID = post.id
                setDone(true)
                alert(get_Route_ID)

                // window.location.replace("/planner")
            })
        }
    }
    return (
        <>
            {thisFlagTasks == true ? <>
                <div className="Background">
                    <div className="modalMyTasksContainer">
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
                        </div>
                        <img src={img1} alt="Logo" style={{ width: "230px", height: "230px" }} />;
                        <h3>:רשימת המשימות</h3>
                        <h5 className="bodyTasks">
                            {thisGetMyTasks ? <>
                                {thisGetMyTasks.map((val, index) => {

                                    return (
                                        < div key={index}>
                                            <div >
                                                {val.post_title + " - "}
                                            </div>
                                            <br></br>
                                        </div>
                                    )
                                })}
                            </> :
                                <>
                                    <h3 style={{ color: "red" }}>לא קיימים משימות</h3>
                                </>
                            }
                        </h5>

                    </div>
                </div>
            </>
                :
                thisFlagUsers ? <>
                    <div className="Background">
                        <div className="modalMyTasksContainer">
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
                            </div>
                            <img src={img2} alt="Logo" style={{ width: "230px", height: "230px" }} />;
                            <h3>:החניכים</h3>
                            <h5 className="bodyTasks">
                                {thisGetMyUsers ? <>
                                    {thisGetMyUsers.map((val, index) => {
                                        return (
                                            < div key={index}>
                                                <div >
                                                    {val.display_name + " - "}
                                                </div>
                                                <br></br>
                                            </div>
                                        )
                                    })}
                                </> :
                                    <>
                                        <h6 style={{ color: "red" }}>אין חניכים המשוייכים למסלול זה</h6>
                                    </>
                                }
                            </h5>

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

                            </div>
                            <h1>שכפול מסלול</h1>
                            <div className="body">
                                <h5> :האם את/ה מעוניין בשכפול המסלול <div style={{ color: "red" }}>?{thisMyRoute.myTitle}</div></h5>
                            </div>
                            <div className="footer">
                                <button className='cancelBtn'
                                    onClick={() => {
                                        setOpenModal(false);
                                    }}
                                >ביטול
                                </button>
                                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                                <button className='continueBtn'
                                    onClick={Post_Route}
                                > אישור
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </>
    );
}

export default Modal;