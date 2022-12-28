import React , {useState , useEffect , useContext} from 'react'
import { MovieContext } from '../../Context/MovieContext'
import axios from 'axios'
import './MoviesList.css'

const MoviesList = () => {

  const {movies, setMovies, searchedMovie } = useContext(MovieContext)

  const [isLoading, setIsLoading] = useState(false)
  const [showError, setShowError] = useState(false)
  const [showLoading, setShowLoading] = useState(false)

  useEffect(() => {
    if (searchedMovie === '') {
      setIsLoading(true)
      axios.get(
        'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=868cc497e4f7b9de5aeaab6b18137de8&page=1'
      ).then((res) => {
        setMovies(res.data.results)
        setIsLoading(false)
      })
    } else {
      setIsLoading(true)
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=868cc497e4f7b9de5aeaab6b18137de8&query=${searchedMovie}`
        )
        .then((res) => {
          setMovies(res.data.results)
          setIsLoading(false)
        })
    }
  }, [searchedMovie])

  //Return searched movies
  const filteredMovies = () => {
    return movies.filter((movie) => movie.title.toLowerCase().includes(searchedMovie.toLowerCase()))
  }

  useEffect(() => {
    if (isLoading) {
      setShowLoading(true)
      setShowError(false)
    } else if (filteredMovies().length > 0) {
      setShowLoading(false)
      setShowError(false)
    } else {
      setShowLoading(false)
      setTimeout(() => setShowError(true), 1000)
    }
  }, [isLoading, filteredMovies])

    return (
  <div className='movies-container'>
    <div className="movies">
      {showLoading ? (
        <p className='loading'>Loading...</p>
      ) : showError ? (
        <p className='no-movie-message'>Sorry, this movie is not on our platform yet.</p>
      ) : filteredMovies().length > 0 ? (
        filteredMovies().map((movie, idx) => (
          <div key={idx} className='movie'>               
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="img" />
            <div className="movie-infos">
              <h2>{movie.title.length < 50 ? movie.title : null }</h2>
              <p>IMDb: {movie.vote_average}</p>
            </div>
          </div>
        ))
      ) : searchedMovie === '' ? (
        movies.map((movie, idx) => (
          <div key={idx} className='movie'>               
            <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="img" />
            <div className="movie-infos">
              <h2>{movie.title}</h2>
              <p>IMDb: {movie.vote_average}</p>
            </div>
          </div>
        ))
      ) : null
      }
    </div>
  </div>
);

}


export default MoviesList








//  <div className='movies-container'>
//         <div className="movies">
//           {searchedMovie === '' ? 
//            movies.map((movie, idx) => (
//                 <div key={idx} className='movie'>               
//                 <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="img" />
//                 <div className="movie-infos">
//                   <h2>{movie.title}</h2>
//                   <p>IMDb: {movie.vote_average}</p>
//                 </div>
//                 </div>
//             )) : movies !== [] ? filteredMovies().map((movie,idx) => (
//               <div key={idx} className='movie'>               
//                   <img src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} alt="img" />
//                   <div className="movie-infos">
//                     <h2>{movie.title.length < 50 ? movie.title : null }</h2>
//                     <p>IMDb: {movie.vote_average}</p>
//                   </div>
//                 </div>
//             )) : (
//               <p className='no-movie-message'>There is no movies in our data with this name. Sorry. </p>
//             )
//           }
//         </div>
//     </div>