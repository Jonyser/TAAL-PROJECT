import React, { useEffect, useState } from "react";

function LoginAPI(props) {
    const [urlToLogin, setUrlToLogin] = useState('')



    useEffect(() => {
        if (props.APIDetailsLogin.user.length > 0) {
            let formData = new FormData()
            formData.append('email', props.APIDetailsLogin.user)
            formData.append('password', props.APIDetailsLogin.pass)
            const url = 'https://s83.bfa.myftpupload.com/?rest_route=/simple-jwt-login/v1/auth'
            fetch(url, {
                method: 'POST',
                body: formData
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data['success'] == true) {
                        
                        console.log(data)
                        localStorage.setItem('jwt', data['data']['jwt'])
                        
                        setUrlToLogin(`https://s83.bfa.myftpupload.com/?rest_route=/simple-jwt-login/v1/autologin&JWT=${data['data']['jwt']}`)
                    }
                    else {
                        console.log(data)
                        props.setServerMessage(data['data']['message'])
                    }
                })
        }

    }, [props.APIDetailsLogin])

    // useEffect(() => {
    //     if (urlToLogin.length > 0) {
    //         fetch(urlToLogin, {
    //             method: 'GET'
    //         })
    //             .then((response) => {
    //                 if (response.status == '200') {
    //                     props.setIsLoggedIn(true)
    //                     props.setUsername(props.APIDetailsLogin.user)
    //                     window.location.replace('http://jonassp.mysoft.jce.ac.il/Taal-Project/index.html')
    //                 }
    //                 else {
    //                     console.log('error')
    //                 }
    //             })
    //     }
    // }, [urlToLogin])

    return (
        <>
        </>
    )

}

export default LoginAPI