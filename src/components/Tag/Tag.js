import React from "react";
import { useDrag } from "react-dnd";
import { RiDragMove2Line } from "react-icons/ri";
import Dot from '../Dot/Dot'
import "./style.css";
import $ from 'jquery';

function Tag({ title, id, show, idImg, dataImg }) {

    // for (let index = 0; index < dataImg.length; index++) {
    //     if (dataImg[index].id == idImg) {
    //         image = dataImg[index].acf.image.url;
    //     }
    // }
    const [, drag] = useDrag(() => ({
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
