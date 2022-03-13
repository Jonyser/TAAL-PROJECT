import React, { useEffect, useState } from "react";

let flag_token = false


function LoginAPI(props) {
    const [, setUrlToLogin] = useState('')
    const [, login_token] = useState('')

    // fetch('https://s83.bfa.myftpupload.com/wp-json/jwt-auth/v1/token', {
    //     method: "POST",

    //     body: JSON.stringify({
    //         username: 'jonassp@post.jce.ac.il',
    //         password: 'GvS7GZJUDLt0DKBM'
    //     })
    // }).then(function (response) {
    //     return response.json()
    // }).then(function (user) {
    //     console.log(user.token)
    //     localStorage.setItem('jwt', user.token)
    // });

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
                        console.log(user.token)
                        localStorage.setItem('jwt', user.token)
                        login_token(flag_token = true)
                        window.location.replace('/planner')
                    }
                })
        }
    // [props.APIDetailsLogin]
    return (
        <>
        </>
    )

}

export default LoginAPI