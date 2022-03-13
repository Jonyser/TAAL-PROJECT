import React, { useEffect, useState } from "react";

function LoginAPI(props) {
    const [, setUrlToLogin] = useState('')


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



    useEffect(() => {
        if (props.APIDetailsLogin.user.length > 0) {
            let formData = new FormData()
            formData.append('email', props.APIDetailsLogin.user)
            formData.append('password', props.APIDetailsLogin.pass)
            const url = 'https://s83.bfa.myftpupload.com/wp-json/jwt-auth/v1/token'
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'application/json',
                },
                body: formData
            })
                .then((response) => response.json())
                .then(function (user) {
                    console.log(user.token)
                    localStorage.setItem('jwt', user.token)
                })
        }

    })
    // [props.APIDetailsLogin]
    return (
        <>
        </>
    )

}

export default LoginAPI