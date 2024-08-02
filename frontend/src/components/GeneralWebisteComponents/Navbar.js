import { FaBars, FaTimes } from "react-icons/fa";
import { useRef } from "react";
import "../../Styles/main.css";
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

//navref toggles the resonsive class and iseAuth is imported from the auth context to see if the user is logged in
function Navbar() {
    const navRef = useRef();
    const { isAuthenticated } = useAuth();

    //Toggles the responsive nav class on <nav>
    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    //Returns the responsive navbar that if isAuthenticated is true links for watchlist wathced films and logout is shown if not just register and login
    return (
        <header>
            <h5 className="name">TrueFilm</h5>
            <nav ref={navRef}>
                <Link to="/">Home</Link>
                <Link to="/FindFilm">Find A Film!</Link>
                {isAuthenticated && (
                    <>
                        <Link to="/Watchlist">Watchlist</Link>
                        <Link to="/Watched">Watched Films</Link>
                    </>
                )}
                <Link to="/Films">Write a Review</Link>
                <Link to="/ReviewFilm">Reviews</Link>
                {isAuthenticated ? (
                    <Link to="/Logout">Logout</Link>
                ) : (
                    <>
                        <Link to="/Registration">Register</Link>
                        <Link to="/Login">Login</Link>
                    </>
                )}
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;
