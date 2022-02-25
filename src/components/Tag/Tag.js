import React from "react";
import { useDrag } from "react-dnd";
import { RiDragMove2Line } from "react-icons/ri";
import Dot from '../Dot/Dot'


function Tag({ id, title }) {
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


        </>
    );
}

export default Tag;
