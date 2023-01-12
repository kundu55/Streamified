import React from 'react';
import './Home.css'

import one from '../assests/cover1.svg';
import two from '../assests/Icon1.png';
import three from '../assests/Icon2.png';
import four from '../assests/Icon3.png';
import five from '../assests/Icon4.png';
import six from '../assests/last.png';
import Video from './Video';
import Downloadable from './Downloadable';




const Home = () => {
 
    return (<>
     <div className='home'>
        {/* cover section */}
     <div class="cover">
      <div class="left-cover">
      <img src={one} className='home_img1'>
      </img>
      </div>
      <div class="right-cover">
        <div class="mini-title">Welcome To</div>
        <div class="big-title">Streamified</div>
        <div class="detail">
          The all new Local Network Media Sharing Application, 
          to stream the content on the Android TV, with a few clicks in setting up.
        </div>
        <a href='#foo'><div class="getting-started" >GETTING STARTED >></div></a>
      </div>
    </div>


    {/* card section */}


    <div class="features">
        <div class="cards">
            <div class="card-1">
                <div class="logo1">
                    <img src={two} alt="" className='img1'></img>
                </div>
                <div class="card-heading">ECONOMICAL</div>
                <div class="card-desc">Free to use and the user can share the content</div>
            </div>
            <div class="card-2">
                <div class="logo1">
                    <img src={three} alt="" className='img1'></img>
                </div>
                <div class="card-heading">MULTI-DEVICE SUPPORT</div>
                <div class="card-desc">Stream through any device and view it on Android TV</div>
            </div>
            <div class="card-3">
                <div class="logo1">
                    <img src={four} alt="" className='img1'></img>
                </div>
                <div class="card-heading">CONVINENT UI</div>
                <div class="card-desc">Users accomplish tasks in the most seamless way</div>
            </div>
            <div class="card-4">
                <div class="logo1">
                    <img src={five} alt="" className='img1'></img>
                </div>
                <div class="card-heading">RELIABLE</div>
                <div class="card-desc">Acoustic streaming, satisfaction guaranteed</div>
            </div>
        </div>
      </div>      
         {/* demo video section */}
         <Video></Video>
      

      <Downloadable></Downloadable>
      <img src={six} className='last'></img>
     
         {/* footer section */}
         
            <footer className="footer">
                <p className="text-footer">
                    Copyright ©-All rights reserved.
                </p>
            </footer>
 </div>
       
    </>
       
    );
};

export default Home;