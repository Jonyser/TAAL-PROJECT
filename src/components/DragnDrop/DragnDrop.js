import React, { useState } from "react";
import Tag from "../Tag/Tag.js";
import { useDrop } from "react-dnd";
import "./style.css";
import { BsPencilFill } from "react-icons/bs";


let Route = [];
let keyCount = 0;
let dndArray = [];


function DragnDrop(props) {
    console.log("propssssss", props.propDataTask);
    dndArray = (props.propDataTask).map((element) => {
        return {
            id: element.id,
            title: element.title.rendered
        }
    })
    console.log("dndArray:", dndArray)

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

        Route = dndArray.filter((tag) => id === tag.id);
        setBoard((board) => [...board, Route[0]]);
        keyCount++;
        console.log(keyCount);
    };
    //---------------------------------------------------------
    return (
        <>
            <div className="Board" ref={drop}>
                {board.map((tag, keyCount) => {
                    return <Tag title={tag.title} id={tag.id} key={keyCount} />;
                })}
            </div>

            <div>
                {dndArray.map((tag) => {
                    return <Tag title={tag.title} id={tag.id} key={tag.id} />;
                })}
            </div>
        </>
    );
}

export default DragnDrop;
