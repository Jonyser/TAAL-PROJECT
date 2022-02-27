import React from "react";
import { useDrag } from "react-dnd";
import { RiDragMove2Line } from "react-icons/ri";
import Dot from '../Dot/Dot'
import "./style.css";
import $ from 'jquery'

function Tag({ id, title, show }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { id: id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));
    return (
        <>
            <button className='Tasks' ref={drag} src={title}>{title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<RiDragMove2Line /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<Dot color="rgb(164, 190, 125)" />   </button>
            {show ? $(".TitleTasks").show() : null}
        </>

    );
}

export default Tag;
