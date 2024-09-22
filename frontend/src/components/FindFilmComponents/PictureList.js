import React from 'react';
import styles from './PictureList.module.css';

const PictureList = ({ movies, selectMovie }) => {

    // Returns the list of movies recommended
    return (
        <div className={styles.pictureList}>
            {movies.map(movie => (
                <div key={movie.id} className={styles.movieItem}>
                    {movie.poster_path ? (
                        <img
                            src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={`${movie.title} Poster`}
                            className={styles.moviePoster}
                            onClick={() => selectMovie(movie)}
                        />
                    ) : (
                        <div className={styles.blankPoster}></div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default PictureList;
