import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './LoginForm.module.css';

//Handles userlogin form data is the username and password navigate is ised to navigate back to the home page
const LoginForm = () => {
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Updates the formdata when the user types using the name value
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // sends post request to the login endpoint, calls login function from useAith and updates the authentaication with the jwt token and username and if the user logs on they are sent to home page
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/login', formData);
            login({ token: response.data.token, username: formData.username });
            console.log(response.data.token);
            setError('');
            navigate('/');
        } catch (error) {
            console.error('There was an error logging in!', error);
            setError('Invalid username or password');
        }
    };

    //returns the login form and calls the requried functiosn and links to reistration if you dont have an account
    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit}>
                <h2 className={styles.notification}>Login</h2>
                <div className={styles.formGroup}>
                    <label htmlFor="username" className={styles.label}>Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        className={styles.input}
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.label}>Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className={styles.input}
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className={styles.button}>Login</button>
                {error && <p className={`${styles.notification} ${styles.errorNotification}`}>{error}</p>}
                <p className={styles.link}>Don't have an account? <Link to="/Registration">Register here</Link></p>
            </form>
        </div>
    );
};

export default LoginForm;
