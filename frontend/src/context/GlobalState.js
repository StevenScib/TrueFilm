import React, { createContext, useReducer, useEffect } from "react";
import AppReducer from './AppReducer';
import { useAuth } from './AuthContext';

//wathclist and watcheedlist
const initialState = {
    watchlist: [],
    viewed: [],
};

//an object that is can be used across the app
export const GlobalContext = createContext(initialState);

//Provides globale state and functions for the watch and watched lists
export const GlobalProvider = props => {
    const { isAuthenticated, username } = useAuth();
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //this starts when isauthenticated or the username changes, if the user is authenticated it retrieves their saved watchlsit from the local storage
    useEffect(() => {
        if (isAuthenticated && username) {
            const savedWatchlist = localStorage.getItem(`${username}_watchlist`);
            const savedViewed = localStorage.getItem(`${username}_viewed`);
            dispatch({ type: "SET_WATCHLIST", payload: savedWatchlist ? JSON.parse(savedWatchlist) : [] });
            dispatch({ type: "SET_VIEWED", payload: savedViewed ? JSON.parse(savedViewed) : [] });
        }
    }, [isAuthenticated, username]);

    //Runs when any changes are made to watched or watch list and if the user is authenticated the changes are saved
    useEffect(() => {
        if (isAuthenticated && username) {
            localStorage.setItem(`${username}_watchlist`, JSON.stringify(state.watchlist));
            localStorage.setItem(`${username}_viewed`, JSON.stringify(state.viewed));
        }
    }, [state.watchlist, state.viewed, isAuthenticated, username]);

    //adds m,ovie to watchlist from reducer
    const addMovieToWatchlist = movie => {
        dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
    };

    //Removes movie from watchlist 
    const removeMovieFromWatchlist = (id) => {
        dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
    };

    //adds movie to watched page
    const addMovieToViewed = movie => {
        dispatch({ type: "ADD_MOVIE_TO_VIEWED", payload: movie });
    };

    //moves movie form watchlist to watched list
    const moveToViewedList = movie => {
        dispatch({ type: 'MOVE_TO_VIEWED_LIST', payload: movie });
    };

    //Removes the movie from watched list
    const removeFromViewedList = id => {
        dispatch({ type: 'REMOVE_FROM_VIEWED_LIST', payload: id });
    };

    //makes these functions available app wide
    return (
        <GlobalContext.Provider value={{
            watchlist: state.watchlist,
            viewed: state.viewed,
            addMovieToWatchlist,
            removeMovieFromWatchlist,
            addMovieToViewed,
            moveToViewedList,
            removeFromViewedList
        }}>
            {props.children}
        </GlobalContext.Provider>
    );
};
