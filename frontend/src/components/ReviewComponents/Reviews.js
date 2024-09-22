import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import styles from './Reviews.module.css';

const Reviews = () => {
    const { username: loggedInUsername } = useAuth();
    const [users, setUsers] = useState([]);
    const [posters, setPosters] = useState({});
    const [editUserId, setEditUserId] = useState(null);
    const [editFilm, setEditFilm] = useState("");
    const [editReview, setEditReview] = useState("");

    // Fetches the movie poster from TMDB
    const fetchPoster = useCallback(async (film) => {
        if (!posters[film]) {
            try {
                const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&query=${film}`);
                const posterPath = response.data.results[0]?.poster_path;
                if (posterPath) {
                    setPosters(prevPosters => ({
                        ...prevPosters,
                        [film]: `https://image.tmdb.org/t/p/w500/${posterPath}`
                    }));
                }
            } catch (error) {
                console.error('Error fetching poster:', error);
            }
        }
    }, [posters]);

    // Loads users
    useEffect(() => {
        loadUsers();
    }, []);

    //fetchesposter is called when the user state changes
    useEffect(() => {
        users.forEach(user => {
            fetchPoster(user.film);
        });
    }, [users, fetchPoster]);

    //gets the user reviews from the backend and updates the user state
    const loadUsers = async () => {
        try {
            const result = await axios.get("http://localhost:8080/users", {
                headers: {
                    'Cache-Control': 'no-cache'
                }
            });
            setUsers(result.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    //editing is done by sending a put request
    const handleEdit = async (userId) => {
        try {
            const updatedUser = { film: editFilm, review: editReview };
            await axios.put(`http://localhost:8080/user/${userId}`, updatedUser, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            loadUsers();
            setEditUserId(null);
        } catch (error) {
            console.error('Error updating review:', error);
        }
    };

    //Deleting is done by sending a DELETE reqquest
    const handleDelete = async (userId) => {
        try {
            await axios.delete(`http://localhost:8080/user/${userId}`, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            loadUsers();
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    //sets the state to start editing
    const startEditing = (user) => {
        setEditUserId(user.id);
        setEditFilm(user.film);
        setEditReview(user.review);
    };

    //limits the user to 60 words so it matches with the add review
    const handleReviewChange = (e) => {
        const words = e.target.value.split(/\s+/).filter(Boolean);
        if (words.length <= 60) {
            setEditReview(e.target.value);
        }
    };

    //returns the reviews tha are in the database and the editing review textare for the description the buttons call for various functiona nd the editing and delete button will only appear for the user who created the review
    return (
        <div className={styles.reviewsContainer}>
            <h1 className={styles.pageTitle}>Reviews</h1>
            {users.map((user, index) => (
                <div key={index} className={`${styles.reviewCard} ${editUserId === user.id ? styles.editingCard : ''}`}>
                    <img
                        src={posters[user.film]}
                        alt={`${user.film} poster`}
                        className={styles.poster}
                    />
                    <div className={styles.reviewContent}>
                        {editUserId === user.id ? (
                            <div className={styles.editForm}>
                                <textarea
                                    value={editReview}
                                    onChange={handleReviewChange}
                                    className={styles.editTextarea}
                                />
                                <button className={`${styles.btn} ${styles.saveBtn}`} onClick={() => handleEdit(user.id)}>Save</button>
                            </div>
                        ) : (
                            <>
                                <h5 className={styles.title}><span className={styles.label}>Film:</span> {user.film}</h5>
                                <h5 className={styles.title}><span className={styles.label}>Username:</span> {user.username}</h5>
                                <h5 className={styles.title}><span className={styles.label}>Review:</span> {user.review}</h5>
                                {user.username === loggedInUsername && (
                                    <>
                                        <button className={`${styles.btn} ${styles.editBtn}`} onClick={() => startEditing(user)}>Edit</button>
                                        <button className={`${styles.btn} ${styles.deleteBtn}`} onClick={() => handleDelete(user.id)}>Delete</button>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;
