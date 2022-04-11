import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading'
import SearchBox from './components/SearchBox';
import AddToFavourites from './components/AddToFavourites';
import RemoveFavourites from './components/RemoveFavourites';


const App =()=> {
  const[movies, setMovies] = useState([]);
  const[searchValue, setSearchValue] = useState('') 
  const[favourites, setFavourites] = useState([])

  const getMovieRequest = async() => {
    const response = await fetch(`http://www.omdbapi.com/?s=star wars&apikey=dc7362f1`);

    const responseJson = await response.json();

    if (responseJson.Search){
      setMovies(responseJson.Search)
    }
  };

  useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );
    if (movieFavourites)
    {setFavourites(movieFavourites);}
  },[]);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items))
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList)
    saveToLocalStorage(newFavouriteList);
  }

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList)
  }




  return (
    <div className='container-fluid movie-app'>
      <div>
        <MovieListHeading heading = 'Movies'/>
        <SearchBox searchValue = {searchValue}
                   setSearchValue ={setSearchValue}
        />
      </div>
      <div className='row'>
        <MovieList
           movies={movies}
           favouriteComponent ={AddToFavourites}
           handleFavouritesClick = {addFavouriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
          <MovieListHeading heading = 'Favourites' />
      </div>
      <div className='row'>
          <MovieList 
           movies ={favourites}
           handleFavouritesClick = {removeFavouriteMovie}
           favouriteComponent = {RemoveFavourites} />
      </div>
    </div>
  )
}

export default App;
