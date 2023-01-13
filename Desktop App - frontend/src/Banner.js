import React, { useEffect, useState } from 'react'
import requests from './Requests';
import axios from './axios';
import './Banner.css'
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

function Banner() {
    const[movie,setMovie]=useState([]);
    const[trailerUrl,setTrailerUrl]=useState("");

    useEffect(() => {
        async function fetchData() {
            const request= await axios.get(requests.fetchTopRated);
            setMovie(
                request.data.results[
                Math.floor(Math.random()*request.data.results.length-1)
            ]
            )
            return request;
        }
        fetchData();
    
    },[]);
   
    console.log(movie)

    function truncate(str,n){
        return str?.length>n?str.substr(0,n-1)+"....":str;
    }


    const opts = {
        height: '390',
        width: "100%",
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
      
      
      const handleClick=(movie) =>{
      if(trailerUrl){
        setTrailerUrl("");
      }else{
        movieTrailer(movie?.title || movie?.name || movie?.original_name || "")
        .then((url)=>{
           const urlParams=new URLSearchParams(new URL(url).search);
           setTrailerUrl(urlParams.get("v"));
          }).catch(error=>console.error(error))
      }
      };
      


  return (
    
    <><header className='banner'
          style={{
              backgroundSize: "cover",
              backgroundImage: `url(
            "https://images.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
              backgroundPosition: "center center",
          }}>

          <div className="banner__contents">
              <h1 className='banner__title'>
                  {movie?.title || movie?.name || movie?.original_name}</h1>
              <div className="banner__buttons">
                  <button className="banner__button" onClick={() => handleClick(movie)}>Watch</button>
                  <button className="banner__button">My List</button>
              </div>
              <h1 className="banner__description">
                  {truncate(movie?.overview, 150)}
              </h1>


          </div>
          <div className='banner__fadebottom' />
      </header>
      <div>{trailerUrl && <YouTube videoId={trailerUrl} opts={opts}></YouTube>}</div>
      </>

    
  )
}

export default Banner