import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalState';
import { useAuth } from '../../context/AuthContext';
import styles from './MovieDetail.module.css';

//Same exact component as the previous detail card just a wanted it in the smae folder as movie list so duplicated it.
const API_KEY = 'b4fe057bc415efcaf7320adbc2b47c94';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetail = ({ movie, deselectMovie }) => {
  const { addMovieToWatchlist, watchlist, viewed } = useContext(GlobalContext);
  const { isAuthenticated } = useAuth();
  const [trailer, setTrailer] = useState(null);
  const [message, setMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`);
        const trailerData = response.data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
        setTrailer(trailerData ? `https://www.youtube.com/embed/${trailerData.key}` : null);
      } catch (error) {
        console.error('Error fetching trailer:', error);
      }
    };
    fetchTrailer();
  }, [movie.id]);

  const isMovieInWatchlist = watchlist.find(o => o.id === movie.id);
  const isMovieInViewed = viewed.find(o => o.id === movie.id);
  const disabledWatchlist = isMovieInWatchlist || isMovieInViewed;

  const handleAddToWatchlist = () => {
    if (!isAuthenticated) {
      setMessage('You must be logged in to add films to your watchlist.');
      setSuccessMessage('');
      return;
    }

    addMovieToWatchlist(movie);
    setMessage('');
    setSuccessMessage('Movie successfully added to watchlist.');
  };

  return (
    <div className={styles.movieDetail}>
      <button onClick={deselectMovie} className={styles.backButton}>Back to Films</button>
      <button
        className={`${styles.backButton} ${disabledWatchlist ? styles.btnDisabled : ''}`}
        disabled={disabledWatchlist}
        onClick={handleAddToWatchlist}
      >
        Add to Watchlist
      </button>
      {message && <p className={styles.messageError}>{message}</p>}
      {successMessage && <p className={styles.messageSuccess}>{successMessage}</p>}
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <p className={styles.date}>Rating: {movie.vote_average.toFixed(1)}</p>
      <p>{movie.overview}</p>
      <p className={styles.date}> Release Date: {movie.release_date}</p>
      {trailer && (
        <div className={styles.trailer}>
          <iframe
            width="560"
            height="315"
            src={trailer}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );

};

export default MovieDetail;
