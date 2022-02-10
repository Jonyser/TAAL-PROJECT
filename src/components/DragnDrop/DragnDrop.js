import React, { useState } from "react";
import Tag from "../Tag/Tag.js";
import { useDrop } from "react-dnd";
import "./style.css";

let Route = [];
let keyCount = 0;
//-------------------------------------------
function Incrementation(count) {
    alert("check")
    count = count + 1;
    return count
}
//-------------------------------------------
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

function DragnDrop() {
    const [board, setBoard] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item) => addImageToBoard(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    const addImageToBoard = (id) => {

        Route = TagList.filter((tag) => id === tag.id);
        setBoard((board) => [...board, Route[0]]);
        console.log(keyCount);


    };
    return (
        <>
            <div className="Tags">
                {TagList.map((tag) => {
                    return <Tag url={tag.url} id={tag.id} key={tag.id} />;
                })}
            </div>
            <div className="Board" ref={drop}>
                {board.map((tag, keyCount) => {

                    return <Tag url={tag.url} id={tag.id} key={keyCount} />;
                })}

            </div>
        </>

    );


}

export default DragnDrop;
