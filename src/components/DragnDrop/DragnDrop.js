import React, { useState, useEffect, } from 'react';
import Tag from "../Tag/Tag.js";
import { useDrop } from "react-dnd";
import "./style.css";
import Images from "../Images/Images";
import Audios from "../Audios/Audios";
import $ from 'jquery'
import { Card } from 'react-bootstrap';
let Route = [];
let dndArray = [];
let saveProps = [];
let thisId = ""
let thisIdArray = [];
const jq = () => {
    $(".TitleTasks").show();
}

const jq_Hide = () => {
    $(".TitleTasks").hide();
}

function DragnDrop(props) {
    const [, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                jq();
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
        thisIdArray.push(thisId);
        console.log("thisIdArray: ", thisIdArray)

        // keyCount++;
        // keyCount = ("propsChac", props.propDataTask.id);

        // console.log("image:", image)
    };
    //---------------------------------------------------------
    return (
        <>
            <div className="Board" ref={drop} >
                <i className="bi bi-dash-square">
                    <Images id={thisId} data={saveProps.propDataTask} />

                    <div className='txt'> :גרור המשימה לכאן</div>


                </i>



                {board.map((tag, keyCount) => {
                    return <Tag title={tag.title} id={tag.id} idImg={thisId} dataImg={saveProps.propDataTask} key={keyCount} />;
                })}

            </div>

            <div className='Cover_Tasks'>
                <div className='TitleTasks'><h3>משימות</h3></div>
                <div className='TasksCover'>

                    {dndArray.length === 0 ? jq_Hide() : dndArray.map((tag) => {
                        return <Tag title={tag.title} id={tag.id} key={tag.id} show={jq()} idImg={thisId} dataImg={saveProps.propDataTask} />;
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
