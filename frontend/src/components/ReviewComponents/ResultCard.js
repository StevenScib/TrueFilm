import React from "react";
import styles from './ResultCard.module.css';

//Reesult card takes movie as as a prop
export const ResultCard = ({ movie }) => {
    //returns the movie information which is a poster image title and release date
    return (
        <div className={styles.resultCard}>
            <div className={styles.posterWrapper}>
                {movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                        alt={`${movie.title} Poster`}
                    />
                ) : (
                    <div className={styles.fillerPoster}></div>
                )}
            </div>

            <div className={styles.info}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{movie.title}</h3>
                    <h4 className={styles.releaseDate}>
                        {movie.release_date ? movie.release_date.substring(0, 4) : "-"}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default ResultCard;
