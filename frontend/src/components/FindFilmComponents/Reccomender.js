import React, { useState } from 'react';
import axios from 'axios';
import FilmForm from './FilmForm';
import PictureList from './PictureList';
import MovieDetail from './DetailMovie';
import styles from './Reccomender.module.css';

const API_KEY = 'b4fe057bc415efcaf7320adbc2b47c94';

const Recommender = () => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const MAX_PAGES = 90;

    //function theat fetches the films based on user preference first it gets the list of genres from TMBD and maps the genre to their IDS 
    const getMovies = async (preferences) => {
        const { genres, decades, languages, rating } = preferences;
        const genreResponse = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`);
        const genreMap = genreResponse.data.genres.reduce((map, genre) => {
            map[genre.name.toLowerCase()] = genre.id;
            return map;
        }, {});

        //Converts the user selected generes to ids amd converts the user selected languages to their language codes ising a switch statement
        const genreIds = genres.map(genre => genreMap[genre.toLowerCase()]).join(',');

        const languageCodes = languages.map(language => {
            switch (language.toLowerCase()) {
                case 'english': return 'en';
                case 'french': return 'fr';
                case 'spanish': return 'es';
                case 'german': return 'de';
                case 'chinese': return 'zh';
                case 'japanese': return 'ja';
                case 'korean': return 'ko';
                default: return '';
            }
        }).join(',');

        // Fetches the movies from TMBD allMovies stores the fetched films and page is set to 1
        const fetchMovies = async (page = 1) => {
            const movieResponse = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
                params: {
                    api_key: API_KEY,
                    with_genres: genreIds,
                    with_original_language: languageCodes,
                    sort_by: 'popularity.desc',
                    include_adult: false,
                    page: page
                }
            });
            return movieResponse.data;
        };

        let page = 1;
        const allMovies = [];

        //Loops until the max pages are hit which is 90 for this app or if there are no more results
        while (page <= MAX_PAGES) {
            const data = await fetchMovies(page);
            if (!data.results.length) break;
            allMovies.push(...data.results);
            page++;
        }

        //Filters the films based on release year abnd rating and sets the movies state with the filtered list
        const filteredMovies = allMovies.filter(movie => {
            const releaseYear = parseInt(movie.release_date.split('-')[0]);
            const meetsRating = movie.vote_average >= rating;
            return decades.some(decade => releaseYear >= decade && releaseYear < (parseInt(decade) + 10)) && meetsRating;
        });

        setMovies(filteredMovies);
        return filteredMovies;
    };

    //updates the selected movie
    const selectMovie = (movie) => {
        setSelectedMovie(movie);
    };

    //resets the selectedmovie to null
    const deselectMovie = () => {
        setSelectedMovie(null);
    };

    //returns the title and reccomended movies
    return (
        <div className={styles.recommender}>
            <h1 className={styles.Movie}>Movie Recommendation System</h1>
            {selectedMovie ? (
                <MovieDetail movie={selectedMovie} deselectMovie={deselectMovie} />
            ) : (
                <>
                    <FilmForm onSubmit={getMovies} />
                    <PictureList movies={movies} selectMovie={selectMovie} />
                </>
            )}
        </div>
    );
};

export default Recommender;
