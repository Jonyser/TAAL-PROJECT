import React from "react";
import { useDrag } from "react-dnd";
import { RiDragMove2Line } from "react-icons/ri";


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

            <button className='Tasks' ref={drag} src={title}>{title} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<RiDragMove2Line /></button>


        </>
    );
}

export default Tag;
