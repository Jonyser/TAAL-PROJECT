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
    const TagList = [
        {
            id: 1,
            url:
                "https://yt3.ggpht.com/ytc/AAUvwnjOQiXUsXYMs8lwrd4litEEqXry1-atqJavJJ09=s900-c-k-c0x00ffffff-no-rj",
        },
        {
            id: 3,
            url:
                "https://yt3.ggpht.com/pe57RF1GZibOWeZ9GwRWbjnLDCK2EEAeQ3u4iMAFNeaz-PN9uSsg1p2p32TZUedNnrUhKfoOuMM=s900-c-k-c0x00ffffff-no-rj",
        },
    ];
    const [board, setBoard] = useState([]);

    //---------------------------------------------------------
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image", //סוג של האובייקט שניתן לגרור ללוח
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
            {/* <div className='Cover'>
                <div className='TitleTasks'><h2>משימות</h2></div>
                <div className='TaskColler'>

                    {props.propDataTask.map((value, index) => { return (<button className='Tasks' key={index}>{value.title.rendered}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<BsPencilFill /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button>) })} <br></br>

                </div>
            </div> */}


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
