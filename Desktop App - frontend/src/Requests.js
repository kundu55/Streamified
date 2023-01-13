const API_KEY="a428fa858aac710e856426fc99a3b76f"

const requests={
    fetchTreanding:'https://api.themoviedb.org/3/trending/all/week?api_key=a428fa858aac710e856426fc99a3b76f',
    fetchTopRated:'https://api.themoviedb.org/3/movie/top_rated?api_key=a428fa858aac710e856426fc99a3b76f&language=en-US',
    fetchActionMovies:'https://api.themoviedb.org/3/discover/movie?api_key=a428fa858aac710e856426fc99a3b76f&with_genres=28',
    fetchComedyMovies:'https://api.themoviedb.org/3/discover/movie?api_key=a428fa858aac710e856426fc99a3b76f&with_genres=35',
    fetchHorrorMovies:'https://api.themoviedb.org/3/discover/movie?api_key=a428fa858aac710e856426fc99a3b76f&with_genres=27',
    fetchRomanceMovies:'https://api.themoviedb.org/3/discover/movie?api_key=a428fa858aac710e856426fc99a3b76f&with_genres=10749',
    fetchDocumantariesMovies:'https://api.themoviedb.org/3/discover/movie?api_key=a428fa858aac710e856426fc99a3b76f&with_genres=99',

}
export default requests;