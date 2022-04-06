import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import DragnDrop from "../DragnDrop/DragnDrop";


const Tasks_comp = (props) => {
    // console.log("Task AllStation in:", props.allStations)

    return (
        <>
            <DndProvider backend={HTML5Backend}>
                <DragnDrop propDataTask={props.propsDataTask} allStations={props.allStations} />
            </DndProvider >
        </>
    );
}
export default Tasks_comp;
//----------------------------------------
