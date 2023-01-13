import React from 'react'
import './ImageOverlay.css'
import {AiOutlineDoubleLeft,AiOutlineDoubleRight} from "react-icons/ai";

const ImageOverlay = (props) => {
  return (
    <>
        <span className='close' onClick={props.closeOverlay}>X</span>
        <div className='overlay'>
            <div className='left-side-icons'><AiOutlineDoubleLeft onClick={()=>props.previousImage(props.overlayImageIndex)}/></div>
            <img src={props.overlayImageUrl} className='overlayImg'></img>
            <div className='right-side-icons'><AiOutlineDoubleRight onClick={()=>props.nextImage(props.overlayImageIndex)}/></div>
        </div>
    </>
  )
}

export default ImageOverlay