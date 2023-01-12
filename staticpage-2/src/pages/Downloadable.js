import React from 'react';
import './Downloadable.css';
import down from '../assests/download.png'
import tv from '../assests/tv.png'
import laptop from '../assests/laptop.png'

const Downloadable = () => {
    // const onDownload=()=>{
    //     fetch('Guidelines.pdf').then(response => {
    //         response.blob().then(blob=>{
    //             const fileURL =window.URL.createObjectURL(blob);
    //             let alink=document.createElement('a');
    //             alink.href=fileURL;
    //             alink.download='Guidelines.pdf';
    //             alink.click();
    //         })
    //     })
    // }
    const onDownload1=()=>{
        fetch('streamified.apk').then(response => {
            response.blob().then(blob=>{
                const fileURL =window.URL.createObjectURL(blob);
                let alink=document.createElement('a');
                alink.href=fileURL;
                alink.download='streamified.apk';
                alink.click();
            })
        })
    }
    return (<>
    <>
    <div class="dwld-files-container">
        <div class="dwld-header">Experience the high quality apps by downloading them</div>
        <div class="dwld-btns">
            
            <div class="i-1" ><img src={tv} className="down1"></img></div>
            <div class="i-2" ><img src={laptop} className="down1"></img></div>
        </div>
        <div class="dwld-btns">
            
            <div class="app-1" onClick={onDownload1} >ANDROID TV APP<img src={down} className="down"></img></div>
            <a href='https://github.com/vaishnav-deloitte/HU-Local-Network-Media-Streaming' target="_blank" rel="noreferrer noopener" ><div class="app-2">DESKTOP APP<img src={down} className="down"></img></div> </a>
        </div>
      </div>

    </>
        
  
      </>
         
      );
  
   
  
};

export default Downloadable;