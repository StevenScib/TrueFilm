import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

//AuthContext is created to provide authentication reladted data
const AuthContext = createContext();

//makes authentication state and functions available and the boolean statement is stored in local storage same as the username
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(
        () => localStorage.getItem('isAuthenticated') === 'true'
    );
    const [username, setUsername] = useState(
        () => localStorage.getItem('username') || ''
    );

    //Handles user login, updates the authentication state and saves the user info and token to local storage
    const login = ({ token, username }) => {
        setIsAuthenticated(true);
        setUsername(username);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', username);
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    };

    //this handles user logging out by resetting the authentican state and clears the user information from the localstorage and removes authorization header
    const logout = () => {
        setIsAuthenticated(false);
        setUsername('');
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
    };

    //sets the JWT token to authorization header of axios requests 
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
    }, []);

    //returns these funtions that can be used app wide
    return (
        <AuthContext.Provider value={{ isAuthenticated, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
