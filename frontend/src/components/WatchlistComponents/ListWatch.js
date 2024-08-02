import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import FilmCard from './FilmCard';
import styles from './Viewed.module.css';

const ListWatch = () => {
    const { watchlist } = useContext(GlobalContext);

    //returns the wathclist page that has a counter of the amount of films in the list, if watchlist has a film in it a film card component is made for each film if the is no films in the watch list the user is notified
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.watched}>My Watchlist</h1>
                    <span className={styles.count}>
                        {watchlist.length} {watchlist.length === 1 ? 'Film' : 'Films'}
                    </span>
                </div>

                {watchlist.length > 0 ? (
                    <div className={styles.filmGrid}>
                        {watchlist.map(movie => (
                            <FilmCard key={movie.id} movie={movie} type="watchlist" />
                        ))}
                    </div>
                ) : (
                    <h2 className={styles.noFilms}>No films currently in Watchlist</h2>
                )}

            </div>
        </div>
    );
};

export default ListWatch;
