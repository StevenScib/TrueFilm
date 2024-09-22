import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { GlobalContext } from '../../context/GlobalState';
import { useAuth } from '../../context/AuthContext';
import styles from './DetailMovie.module.css';

//Api key and irl for tMBD
const API_KEY = 'b4fe057bc415efcaf7320adbc2b47c94';
const BASE_URL = 'https://api.themoviedb.org/3';

//gets movie and deselct movie as props 3 functions from globalcontext is used useauth for authentication
const DetailMovie = ({ movie, deselectMovie }) => {
    const { addMovieToWatchlist, watchlist, viewed } = useContext(GlobalContext);
    const { isAuthenticated } = useAuth();
    const [trailer, setTrailer] = useState(null);
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    //useEffect fetches the trailer data when movie.id changes uses the api to get it and then finds the traielr
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

    //These chcik if the movie is in the watchlsit or watched list
    const isMovieInWatchlist = watchlist.find(o => o.id === movie.id);
    const isMovieInViewed = viewed.find(o => o.id === movie.id);
    const disabledWatchlist = isMovieInWatchlist || isMovieInViewed;

    //adds the movie to watchlist if the user is logged in
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

    //returs the film details with the poster, buttons, rating, release date and youtube trailer
    return (
        <div className={styles.movieDetail}>
            <button onClick={deselectMovie} className={styles.backButton}>Back to Recommendations</button>
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

export default DetailMovie;
