import React, { useState, useEffect } from 'react'; 
import { parse } from 'node-html-parser';

import './FolderMusic.css'

// import './AudioPlayerConfigure.scss'
import { useParams } from 'react-router-dom';

import ImageCom from './ImageCom';
import VideoPlayer from './VideoPlayer';
import Player from './AudioPlayer'
import { NavLink } from 'react-router-dom';
import { BiFolderMinus } from 'react-icons/bi';

// fetch('http://192.168.29.150:49317/')
// .then((res)=> res.text())
// .then((html)=> {
//     const root = parse(html)
//     const allUrls = root.getElementsByTagName('a')
//     console.log(allUrls[0].attributes.href);
// })

const FolderMusic = ({folderDeleted,setFolderDeleted}) => {
    const [contentList, setContent] = useState([])
    let dirType = 3
    const params = useParams()
    
    useEffect(()=>{
        const effect = async ()=>{
            setContent([])
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
                    if(isVaildSong(oneUrl.attributes.href)){
                        setContent(contentList => [...contentList, "http://"+url+"/"+oneUrl.attributes.href])
                    }
                })
            }
            getAllUrls()
        }
        effect()
    },[params])

    const fetchUrls = async (url) => {
        const res = await fetch("http://"+url)
        const html = await res.text()
        const root = parse(html)
        const allUrls = root.getElementsByTagName('a')
        console.log(allUrls);
        return allUrls
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

    const supportedMusicFormats = ['.mp3']
    // array of supported image formats
    // returns if the current url is a valid image format
    const isVaildSong = (imageSrc)=>{
        let extension = imageSrc.lastIndexOf(".")
        return supportedMusicFormats.includes(imageSrc.slice(extension))
    }

    return (
        <div className='content-container'>
        <NavLink
                onClick={delFold} to={"/"} className="link" activeclassName="active">
                <div className="icon"><BiFolderMinus/></div>
                <div style={{display: "block",alignItems:'right'}} className="link_text">Delete this folder</div>
        </NavLink>
        <div className='wrapper'>
        {contentList.map((link)=>(
                        <div key={link}>
                            <Player path={link}></Player>
                        </div>
                ))}
        </div>

        <div>&nbsp;</div> <div>&nbsp;</div> <div>&nbsp;</div> 

        

        </div>)
}

export default FolderMusic