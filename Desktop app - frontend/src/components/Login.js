import React, { Component } from 'react'
import { useState } from 'react'
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './signinup.css'
import { useNavigate } from "react-router-dom"
const { ipcRenderer } = window.require('electron')


const loginnUser = async (credentials) => {
  console.log(credentials)
  const res = await fetch('https://local-network-media-streaming-backend-urtjok3rza-wl.a.run.app/api-token-auth/',{
      method:'POST',
      headers: {
          'Content-type': 'application/json',
      },
      body:JSON.stringify(credentials)
  })

  const data = await res.json()
  console.log(data);
  return data
}


const uploadIp = async (ipAddr,token) => {
  // console.log(credentials)
  const res = await fetch('https://local-network-media-streaming-backend-urtjok3rza-wl.a.run.app/deviceinfo/',{
      method:'POST',
      headers: {
          'Content-type': 'application/json',
          'Authorization': `Token ${token}`
      },
      body:JSON.stringify({
        "serverIp":ipAddr
      })
  })

  // const data = await res.json()
  // console.log(data);
  return res
}

const Login = ({setIsLoggedIn,setUserNameApp}) => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    let navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        // const response = await loginUser({
        //   username,
        //   password
        // });
        // if ('token' in response) {
        //   swal("Success", response.message, "success", {
        //     buttons: false,
        //     timer: 2000,
        //   })
        //   .then((value) => {
        //     localStorage.setItem('accessToken', response['accessToken']);
        //     localStorage.setItem('user', JSON.stringify(response['user']));
        //     window.location.href = "/profile";
        //   });
        // } else {
        //   swal("Failed", response.message, "error");
        // }
        let token = await loginnUser({
            username,
            password
          })
        console.log(token)
        if("token" in token)
        {
          let ipAddr = await ipcRenderer.invoke('get-ip')
          console.log(ipAddr)
          let result = await uploadIp(ipAddr,token.token)
          console.log(result)
          setUserNameApp(username)
          navigate('/')
          setIsLoggedIn(true)
        }
        else
        {
          alert("Invalid credentials! Try again")
        }
      }
      
  return (
    // <div className="App">
    <div class='container' >

      <div className='leftt' ></div>
      <div className='rightt' >

    <div className="auth-wrapper moveFooter">
      <div className="auth-inner">


  <form noValidate  onSubmit={handleSubmit} >
    <h3 className='headingsignin'>Sign In</h3>

      <div className="mb-3">
      {/* <label className='whitefont'>Username</label> */}
      <input
        type="text"
        className="form-control"
        placeholder="Username"
        onChange={e => setUserName(e.target.value)}
      />
    </div>
    <p></p>
    <div className="mb-3">
      {/* <label className='whitefont'>Password</label> */}
      <input
        type="Password"
        className="form-control"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />
    </div>

    <div className="d-grid">
      <button type="submit" className="btn btn-customsignin">
        Sign in
      </button>
    </div>
  </form>
  </div></div></div></div>
  )
}

export default Login