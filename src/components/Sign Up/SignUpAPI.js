import React, { useEffect, useState } from "react";

function SignUpAPI(props) {
    const [urlToLogin, setUrlToLogin] = useState('')

    useEffect(() => {
        if (props.APIDetailsSignUp.user.length > 0) {
            let formData = new FormData()
            formData.append('user', props.APIDetailsSignUp.user)
            formData.append('email', props.APIDetailsSignUp.email)
            formData.append('pass', props.APIDetailsSignUp.pass)

            console.log("chack1:", props.APIDetailsSignUp.user)
            const url = 'https://s83.bfa.myftpupload.com/reg.php'

            fetch(url, {
                method: 'POST',
                body: formData

            })
                .then((response) => response.json()) //json
                .then((data) => {
                    if (data['success'] === true) {
                        localStorage.setItem('jwt', data['data']['jwt'])
                        setUrlToLogin(`https://s83.bfa.myftpupload.com/?rest_route=/simple-jwt-login/v1/autologin&JWT=${data['data']['jwt']}`)


                        console.log(data['data']['jwt'])
                    }
                    else {

                        console.log(data)
                        console.log(data['data']['message'])
                        props.setServerMessage(data['data']['message'])
                    }
                })
        }
    }, [props.APIDetailsSignUp])

    useEffect(() => {
        if (urlToLogin.length > 0) {
            fetch(urlToLogin, {
                method: 'GET'
            })
                .then((response) => {
                    if (response.status == '200') {
                        props.setIsLoggedIn(true)
                        props.setUsername(props.APIDetailsSignUp.user)
                        window.location.replace('http://jonassp.mysoft.jce.ac.il/Taal-Project/index.html')
                    }
                    else {
                        console.log('error')
                    }
                })
        }

    }, [urlToLogin])

    return (
        <>
        </>
    )
}

export default SignUpAPI