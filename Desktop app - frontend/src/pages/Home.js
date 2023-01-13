import React from 'react';
import Row from '../Row';
import './Home.css';
import requests from '../Requests';
import Banner from '../Banner'
import one from '../assests/lnmsafterlogin.svg'
// import two from '../assests/2.png'
// import three from '../assests/3.png'
// import four from '../assests/4.png'
// import five from '../assests/5.png'
import SimpleImageSlider from "react-simple-image-slider";
import banner1 from '../assests/banner1.svg'
import banner2 from '../assests/banner2.svg'
import banner3 from '../assests/banner3.png'
import banner4 from '../assests/banner4.svg'

const images = [
    { url: banner1},
    { url: banner2 },
    { url: banner3 },
    { url: banner4 },
  ];

const Home = ({displayImage}) => {
    return (
        <>
         <div>
            <SimpleImageSlider
                width={1310}
                height={446}
                images={images}
                showBullets={true}
                showNavs={true}
                navSize={70}
                autoPlay={true}
                autoPlayDelay={6}
                slideDuration={1.25}
            />
            </div>
            {displayImage && (<div className='home'>
                <img src={one} className='home_img'></img>
                {/* <img src={two} className='home_img'></img>  
                <img src={three} className='home_img'></img>
                <img src={four} className='home_img'></img>
                <img src={five} className='home_img'></img> */}
            </div>)}
        </>
    );
    
};

export default Home;