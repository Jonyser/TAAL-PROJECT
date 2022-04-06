import React, { useState, useEffect, } from 'react';
import Tag from "../Tag/Tag.js";
import { useDrop } from "react-dnd";
import "./style.css";
import Images from "../Images/Images";
import Audios from "../Audios/Audios";
import { RiDragMove2Line } from "react-icons/ri";
import { FcAddDatabase } from "react-icons/fc";
import Modal_Tasks from '../Modal/Modal_Tasks'

let Route = [];
let dndArray = [];
let saveProps = [];
let thisId = ""
let thisIdArray = [];
let myTask = {};

function DragnDrop(props) {
    // console.log("Task AllStation in:", props.allStations)
    const [, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false)
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);
    saveProps = props;
    console.log("props,", saveProps.propDataTask)


    dndArray = (props.propDataTask).map((element) => {
        return {

            id: element.id,
            title: element.title.rendered.replace("&#8211;", "-").replace("&#8217;", "' ")
        }
    })
    // console.log("dndArray:", dndArray)

    const [board, setBoard] = useState([]);

    //---------------------------------------------------------
    const [, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    //---------------------------------------------------------
    const addImageToBoard = (id) => {
        thisId = id;
        Route = dndArray.filter((tag) => id === tag.id);
        setBoard((board) => [...board, Route[0]]);
        // thisIdArray.push(thisId);
        myTask = saveProps.propDataTask.filter((item) => item.id === id)
        thisIdArray.push(myTask[0]);
        localStorage.setItem('New_Routes', JSON.stringify(thisIdArray))
    };
    //---------------------------------------------------------
    return (
        <>
            <div className="Board" ref={drop} >
                <i className="bi bi-dash-square">
                    <Images id={thisId} data={saveProps.propDataTask} />

                    <div className='txt'> :גרור משימה לכאן&nbsp;<RiDragMove2Line /></div>
                </i>
                {board.map((tag, keyCount) => {
                    return <Tag title={tag.title} id={tag.id} idImg={thisId} dataImg={saveProps.propDataTask} key={keyCount} />;
                })}

            </div>
            {modalOpen && <Modal_Tasks setOpenModalPlases={setModalOpen} allStations={props.allStations} />}
            <div className='Cover_Tasks'>
                <div className='TitleTasks'><h3>משימות</h3></div>
                <div className='addTaskCover'>
                    <button
                        className='AddTasks'
                        onClick={() => {
                            setModalOpen(true);
                        }}>
                        <FcAddDatabase style={{
                            width: "85px",
                            height: "30px"
                        }} />
                        <h6>הוסף משימה</h6>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </button>
                </div>
                <div className='TasksCover'>

                    {dndArray.length === 0 ? null : dndArray.map((tag) => {
                        return <Tag title={tag.title} id={tag.id} key={tag.id} idImg={thisId} dataImg={saveProps.propDataTask} />;
                    })}


                </div>
            </div>

            <div className=" MediaSize">

                <Audios id={thisId} data={saveProps.propDataTask} />

            </div>
        </>
    );
}

export default DragnDrop;