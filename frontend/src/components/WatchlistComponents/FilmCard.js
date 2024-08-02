import React from 'react';
import FilmControls from './FilmControls';
import styles from './FilmCard.module.css';

//Film card with the film controls on top
const FilmCard = ({ movie, type }) => {
  return (
    <div className={styles.filmCard}>
      {movie.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
          alt={`${movie.title} Poster`}
        />
      ) : null}
      <FilmControls type={type} movie={movie} />
    </div>
  );
};

export default FilmCard;
