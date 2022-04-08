import React, { useState } from "react";

let flag_token = false

function LoginAPI(props) {
    const [, login_token] = useState('')

    if (props.APIDetailsLogin.user.length > 0) {

        const url = 'https://s83.bfa.myftpupload.com/wp-json/jwt-auth/v1/token'
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'accept': 'application/json',
            },
            body: JSON.stringify({
                username: props.APIDetailsLogin.user,
                password: props.APIDetailsLogin.pass
            })
        })
            .then((response) => response.status === 403 ? (alert('Wrong username/mail or wrong Password'), flag_token = true) : response.json())
            .then(function (user) {
                if (!flag_token) {
                    if (user.message !== undefined) {
                        if (user.message.includes("2FA")) {
                            console.log("2FA")
                            alert('2FA is activated, No support for this feature, Please login with another user')
                            login_token(flag_token = true)
                        }
                    }
                    console.log("token", user.token)
                    sessionStorage.setItem('jwt', user.token)
                    sessionStorage.setItem('logged_in', 1)
                    window.location.replace('/planner')
                }
            })
    }
    return (
        <>
        </>
    )

}

export default LoginAPI