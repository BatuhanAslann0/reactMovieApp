import React , {useState , useContext} from 'react'
import { MovieContext } from '../../Context/MovieContext'
import './NavbarStyles.css'

const Navbar = () => {

  const {searchedMovie, setSearchedMovie } = useContext(MovieContext)

  return (
    <div className='navbar-container'>
      <div className="navbar-items">
         <h1>Movie+</h1>
         <input value={searchedMovie} placeholder='Search for a movie...' name="searchedMovie" type="text" onChange={(e) => setSearchedMovie(e.target.value)} />
      </div>
    </div>
  )
}

export default Navbar