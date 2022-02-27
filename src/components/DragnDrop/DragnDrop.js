import React, { useState } from "react";
import Tag from "../Tag/Tag.js";
import { useDrop } from "react-dnd";
import "./style.css";
import Images from "../Images/Images";
import Audios from "../Audios/Audios";

let Route = [];
let dndArray = [];
let idsArray = [];
let image = "";
let saveProps = [];
let thisId = ""


function DragnDrop(props) {

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
            <div className='Cover'>
                <div className='TitleTasks'><h2>משימות</h2></div>
                <div className='TasksCover'>
                    {dndArray.map((tag) => {
                        return <Tag title={tag.title} id={tag.id} key={tag.id} />;
                    })}

                </div>

            </div>
            <div className="MediaCover">
                <div className=" MediaSize">
                    <Audios id={thisId} data={saveProps.propDataTask} />
                    <Images id={thisId} data={saveProps.propDataTask} />
                </div>
            </div>

            <div>
            </div>

        </>
    );
}

export default DragnDrop;
