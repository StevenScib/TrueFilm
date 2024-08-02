import React, { useContext } from 'react';
import { GlobalContext } from "../../context/GlobalState";
import styles from './FilmControls.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faTrashAlt, faEyeSlash, faMinusCircle } from '@fortawesome/free-solid-svg-icons';

//accesses the functions from the globalcontext
const FilmControls = ({ movie, type }) => {
  const { removeMovieFromWatchlist, addMovieToViewed, moveToViewedList, removeFromViewedList } = useContext(GlobalContext);

  //conditonally renders icons based on wheter its the wathclist or viewed list 
  return (
    <div className={styles.cardControls}>
      {type === 'watchlist' && (
        <>
          <button className={`${styles.iconBtn} ${styles.add}`}
            onClick={() => addMovieToViewed(movie)}>
            <FontAwesomeIcon icon={faEye} />
          </button>
          <button className={`${styles.iconBtn} ${styles.remove}`}
            onClick={() => removeMovieFromWatchlist(movie.id)}>
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </>
      )}

      {type === 'viewed' && (
        <>
          <button className={`${styles.iconBtn} ${styles.add}`}
            onClick={() => moveToViewedList(movie)}>
            <FontAwesomeIcon icon={faEyeSlash} />
          </button>
          <button className={`${styles.iconBtn} ${styles.remove}`}
            onClick={() => removeFromViewedList(movie.id)}>
            <FontAwesomeIcon icon={faMinusCircle} />
          </button>
        </>
      )}
    </div>
  );
};

export default FilmControls;
