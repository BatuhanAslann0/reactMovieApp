import React , {useState , useContext} from 'react'
import { MovieContext } from './Context/MovieContext'
import MoviesList from './Components/MoviesListComponent/MoviesList'
import Navbar from './Components/NavbarComponent/Navbar'

const App = () => {

  const [movies,setMovies] = useState([])
  const [searchedMovie,setSearchedMovie] = useState('')


  return (
    <MovieContext.Provider value={{movies,setMovies,searchedMovie,setSearchedMovie}} >
      <div className='app'>
         <Navbar />
         <MoviesList />
      </div>
    </MovieContext.Provider>
  )
}

export default App
