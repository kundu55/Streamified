import React, { useState, useEffect } from 'react'; 
import { parse } from 'node-html-parser';

import './FolderContent.css'
import { useParams } from 'react-router-dom';

import ImageCom from './ImageCom';
import VideoPlayer from './VideoPlayer';
import Player from './AudioPlayer'

import './FolderImage.css'

import ImageOverlay from './ImageOverlay';
import { NavLink } from 'react-router-dom';
import { BiFolderMinus } from 'react-icons/bi';

const FolderImage = ({folderDeleted,setFolderDeleted}) => {
    const [contentList, setContent] = useState([])
    const [clickedImage, setClickedImage] = useState(false)
    const [overlayImageUrl, setOverlayImageUrl] = useState("")
    const [overlayImageIndex, setOverlayImageIndex] = useState(0)
    let dirType = 3
    const params = useParams()
    
    useEffect(()=>{
        const effect = async ()=>{
            setContent([])
            setClickedImage(false)
            const urlFetch = await fetch(`http://localhost:8000/server/serveDirectory/${params.id}`)
            const urlJson = await urlFetch.json()
            const url = urlJson.serverip
            console.log(url)
            const dirFetch = await fetch(`http://localhost:8000/server/directory/${params.id}`)
            const dirJson = await dirFetch.json()
            dirType = dirJson.dir_type
            
            const getAllUrls = async () => {
                const allUrls = await fetchUrls(url)
                allUrls.map((oneUrl)=>{
                    if(isVaildImage(oneUrl.attributes.href)){
                        setContent(contentList => [...contentList, "http://"+url+"/"+oneUrl.attributes.href])
                    }
                })
            }
            getAllUrls()
        }
        effect()
    },[params])
    

    const supportedImageFormats = ['.png','.jpeg','.jpg','.gif']
    // array of supported image formats
    // returns if the current url is a valid image format
    const isVaildImage = (imageSrc)=>{
        let extension = imageSrc.lastIndexOf(".")
        return supportedImageFormats.includes(imageSrc.slice(extension))
    }

    const fetchUrls = async (url) => {
        const res = await fetch("http://"+url)
        const html = await res.text()
        const root = parse(html)
        const allUrls = root.getElementsByTagName('a')
        console.log(allUrls);
        return allUrls
    }

    const handleClick = (link,index)=>{
        setClickedImage(true)
        setOverlayImageUrl(link)
        setOverlayImageIndex(index)
    }

    const handleClose = ()=>{
        setClickedImage(false)
    }

    const handelPrevious = (index) => {
        if(index !== 0){
            setOverlayImageUrl(contentList[index-1])
            setOverlayImageIndex(index-1)
        }
    }

    const handleNext = (index) => {
        if(index < contentList.length-1){
            setOverlayImageUrl(contentList[index+1])
            setOverlayImageIndex(index+1)
        }
    }

    const getFileName = (link)=>{
        return link.slice(link.lastIndexOf('/')+1).replaceAll('%20',' ').replace(/\.[^/.]+$/, "")
    }

    const delFold = (link)=>{
        fetch(`http://localhost:8000/server/directoryDetail/${params.id}`, {
            method: 'DELETE',
            headers: {
             'Accept': 'application/json',
             'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                firstParam: params.id
            })
        })
        setFolderDeleted(folderDeleted+1)
    }

    return (

        <div className='content-container'>
            <div className='deletebutton' >
            <NavLink
                    onClick={delFold} to={"/"} className="link" activeclassName="active">
                    <div className="icon"><BiFolderMinus/></div>
                    <div style={{display: "block"}} className="link_text">Delete this folder</div>
            </NavLink>
            </div>
            <div className='photo-grid'>
                {contentList.map((link,index)=>(
                    <div className='outercard' >
                        <div className='card' key={index} style={{backgroundImage:`url(${link})`}} src={link} onClick={()=>handleClick(link,index)}></div>
                        <p className='card-title'>{getFileName(link)}</p>
                    </div>                
                ))}
            </div>
            {clickedImage && (
                <ImageOverlay 
                    overlayImageUrl={overlayImageUrl} 
                    overlayImageIndex={overlayImageIndex} 
                    closeOverlay={handleClose} 
                    previousImage={handelPrevious}
                    nextImage={handleNext}
                    className='overlay'>
                </ImageOverlay>
            )}
            <div>&nbsp;</div> <div>&nbsp;</div> <div>&nbsp;</div> 

            

        </div>)
}

export default FolderImage