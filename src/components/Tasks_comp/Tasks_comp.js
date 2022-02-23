import React, { useState, useEffect } from 'react';
import { get } from "../../api/api";
import './style.css';
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DragnDrop from "../DragnDrop/DragnDrop";
import { BsPencilFill } from "react-icons/bs";


// import Tasks_comp from "../Tasks_comp/Task_comp"


let allTasks = [];
let tasks = [];
let taskArray = [];

const Tasks_comp = (props) => {
    // console.log("taaaaaaa:", props.propsDataTask)
    const Display_The_Tasks = () => {

    }
    return (
        <>
            <div className='Cover'>
                <div className='TitleTasks'><h2>משימות</h2></div>
                <div className='TaskColler'>
                    <DndProvider backend={HTML5Backend}>
                        <DragnDrop propDataTask={props.propsDataTask} />
                    </DndProvider >
                </div>
            </div>
        </>
    );

}
export default Tasks_comp;
//----------------------------------------
