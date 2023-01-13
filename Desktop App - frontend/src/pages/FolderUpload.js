import React, { useState } from 'react'
import './FolderUpload.css'
const { ipcRenderer } = window.require('electron')

const FolderUpload = ({setFolderSelected,setFolderUploaded,folderUploaded,userName}) => {
    const [dirPath, setDirPath] = useState(null)
    const [cancelled, setCancelled] = useState(true)
    const folderTypes = {
        'video':1,
        'audio':2,
        'image':3
    }
    const [folderType, setFolderType] = useState('video')
    
    const buttonClick = async ()=>{  
        const result = await ipcRenderer.invoke('get-folder')
        setDirPath(result.filePaths[0])
        setCancelled(result.canceled)
        // console.log(result)
        console.log("working");
    }

    const addFolder = async (folder) => {
        console.log(folder)
        const res = await fetch('http://localhost:8000/server/directory/',{
            method:'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body:JSON.stringify(folder)
        })

        const data = await res.json()
        console.log(data);
    }

    const handleChange = (event)=> {
        setFolderType(event.target.value)
    }

    const handleSubmit = (event)=> {
        event.preventDefault()
        if(dirPath === null){
            alert('Please select a folder')
        }else{
            addFolder({dir_name:dirPath,dir_owner:userName,dir_type:folderTypes[folderType]})
            alert('Folder Added')
            setDirPath(null)
            setFolderType('video')
        }
    } 

    const closeOverlay = ()=>{
        setFolderSelected(false)
        setFolderUploaded(folderUploaded+1)
    }

    return (
        <div className='overlay'>
            <span className='close' onClick={closeOverlay}>X</span>
            <div className='overlayContent'>
                <button onClick={buttonClick} className="btn-folder">Select Folder</button>
                {cancelled===true ? null : <div className='path'>Path is: {dirPath}</div>}  
                <form onSubmit={handleSubmit}>
                    <div className='row'>            
                        <div className='col-sm-4 fol-type'>FolderType:</div>
                        <select value={folderType} onChange={handleChange} className='form-dropdown col-sm-8'>            
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                            <option value="image">Images</option>
                        </select>
                    </div>
                    <input className='btn-folder-submit' type="submit" value="Submit" />
                </form>    
            </div>
        </div>
    )
}

export default FolderUpload