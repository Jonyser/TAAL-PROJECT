import React, { useState, useEffect, useRef } from 'react';
import Tag from "../Tag/Tag.js";
import { useDrop } from "react-dnd";
import "./style.css";
import Images from "../Images/Images";
import Audios from "../Audios/Audios";
import $ from 'jquery'

let Route = [];
let dndArray = [];
let idsArray = [];
let image = "";
let saveProps = [];
let thisId = ""

const jq = () => {
    $(".TitleTasks").show();
}

const jq_Hide = () => {
    $(".TitleTasks").hide();
}

function DragnDrop(props) {
    const [loading, setLoading] = useState(false);

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
            title: element.title.rendered
        }
    })
    // console.log("dndArray:", dndArray)

    const [board, setBoard] = useState([]);

    //---------------------------------------------------------
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));
    //---------------------------------------------------------
    const addImageToBoard = (id) => {
        thisId = id;
        image = ""
        // console.log("wdfff,", props.propDataTask)

        Route = dndArray.filter((tag) => id === tag.id);
        setBoard((board) => [...board, Route[0]]);
        // keyCount++;
        // keyCount = ("propsChac", props.propDataTask.id);
        idsArray.push(id)
        // console.log("image:", image)
    };
    //---------------------------------------------------------
    return (
        <>
            <div className="Board" ref={drop}>
                {board.map((tag, keyCount) => {
                    return <Tag title={tag.title} id={tag.id} key={keyCount} />;
                })}
            </div>

            <div className='Cover_Tasks'>
                <div className='TitleTasks'><h2>משימות</h2></div>
                <div className='TasksCover'>

                    {dndArray.length == 0 ? jq_Hide() : dndArray.map((tag) => {
                        return <Tag title={tag.title} id={tag.id} key={tag.id} show={jq()} />;
                    })}

                </div>

            </div>
            <div className="MediaCover">
                <div className=" MediaSize">

                    <Images id={thisId} data={saveProps.propDataTask} />
                </div>
            </div>
            <Audios id={thisId} data={saveProps.propDataTask} />

        </>
    );
}

export default DragnDrop;
