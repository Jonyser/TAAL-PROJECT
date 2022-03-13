import React, { useEffect, useState } from "react";

function LoginAPI(props) {
    const [, setUrlToLogin] = useState('')


    fetch('https://s83.bfa.myftpupload.com/wp-json/jwt-auth/v1/token',{
    method: "POST",
    headers:{
        'Content-Type': 'application/json',
        'accept': 'application/json',
    },

    body:JSON.stringify({
        username: 'jonassp@post.jce.ac.il',
        password: 'GvS7GZJUDLt0DKBM'
    })
    }).then(function(response){
        return response.json()
    }).then(function(user){
        console.log(user.token)
        localStorage.setItem('jwt', user.token)
    });



    // useEffect(() => {
    //     if (props.APIDetailsLogin.user.length > 0) {
    //         let formData = new FormData()
    //         formData.append('email', props.APIDetailsLogin.user)
    //         formData.append('password', props.APIDetailsLogin.pass)
    //         const url = 'https://s83.bfa.myftpupload.com/?rest_route=/simple-jwt-login/v1/auth'
    //         fetch(url, {
    //             method: 'POST',
    //             body: formData
    //         })
    //             .then((response) => response.json())
    //             .then((data) => {
    //                 if (data['success'] == true) {

    //                     console.log(data)
    //                     localStorage.setItem('jwt', data['data']['jwt'])

    //                     setUrlToLogin(`https://s83.bfa.myftpupload.com/?rest_route=/simple-jwt-login/v1/autologin&JWT=${data['data']['jwt']}`)
    //                 }
    //                 else {
    //                     console.log(data)
    //                     props.setServerMessage(data['data']['message'])
    //                 }
    //             })
    //     }

    // }, [props.APIDetailsLogin])

    return (
        <>
        </>
    )

}

export default LoginAPI