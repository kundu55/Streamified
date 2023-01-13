import React, { Component } from 'react'
import { useState } from 'react'
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './signinup.css'

const userSignUp = async (credentials) => {
  console.log(credentials)
  const res = await fetch('https://local-network-media-streaming-backend-urtjok3rza-wl.a.run.app/auth/register/',{
      method:'POST',
      headers: {
          'Content-type': 'application/json',
      },
      body:JSON.stringify(credentials)
  })

  const data = await res.json()
  return data
}

// export default class SignUp extends Component {


  const SignUp = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');


    const handleSubmit = async e => {
      e.preventDefault();
      
      let response = await userSignUp({
          username,
          password, password2, email, first_name, last_name
        })
      
      var txt = JSON.stringify(response, null, 2)
      txt=txt.replace(/\"/g,'')
      txt=txt.replace(/\{/g, '')
      txt=txt.replace(/\}/g, '')
      txt=txt.replace(/\,/g, '')
      alert(txt.replace(/[[\]]/g, ''))}


    return (

      // <div className="App">
      <div class='container' >

    <div className='leftt' ></div>
      <div className='rightt' >

        <div className="auth-wrapper moveFooter">
          <div className="auth-inner-signup">


      <form className='whitefont' noValidate  onSubmit={handleSubmit} >
        <h3 className='heading'>Sign Up</h3>

        <div className="mb-3">
          {/* <label>Username</label> */}
          <input type="text" className="form-control" placeholder="Username"
          onChange={e => setUserName(e.target.value)} />
        </div>

        <p></p>

        <div className="mb-3">
          {/* <label>First name</label> */}
          <input
            type="text"
            className="form-control"
            placeholder="First Name"
            onChange={e => setFirstName(e.target.value)}
          />
        </div>
        <p></p>
        <div className="mb-3">
          {/* <label>Last name</label> */}
          <input type="text" className="form-control" placeholder="Last Name"
          onChange={e => setLastName(e.target.value)} />
        </div>
        <p></p>

        <div className="mb-3">
          {/* <label>Email address</label> */}
          <input
            type="email"
            className="form-control"
            placeholder="Email Address"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <p></p>
        <div className="mb-3">
          {/* <label>Password</label> */}
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <p></p>
        <div className="mb-3">
          {/* <label>Re enter password</label> */}
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            onChange={e => setPassword2(e.target.value)}
          />
        </div>
        <p></p>
        <div className="d-grid">
          <button type="submit" className="btn btn-custom">
            Sign Up
          </button>
        </div>
      </form>
      </div></div></div></div>
    )
  }
export default SignUp