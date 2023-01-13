
import React from 'react';
import {DefaultPlayer as Video} from 'react-html5video'
import 'react-html5video/dist/styles.css'
import './VideoPlayer.css'

// const VideoPlayer = (props) => {
//     return(
//         <Video 
//         style={{position: 'absolute', width: '25%', height: '25%'}}
//         // className='photo-grid'
//         loop
//         onCanPlayThrough={()=>
//             console.log('Video play')
//         }
//         >
//             <source src={props.path} type="video/webm" />
//         </Video>
//     )
// };

// export default VideoPlayer; 
const getFileName = (link)=>{
    return link.slice(link.lastIndexOf('/')+1).replaceAll('%20',' ').replace(/\.[^/.]+$/, "")
}

const VideoPlayer = (props) => {
    return(
            <div className="video">
            <Video 
                height = "275"
                loop
                onCanPlayThrough={()=>
                    console.log('Video play')
                }
                source src={props.path} type="video/webm" >
            </Video>
            
                <p className='video-title'>{getFileName(props.path)}</p>
            </div>

    )
};

export default VideoPlayer; 



