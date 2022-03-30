import React, { useState, useEffect } from 'react';
import './style.css';
import { GrDuplicate } from "react-icons/gr";
import { FcOk, FcLink, FcMultipleInputs } from "react-icons/fc";
import Places from '../Places/Places';

let obj = {tasks:null,users:null}

const Planner = () => {
    
    
    const [, set_obj] = useState(null);// for TextView
    const [get_Name, setName] = useState(null);// for TextView
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                jq();
                // useWindowSize()
            } catch (error) {
                console.error(error.message);
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    // const [jqry, setJqry] = useState(jq);

    //-------------------input-------------------------
    function getName(val) {
        setName(val.target.value)
        console.warn(val.target.value)
    }
    




    function Post_Route(){

        console.log("in")
        
        if(get_Name === null || get_Name === ""){
            alert('Please give the Route a title !')
            return
        }

        if(JSON.parse(localStorage.getItem('New_Routes')) === null){
            alert('Route is empty ! ');
            return
        }
        else{

            
            set_obj(obj.tasks = JSON.parse(localStorage.getItem('New_Routes'))) ;
            console.log("obj : ",obj)
            
            
            let url_post = `https://s83.bfa.myftpupload.com/wp-json/wp/v2/routes`
            fetch(url_post, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`,
                    
                },
                body: JSON.stringify({
                    title: get_Name,
                    acf: obj,
                    status:'publish'
                })
            }).then(function (response) {
                return response.json();
            }).then(function (post) {
                // window.location.replace("/planner")
            });
            
        }
        
    }
    return (
        <>
            {loading && <div>Loading</div>}
            {!loading && (
                <>
                    <div className="Actions">
                        <button className='AddRoute' > שייך מסלול לחניך  <FcLink className='icon' /></button>
                        <button className='AddRoute' > שכפל מסלול  <GrDuplicate className='icon' /></button>
                        <button className='AddRoute' onClick={Post_Route}> שמור מסלול  <FcOk className='icon' /> </button>
                    </div>

                    <form id="IPU" className="w3-container">
                        <p id="titleIPU">:רשום את שם המסלול <FcMultipleInputs /></p>
                        <p><input className="w3-input w3-hover-green" type="text" onChange={getName} style={{
                            textAlign: 'right',
                            width: '290px'
                        }}></input></p>
                    </form>

                    {/* <div className='textInput'>
                        
                        <input type="text" className="RouteName" onChange={getName}></input>
                    </div> */}

                    <div>


                        <Places />

                    </div>
                </>
            )}
        </>
    );
}
const jq = () => {
    // $(".TitleTasks").hide();
    // $(".TitleStation").hide();


}

export default Planner;
