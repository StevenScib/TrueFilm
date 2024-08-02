import React, { useState } from 'react';
import styles from './FilmForm.module.css';

// Arrays that contain the user choices
const genresList = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family',
    'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science Fiction',
    'Thriller', 'War', 'Western'
];

const decadesList = [
    '1940', '1950', '1960', '1970', '1980', '1990', '2000', '2010', '2020'
];

const languagesList = [
    'English', 'French', 'Spanish', 'German', 'Chinese', 'Japanese', 'Korean'
];

const FilmForm = ({ onSubmit }) => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [selectedDecades, setSelectedDecades] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [rating, setRating] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Only allows 3 genres to be chosen
    const handleGenreChange = (genre) => {
        setSelectedGenres(prevGenres => {
            if (prevGenres.includes(genre)) {
                return prevGenres.filter(g => g !== genre);
            } else if (prevGenres.length < 3) {
                return [...prevGenres, genre];
            } else {
                alert("You can only select up to 3 genres.");
                return prevGenres;
            }
        });
    };

    // Only allows 2 decades to be chosen
    const handleDecadeChange = (decade) => {
        setSelectedDecades(prevDecades => {
            if (prevDecades.includes(decade)) {
                return prevDecades.filter(d => d !== decade);
            } else if (prevDecades.length < 2) {
                return [...prevDecades, decade];
            } else {
                alert("You can only select up to 2 decades.");
                return prevDecades;
            }
        });
    };

    // Only allows 1 language to be chosen
    const handleLanguageChange = (language) => {
        setSelectedLanguages(prevLanguages => {
            if (prevLanguages.includes(language)) {
                return prevLanguages.filter(l => l !== language);
            } else if (prevLanguages.length < 1) {
                return [...prevLanguages, language];
            } else {
                alert("You can only select up to 1 language.");
                return prevLanguages;
            }
        });
    };

    //sets rating
    const handleRatingChange = (rate) => {
        setRating(rate);
    };

    //when user submits the form it locks their preferences in and if they find no films an error message occurs
    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        const preferences = {
            genres: selectedGenres,
            decades: selectedDecades,
            languages: selectedLanguages,
            rating: parseFloat(rating)
        };

        const filmsFound = await onSubmit(preferences);

        if (filmsFound.length === 0) {
            setErrorMessage('No films found matching your preferences, please try again with different selections.');
        }

        setLoading(false);
    };

    // Deselects all chosen preferences
    const handleDeselectAll = () => {
        setSelectedGenres([]);
        setSelectedDecades([]);
        setSelectedLanguages([]);
        setRating('');
        setErrorMessage('');
    };

    // Returns the form that users can select preferences and get a film
    return (
        <form onSubmit={handleSubmit} className={styles.formContainer}>
            <div className={styles.formGroup}>
                <label className={styles.label}>Genres (select up to 3): </label>
                <div className={styles.buttonGroup}>
                    {genresList.map(genre => (
                        <button
                            key={genre}
                            type="button"
                            className={selectedGenres.includes(genre) ? styles.selected : ''}
                            onClick={() => handleGenreChange(genre)}
                        >
                            {genre}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Decades (select up to 2): </label>
                <div className={styles.buttonGroup}>
                    {decadesList.map(decade => (
                        <button
                            key={decade}
                            type="button"
                            className={selectedDecades.includes(decade) ? styles.selected : ''}
                            onClick={() => handleDecadeChange(decade)}
                        >
                            {decade}s
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Languages (select 1): </label>
                <div className={styles.buttonGroup}>
                    {languagesList.map(language => (
                        <button
                            key={language}
                            type="button"
                            className={selectedLanguages.includes(language) ? styles.selected : ''}
                            onClick={() => handleLanguageChange(language)}
                        >
                            {language}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.formGroup}>
                <label className={styles.label}>Minimum Rating: </label>
                <div className={styles.ratingGroup}>
                    {[...Array(8)].map((_, i) => (
                        <button
                            key={i + 1}
                            type="button"
                            className={rating === `${i + 1}` ? styles.selected : ''}
                            onClick={() => handleRatingChange(`${i + 1}`)}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div className={styles.formGroup}>
                <button type="submit" className={styles.submitButton} disabled={loading}>
                    Get Recommendations
                </button>
                <button
                    type="button"
                    className={`${styles.submitButton} ${styles.deselectAll}`}
                    onClick={handleDeselectAll}
                >
                    Deselect All
                </button>
                {loading && <div className={styles.loadingSpinner} />}
                {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
            </div>
        </form>
    );
};

export default FilmForm;
