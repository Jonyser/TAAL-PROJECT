import './style.css';

const Dot = (props) => {
    // memo//משתנים,coolbake//pפונ

    return (
        <>
            {/* <span class="dot"></span>  */}

            <span className="dot" style={{ backgroundColor: props.color }}></span>


        </>
    );

}
export default Dot;

