import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Register.module.css';

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        secondName: '',
        username: '',
        password: '',
        role: 'USER',
    });
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState({ message: '', type: '' });

    //updates the form data and validates the current field
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        validateField(name, value);
    };

    //The validation reuired for each input
    const validateField = (name, value) => {
        let formErrors = { ...errors };

        switch (name) {
            case 'firstName':
                formErrors.firstName = value.length < 2 ? "First name must be at least 2 characters long." : "";
                break;
            case 'secondName':
                formErrors.secondName = value.length < 2 ? "Second name must be at least 2 characters long." : "";
                break;
            case 'username':
                formErrors.username = !/^[a-zA-Z0-9]{5,15}$/.test(value) ? "Username must be alphanumeric and 5-15 characters long." : "";
                break;
            case 'password':
                formErrors.password = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ?
                    "Password must be at least 8 characters long, including one uppercase letter, one lowercase letter, one number, and one special character." : "";
                break;
            default:
                break;
        }

        setErrors(formErrors);
    };

    //Validates the frorm data and sends a registration request to the backend 3 possible messages can be showcased to the user
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(errors).every(error => error === "") && Object.values(formData).every(field => field !== "")) {
            try {
                const response = await axios.post('http://localhost:8080/register', {
                    ...formData,
                    lastName: formData.secondName,
                });
                console.log(response.data.token);
                setNotification({ message: 'Registration successful!', type: 'success' });
            } catch (error) {
                setNotification({ message: 'This username is already taken use another', type: 'error' });
            }
        } else {
            setNotification({ message: 'Form has errors or missing fields.', type: 'error' });
        }
    };

    //returns the register form with 4 inputs that are validated once submitted and has a link to login page
    return (
        <div className={styles.backgroundContainer}>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                {notification.message && (
                    <p className={`${styles.notification} ${notification.type === 'success' ? styles.success : styles.errorNotification}`}>
                        {notification.message}
                    </p>
                )}
                <div className={styles.formGroup}>
                    <h2 className={styles.notification}>Register</h2>
                    <label className={styles.label}>First Name:</label>
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Second Name:</label>
                    <input
                        type="text"
                        name="secondName"
                        value={formData.secondName}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    {errors.secondName && <span className={styles.error}>{errors.secondName}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Username:</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    {errors.username && <span className={styles.error}>{errors.username}</span>}
                </div>
                <div className={styles.formGroup}>
                    <label className={styles.label}>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className={styles.input}
                    />
                    {errors.password && <span className={styles.error}>{errors.password}</span>}
                </div>
                <button type="submit" className={styles.button}>Register</button>
                <p className={styles.link}>Already have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    );
};

export default Register;
