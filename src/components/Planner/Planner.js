import React, { useState, useEffect } from 'react';
import './style.css';
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink, FcMultipleInputs } from "react-icons/fc";
import Places from '../Places/Places';
import 'reactjs-popup/dist/index.css';
import Modal from '../Modal/Modal'


let obj = { tasks: [], users: [] }
let get_Route_ID = 0;


const Planner = () => {
    const [posts, setPosts] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [, set_obj] = useState(null);// for TextView
    const [get_Name, setName] = useState(null);// for TextView
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [done, setDone] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                jq();
                // useWindowSize()
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }

        fetchData();
    }, []);
    // const [jqry, setJqry] = useState(jq);
    //-------------------input-------------------------
    function getName(val) {
        setName(val.target.value)
        console.warn(val.target.value)
    }
    function Post_Route() {

        if (get_Name === null || get_Name === "") {
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
                    title: get_Name,
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
            {loading && <div>Loading</div>}
            {!loading && (
                <>
                    <div className="Actions">
                        <button className='AddRoute' > שייך מסלול לחניך  <FcLink className='icon' /></button>
                        <button className='AddRoute' onClick={Post_Route}> שכפל מסלול  <GrDuplicate className='icon' /></button>
                        <button className='AddRoute'
                            // onClick={Post_Route}
                            onClick={() => {
                                setModalOpen(true);
                            }}
                        > שמור מסלול  <FcOk className='icon' /> </button>
                    </div>
                    {/* <button
                        className="openModalBtn"
                        onClick={() => {
                            setModalOpen(true);
                        }}
                    >
                        Open
                    </button> */}
                    {modalOpen && <Modal setOpenModal={setModalOpen} setText={get_Name} />}


                    <form id="IPU" className="w3-container">
                        <p id="titleIPU">:רשום את שם המסלול <FcMultipleInputs /></p>
                        <p><input className="w3-input w3-hover-green" type="text" onChange={getName} style={{
                            textAlign: 'right',
                            width: '290px'
                        }}></input></p>
                    </form>

                    {/* <div className='textInput'>
                        
                        <input type="text" className="RouteName" onChange={getName}></input>
                    </div> */}

                    <div>
                        <Places />
                    </div>
                </>
            )}
        </>
    );
}
const jq = () => {
    // $(".TitleTasks").hide();
    // $(".TitleStation").hide();


}

export default Planner;
