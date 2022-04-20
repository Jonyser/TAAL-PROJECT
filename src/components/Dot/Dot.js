import './style.css';

const Dot = (props) => {
    // memo//משתנים,coolbake//pפונ

    return (
        <>
            {/* <span class="dot"></span>  */}

            <div className="dot" style={{ backgroundColor: props.color }}></div>


        </>
    );

}
export default Dot;

