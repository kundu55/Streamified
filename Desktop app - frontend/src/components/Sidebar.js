import React, { useEffect, useState } from 'react';
import { FaHome,FaBars,}from "react-icons/fa";
import {BiMovie,BiMusic,BiHelpCircle, BiSearch, BiImage, BiLogOut} from "react-icons/bi";
import {AiFillCompass,AiFillFolderAdd} from "react-icons/ai";
import {MdArrowForwardIos} from "react-icons/md";
import {ImImages} from "react-icons/im"
import {BsCameraVideo} from "react-icons/bs"
import { NavLink } from 'react-router-dom';
import FolderUpload from '../pages/FolderUpload';

const Sidebar = ({children,setIsLoggedIn,folderDeleted,userName}) => {
    const[isOpen ,setIsOpen] = useState(false);
    const [folderSelected, setFolderSelected] = useState(false)
    const [folderUploaded, setFolderUploaded] = useState(1)
    const toggle = () => setIsOpen (!isOpen);
    console.log(userName)
    const menuItem=[
        {
            path:"/",
            name:"Home",
            icon:<FaHome/>
        },
        {
            path:"/search",
            name:"Search",
            icon:<BiSearch/>
        },
        {
            path:"/movies",
            name:"Movies",
            icon:<BiMovie/>
        },
        {
            path:"/music",
            name:"Music",
            icon:<BiMusic/>
        },
        {
            path:"/discover",
            name:"Discover",
            icon:<AiFillCompass/>
        },
        {
            path:"/more",
            name:"More",
            icon:<MdArrowForwardIos/>
        },
        {
            path:"/support",
            name:"Support",
            icon:<BiHelpCircle/>
        }
    ]

    const FolderIcons = [<BiMovie/>,<BiMusic/>,<BiImage/>]
    const FolderPath = ['/video','/audio','/image']

    const [folderList, setFolder] = useState([])

    useEffect(()=>{
        const getFolders = async ()=>{
            const allFolders = await fetchFolders()
            setFolder(allFolders)
        }
        getFolders()
    },[folderUploaded,folderDeleted])

    const fetchFolders = async () => {
        const res = await fetch(`http://localhost:8000/server/directory/${userName}`)
        const data = await res.json()
        return data
    }

    const folderName = (path)=>{
        let last = path.lastIndexOf("/")
        return path.slice(last+1)
    }

    const folderOverlay = ()=>{
        setFolderSelected(!folderSelected)
    }

    const handelSignOut = ()=>{
        setIsLoggedIn(false)
    }

    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "90px"}} className="sidebar" 
           /* onMouseEnter={toggle} onMouseLeave={toggle} */>
               <div className="top_section" onClick={toggle} >
                   {/* <h1 style={{display: isOpen ? "block" : "none"}} className="logo"></h1> */}
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {/* {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               } */}
               {
                    <NavLink to="/" className="link" activeclassName="active">
                        <div className="icon"><FaHome/></div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">Home</div>
                    </NavLink>
               }
               {
                    <NavLink to="#" className="link active_folder" onClick={folderOverlay} activeclassName="">
                        <div className="icon"><AiFillFolderAdd/></div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">Add Folder</div>
                    </NavLink>
               }
               {
                    folderList.map((item)=>(
                        <NavLink to={`/folder${FolderPath[item.dir_type-1]}/${item.pk}`} key={item.pk} className="link" activeclassName="active">
                            <div className='icon'>{FolderIcons[item.dir_type-1]}</div>
                            <div style={{display: isOpen ? "block" : "none"}} className="link_text">{folderName(item.dir_name)}</div>
                        </NavLink>  
                    ))
               }
               {
                    <NavLink to='/' className="link" activeclassName="active" onClick={handelSignOut}>
                        <div className="icon"><BiLogOut/></div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">Sign out</div>
                    </NavLink>
               }
           </div>
           {folderSelected && (<FolderUpload setFolderSelected={setFolderSelected} setFolderUploaded={setFolderUploaded} folderUploaded={folderUploaded} userName={userName}/>)}
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;