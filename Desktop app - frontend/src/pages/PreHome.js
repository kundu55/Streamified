import React, { useState } from 'react';
import './PreHome.css';
import one from '../assests/1.png'
import two from '../assests/2.png'
import three from '../assests/3.png'
import four from '../assests/4.png'
import five from '../assests/5.png'
import logo from '../assests/logo.png'
import { Link, NavLink,Outlet } from 'react-router-dom';
import Home from './Home.js'

const PreHome = ({children}) => {

    const [test,setTest] = useState(5)
    const [displayImage, setDisplayImage] = useState(true) 

    const stopImageDisplay =()=>{
        setDisplayImage(false)
    }
 
    return (
    <div className='prehome'>
            <nav class="navbar">
                <ul class="nav-list">
          
                        {/* LNMS               */}
                        <Link to='/'><img class="logo-starting" src={logo}  /></Link>
                        
                </ul>
                <div className='appname'>Streamified</div>
                <div class="rightNav">
                    {/* <Link className="btn btn-sm">Login</Link> */}
                    <Link to='/login' className="btn btn-start" onClick={stopImageDisplay}>Sign In</Link>
                    <Link to='/signup' className="btn btn-start" onClick={stopImageDisplay}>Sign Up</Link>
                </div>
            </nav>
                    {/* <NavLink to='/signup' test='test' className="btn btn-sm">
                        SignUp
                    </NavLink> */}
            <section class="section">
            {/* <Home displayImage={displayImage}/> */}
            </section>
            {/* <Outlet/> */}
            <main>{children}</main>
           <footer className="footer">
                <p className="text-footer">
                    Copyright ©-All rights reserved.
                </p>
            </footer>



    </div>
       
    );
};

export default PreHome;