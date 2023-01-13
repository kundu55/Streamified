import React, { useEffect, useState } from 'react';
import Row from '../Row';
import './Search.css'

// const url =`https://api.themoviedb.org/3/search/movie?api_key=a428fa858aac710e856426fc99a3b76f&query=${searchValue}`;

const Search = () => {
    const [searchValue, setSearchValue] = useState('');
    const [movies,setMovies]=useState([]);
        const url =`https://api.themoviedb.org/3/search/movie?api_key=a428fa858aac710e856426fc99a3b76f&query=${searchValue}`;
        console.log(url);
        

        const handleChange = (e) => {
            e.preventDefault();
            setSearchValue(e.target.value);
          };
        
          useEffect(() => {
            fetch(url)
            .then((res)=>res.json())
            .then(data=>{
              console.log(data);
              setMovies(data.results);
            })
          }, [])
        
          // const searchMovie = async(e)=>{
          //   e.preventDefault();
          //   console.log("Searching");
          //   try{
          //       const url =`https://api.themoviedb.org/3/search/movie?api_key=a428fa858aac710e856426fc99a3b76f&query=${searchValue}`;
          //       const res= await fetch(url);
          //     const data= await res.json();
          //     console.log(data);
          //     setMovies(data.results);
          //   }
          //   catch(e){
          //     console.log(e);
          //   }
          // }
        
     

    return (
        <div className='search'>
            <h1>search page</h1>
            <form >
                 <input className='searchbox'
   type="text"
   placeholder="Search here"
   onChange={handleChange}
   value={searchValue} 
   />
  
             </form>
             <Row title="Search results..." fetchUrl={url}  isLargeRow={true} />

            
{/*                      
  {movies.length < 1 ?(
 

    
       
      ):(
        <h2>Sorry !! No Movies Found</h2>
      )} 
 */}



        </div>
    );
};

export default Search;