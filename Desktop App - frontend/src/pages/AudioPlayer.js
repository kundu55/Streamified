
import React from 'react';
import AudioPlayer from 'react-h5-audio-player';
import './AudioPlayer.css'
// import './AudioPlayerConfigure.scss'
import musicLogo from '../assests/music-note.png'

import 'react-h5-audio-player/lib/styles.css';

const getFileName = (link)=>{
  return link.slice(link.lastIndexOf('/')+1).replaceAll('%20',' ').replace(/\.[^/.]+$/, "")
}

const Player = (props) => (
  <div className='audio-grid'>
    <div className='audio'>
      <img src={musicLogo} className='music-logo'></img>
      <AudioPlayer
        src={props.path}
        onPlay={e => console.log("onPlay")}
        showJumpControls={false}
        // other props here
      />
      <p className='audio-title'>{getFileName(props.path)}</p>
    </div> 
</div>
 
);

export default Player;
