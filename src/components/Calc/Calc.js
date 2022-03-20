
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink } from "react-icons/fc";

import Calculator from '../Calculator/Calculator'

const About = () => {

    return (

        <>
            <div className="Actions">
                <button className='AddRoute' > שייך מסלול לחניך  <FcLink className='icon' /></button>
                <button className='AddRoute' > שכפל מסלול  <GrDuplicate className='icon' /></button>
                <button className='AddRoute'> שמור מסלול  <FcOk className='icon' /> </button>
            </div>
            <br></br>
            <br></br>
            <Calculator />
        </>
    );
}


export default About;

