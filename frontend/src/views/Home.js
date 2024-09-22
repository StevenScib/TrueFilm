import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import MovieList from "../components/HomePageComponents/MovieList";
import MovieDetail from "../components/HomePageComponents/MovieDetail";
import '../Styles/main.css';

const API_KEY = 'b4fe057bc415efcaf7320adbc2b47c94';
const BASE_URL = 'https://api.themoviedb.org/3';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [sortCriterion, setSortCriterion] = useState('popularity.desc');
  const [searchQuery, setSearchQuery] = useState('');

  //Gets the popular films from TMBD by updating the movie state without dupes
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
        setMovies((prevMovies) => {
          const newMovies = response.data.results.filter(movie => !prevMovies.some(prevMovie => prevMovie.id === movie.id));
          return [...prevMovies, ...newMovies];
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setLoading(false);
      }
    };
    if (!searchQuery) {
      fetchMovies();
    }
  }, [page, searchQuery]);

  //Can sort the films on popularity and rating
  useEffect(() => {
    setMovies((prevMovies) => [...prevMovies].sort((a, b) => {
      if (sortCriterion === 'popularity.desc') {
        return b.popularity - a.popularity;
      } else if (sortCriterion === 'rating.desc') {
        return b.vote_average - a.vote_average;
      } else if (sortCriterion === 'rating.asc') {
        return a.vote_average - b.vote_average;
      } else {
        return 0;
      }
    }));
  }, [sortCriterion]);

  //Enabels infinte scrolling
  const observer = useRef();
  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading]
  );

  //sets the selected movie to the one clicked by the user
  const selectMovie = (movie) => {
    setSelectedMovie(movie);
  };

  //resets the selectedmovie to null and returns to movie list
  const deselectMovie = () => {
    setSelectedMovie(null);
  };

  //Updates the sortCriterion when a user selects a different option
  const handleSortChange = (e) => {
    setSortCriterion(e.target.value);
  };

  //updates the searchQuery as the user types in the input
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  //Fetches the search results form TMBD and updates the movies state with the results if the search is empty it goes to page 1
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    if (searchQuery) {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchQuery}`);
        setMovies(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error searching movies:', error);
        setLoading(false);
      }
    } else {
      setPage(1);
    }
  };

  //returns the homepage with the search bar and dropdown, if a movie is selected the details will be shown
  return (
    <div className="Films">
      <h1 className="movieTitle">Popular Movies</h1>
      {!selectedMovie && (
        <div className="search-sort-container">
          <form onSubmit={handleSearchSubmit} className="search-form">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="search-input"
            />
            <button type="submit" className="search-button">Search</button>
          </form>
          <div className="sort-container">
            <label htmlFor="sort">Sort By:</label>
            <select id="sort" value={sortCriterion} onChange={handleSortChange}>
              <option value="popularity.desc">Popularity (High to Low)</option>
              <option value="rating.desc">Rating (High to Low)</option>
              <option value="rating.asc">Rating (Low to High)</option>
            </select>
          </div>
        </div>
      )}
      {selectedMovie ? (
        <MovieDetail movie={selectedMovie} deselectMovie={deselectMovie} />
      ) : (
        <MovieList movies={movies} selectMovie={selectMovie} lastMovieElementRef={lastMovieElementRef} />
      )}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Home;
