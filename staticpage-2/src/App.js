import logo from './assests/logo.png'
import './App.css';
import Home from './pages/Home';

function App() {
  return (
    <div className='PP'>
      <div className="App">
    <header className="App-header">
      <div className="left">
        <img class="logo" src={logo} />
        </div>
       </header>
   </div> 
   <Home></Home>
   </div>
  );
}

export default App;
