import React, { useEffect, useState } from "react";
import jwt from 'jwt-decode';

let flag_token = false
let id;

function LoginAPI(props) {
    const [, setUrlToLogin] = useState('')
    const [, login_token] = useState('')

    if (props.APIDetailsLogin.user.length > 0) {
        
        const url = 'https://s83.bfa.myftpupload.com/wp-json/jwt-auth/v1/token'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body:  JSON.stringify({
                        username: props.APIDetailsLogin.user,
                        password: props.APIDetailsLogin.pass
                    })
        })
            .then((response) => response.json())
            .then(function (user) {
                if(!flag_token){
                    console.log("token",user.token)
                    console.log(jwt(user.token).data.user.id)
                    sessionStorage.setItem('jwt', user.token)
                    sessionStorage.setItem('logged_in', 1)
                    sessionStorage.setItem('id',jwt(user.token).data.user.id)
                    login_token(flag_token = true)
                    window.location.replace('/planner')
                }
            })
            
    }
    

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
    //                 if (data['success'] === true) {

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