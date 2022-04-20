import React, { useState, useEffect } from 'react';
import "./Modal.css";
import { get } from "../../api/api";
import { FcLink } from "react-icons/fc";

let obj = { tasks: [], users: [] }
let get_Route_ID = 0;
let getUsers = [];
let student = "";

function Modal({ setOpenModal, setText }) {
    const [, set_obj] = useState(null);// for TextView
    const [, setDone] = useState(false);
    const [, setLoading] = useState(false);
    const [, setUsers] = useState([]);
    const [, setStudent] = useState("")
    const [isChecked, setIsChecked] = useState(false);

    const handleOnChange = () => {
        setIsChecked(!isChecked);
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                getData();

            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const getData = () => {

        get('https://s83.bfa.myftpupload.com/wp-json/wp/v2/users/', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
            },
            params: {
                per_page: 99, 'Cache-Control': 'no-cache'
            }
        }).then(res => {
            setStudent(student = res.filter((item) => item.description !== ""))
            console.log("student:", student)
            setUsers(getUsers = student.map((r) => { return r.name }));
            console.log("getUsers:", getUsers);
        });
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
                console.log("post:", post)
                // window.location.replace("/planner")
            })
        }
    }
    const saveCheckbox = (val) => {
        console.log("val:", val)

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
                                סגור
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

                        </div>
                        <h6></h6>
                        <h6 style={{ textAlign: 'right' }}>:שייך מסלול לחניכ/ים הרצוים <FcLink className='icon' /></h6>
                        <div className='allStudent' >
                            {getUsers.map((value, index) => {
                                return (
                                    <label key={index} className="list-group-item" onClick={saveCheckbox(value)}>

                                        <input className="form-check-input me-1" type="checkbox" id={value} name={value} value=""></input>

                                        {value}

                                    </label>
                                )
                            })}

                            {/* <div className="App">
                                Select your pizza topping:
                                <div className="topping">
                                    <input
                                        type="checkbox"
                                        id="topping"
                                        name="topping"
                                        value="Paneer"
                                        checked={isChecked}
                                        onChange={handleOnChange}
                                    />
                                    Paneer
                                </div>
                                <div className="result">
                                    Above checkbox is {isChecked ? "checked" : "un-checked"}.
                                </div>
                            </div> */}
                        </div>
                        <div className="body">
                            <h5>?האם את/ה בטוח/ה</h5>
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