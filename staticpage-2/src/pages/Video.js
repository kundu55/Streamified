import React from 'react';
import './Video.css'
import pdf from '../assests/pdf.png'

const Video = () => {
        const onDownload=()=>{
        fetch('Guidelines.pdf').then(response => {
            response.blob().then(blob=>{
                const fileURL =window.URL.createObjectURL(blob);
                let alink=document.createElement('a');
                alink.href=fileURL;
                alink.download='Guidelines.pdf';
                alink.click();
            })
        })
    }
    return (<>
      <div id='foo' class="video-demo-section">
        <div class="video-cover">
          <div class="video-text">
            <div class="video-heading">
              <h1>Acoustic Streaming, <br />Satisfaction Guaranteed</h1>
            </div>
            <div class="video-info">
              <div class="video-info-cover">
                <p>
                  <h1>
                  Discover the steps to install the apps through the document
                  </h1>
                 
                </p>
              </div>
            </div>
          </div>
          <div class="video-check">
            <div class="video-embed">
              <div class="play-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/mL_NNVG5Eqk"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div class="mentors-intro">FEATURING DEMO VIDEO</div>
            </div>
            <div class="video-features">
              <div class="doc-button" onClick={onDownload} >INSTALLATION STEPS<img src={pdf} className="pdf"></img></div>
            </div>
          </div>
        </div>
      </div>

    </>
       
    );
};

export default Video;