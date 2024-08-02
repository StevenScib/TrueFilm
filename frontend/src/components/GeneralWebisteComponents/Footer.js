// components/GeneralWebisteComponents/Footer.js
import React from 'react';
import styles from './Footer.module.css';

//Footer of app
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>&copy; {new Date().getFullYear()} TrueFilm. All rights reserved.</p>

            </div>
        </footer>
    );
};

export default Footer;
