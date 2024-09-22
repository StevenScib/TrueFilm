import React, { useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';
import FilmCard from './FilmCard';
import styles from './Viewed.module.css';

const Viewed = () => {
  const { viewed } = useContext(GlobalContext);


  //Returns the Watched page and uses the viewed icons form the filmcard and also renders based on wheter there is films or no films in the list
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.watched}>Watched Films</h1>

          <span className={styles.count}>
            {viewed.length} <span className={styles.film}>{viewed.length === 1 ? 'Film' : 'Films'}</span>
          </span>
        </div>

        {viewed.length > 0 ? (
          <div className={styles.filmGrid}>
            {viewed.map((movie, index) => (
              <FilmCard key={index} movie={movie} type="viewed" />
            ))}
          </div>
        ) : (
          <h2 className={styles.noFilms}>No films currently in Watchlist</h2>
        )}
      </div>
    </div>
  );
}

export default Viewed;
