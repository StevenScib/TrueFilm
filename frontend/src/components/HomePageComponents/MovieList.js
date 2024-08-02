import React from 'react';
import styles from './MovieList.module.css';

const MovieList = ({ movies, selectMovie, lastMovieElementRef }) => {

  // Returns the list of movies 
  return (
    <div className={styles.movieList}>
      {movies.map((movie, index) => {
        if (movies.length === index + 1) {
          return (
            <div
              ref={lastMovieElementRef}
              key={movie.id}
              className={styles.movieItem}
              onClick={() => selectMovie(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          );
        } else {
          return (
            <div
              key={movie.id}
              className={styles.movieItem}
              onClick={() => selectMovie(movie)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
          );
        }
      })}
    </div>
  );
};

export default MovieList;
