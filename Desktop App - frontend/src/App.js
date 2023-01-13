import React,{useState} from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home.js';
import Music from './pages/Music.js';
import Movies from './pages/Movies.js';
import Search from './pages/Search.js';
import More from './pages/More';
import FolderContent from './pages/FolderContent'
import FolderImage from './pages/FolderImage';
import FolderMusic from './pages/FolderMusic';
import FolderUpload from './pages/FolderUpload';
import PreHome from './pages/PreHome';
import Login from './components/Login.js';
import {Navigate } from 'react-router-dom';
import SignUp from './components/SignUp';
import logo from './assests/logo.png'
import Home2 from './pages/Home2'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [folderDeleted, setFolderDeleted] = useState(1)
  const [userName, setUserNameApp] = useState("")

  const ifLogged = <>
  <div className="App">
 <header className="App-header">
   <div className="left">
     {/* <div className='logo'>LNMS</div> */}
     <img class="logo" src={logo}  />
     <div className='appname appname-after'>Streamified</div>
     </div>
  <div className="right">
  <div className='rigsea'> </div> 
   </div> 
 </header>
</div> 
<BrowserRouter>
   <Sidebar setIsLoggedIn={setIsLoggedIn} folderDeleted={folderDeleted} setFolderDeleted={setFolderDeleted} userName={userName}>
     <Routes>
       <Route path='/search' element={<Search />}/>
       <Route path="/movies" element={<Movies />} />
       <Route path="/" element={<Home2 displayImage={true}/>} />
       <Route path="/music" element={<Music />} />
       <Route path='/more' element={<More />}/> 
       <Route path='/folder/:id' element={<FolderContent />}/>
       <Route path='/folder/video/:id' element={<FolderContent folderDeleted={folderDeleted} setFolderDeleted={setFolderDeleted}/>}/>
       <Route path='/folder/audio/:id' element={<FolderMusic folderDeleted={folderDeleted} setFolderDeleted={setFolderDeleted}/>}/>
       <Route path='/folder/image/:id' element={<FolderImage folderDeleted={folderDeleted} setFolderDeleted={setFolderDeleted}/>}/>
       <Route path='/folderUpload' element={<FolderUpload />}/>
     </Routes>
   </Sidebar>
 </BrowserRouter>
 </>

  const prehome = <>
    <BrowserRouter>
      <PreHome>
        <Routes>
          {/* <Route path='/search' element={<Search />}/> */}
          {/* <Route path="/movies" element={<Movies />} /> */}
          <Route path="/" element={<Home2 displayImage={true}/>} />
          {/* <Route path="/music" element={<Music />} /> */}
          {/* <Route path='/more' element={<More />}/>  */}
          {/* <Route path='/folder/:id' element={<FolderContent />}/> */}
          {/* <Route path='/folder/video/:id' element={<FolderContent />}/> */}
          {/* <Route path='/folder/audio/:id' element={<FolderContent />}/> */}
          {/* <Route path='/folder/image/:id' element={<FolderImage />}/> */}
          {/* <Route path='/folderUpload' element={<FolderUpload />}/> */}
          <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn} setUserNameApp={setUserNameApp}/>}/>
          {/* <Route path='/signup/redirect' element={<Navigate to="/signup" replace />}/> */}
          <Route path='/signup/' element={<SignUp/>}/>
        </Routes>
      </PreHome>
    </BrowserRouter>
  </>

  return (
    isLoggedIn?ifLogged:prehome
  );
};

export default App;