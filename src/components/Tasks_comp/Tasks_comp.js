import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DragnDrop from "../DragnDrop/DragnDrop";


const Tasks_comp = (props) => {


    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <DragnDrop propDataTask={props.propsDataTask} />
            </DndProvider >
        </>
    );

}
export default Tasks_comp;
//----------------------------------------
