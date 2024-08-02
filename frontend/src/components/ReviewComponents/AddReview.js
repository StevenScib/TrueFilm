import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ResultCard from './ResultCard';
import styles from './AddReview.module.css';

//states the components that will be used and also states taht the username will be the logged inusername
const AddReview = () => {
    let navigate = useNavigate();
    const { isAuthenticated, username: loggedInUsername } = useAuth();

    const [user, setUser] = useState({
        film: '',
        review: ''
    });
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedFilm, setSelectedFilm] = useState(null);
    const [wordCount, setWordCount] = useState(0);

    //Sets the user state and once the input goes over 2 letters the request to tmbd api is made and updates the results and if its looking at the review input its makes sure it doesnt go over 60 words
    const onInputChange = async (e) => {
        const { name, value } = e.target;
        if (name === 'film') {
            setUser({ ...user, [name]: value });
            setQuery(value);
            if (value.length > 2) {
                try {
                    const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${value}`);
                    setResults(response.data.results || []);
                } catch (err) {
                    console.error('Failed to fetch film suggestions', err);
                }
            } else {
                setResults([]);
            }
        } else if (name === 'review') {
            const words = value.trim().split(/\s+/);
            if (words.length <= 60) {
                setWordCount(words.length);
                setUser({ ...user, [name]: value });
            }
        }
    };


    //it sets the states with the seleceted film 
    const onSelectSuggestion = (movie) => {
        setUser({ ...user, film: movie.title });
        setSelectedFilm(movie);
        setResults([]);
        setQuery(movie.title);
    };


    //clears theselected film
    const onClearSelection = () => {
        setUser({ ...user, film: '' });
        setSelectedFilm(null);
        setQuery('');
        setResults([]);
    };

    //Checks if user is authenticated, validates that a movie is selected and a review is provided
    const onSubmit = async (e) => {
        e.preventDefault();
        if (!isAuthenticated) {
            setError('You must be logged in to add a review');
            return;
        }
        if (!selectedFilm || !user.review) {
            setError('Please select a valid film and enter your review');
            return;
        }

        //Sends a post request to backend this adds the review to backedn database and it also go to the reviews page
        const userData = { ...user, username: loggedInUsername, film: selectedFilm.title };
        try {
            await axios.post("http://localhost:8080/user", userData);
            navigate("/ReviewFilm");
        } catch (error) {
            setError('Failed to submit the review. Please try again.');
        }
    };

    //Returns a form that has two inputs that are validated adn a sunbmit button, conditionally renders a an error message
    return (

        <div className={styles.formContainer}>
            <h2 className={styles.title}>Add Review</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={onSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="film" className={styles.label}>Film</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            name="film"
                            value={query}
                            placeholder="Search for a film"
                            onChange={onInputChange}
                            className={styles.input}
                            autoComplete="off"
                            readOnly={!!selectedFilm}
                        />
                        {selectedFilm && (
                            <button type="button" onClick={onClearSelection} className={styles.clearButton}>
                                Clear
                            </button>
                        )}
                    </div>
                    {results.length > 0 && (
                        <ul className={styles.suggestions}>
                            {results.map((movie) => (
                                <li key={movie.id} onClick={() => onSelectSuggestion(movie)}>
                                    <ResultCard movie={movie} />
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="review" className={styles.label}>Review</label>
                    <textarea
                        name="review"
                        value={user.review}
                        placeholder="Enter your review (max 60 words)"
                        rows="4"
                        onChange={onInputChange}
                        className={styles.textarea}
                    />
                    <p className={styles.wordCount}>{wordCount} / 60 words</p>
                </div>
                <button type="submit" className={styles.button}>Submit Review</button>
            </form>
        </div>
    );
};

export default AddReview;
