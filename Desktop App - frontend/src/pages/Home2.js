import React from 'react';
import Row from '../Row';
import './Home.css';
import requests from '../Requests';
import Banner from '../Banner'
import one from '../assests/desktopfinal.svg'
// import two from '../assests/2.png'
// import three from '../assests/3.png'
// import four from '../assests/4.png'
// import five from '../assests/5.png'

const Home = ({displayImage}) => {
    return (
        <>
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