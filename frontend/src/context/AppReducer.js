const AppReducer = (state, action) => {
    switch (action.type) {
        //updates the watchlist with payload data
        case "SET_WATCHLIST":
            return {
                ...state,
                watchlist: action.payload,
            };
        //updates the watched list with payload data
        case "SET_VIEWED":
            return {
                ...state,
                viewed: action.payload,
            };
        //adds the movie to the watchlist, payload is the movie to be added
        case "ADD_MOVIE_TO_WATCHLIST":
            return {
                ...state,
                watchlist: [action.payload, ...state.watchlist],
            };
        //Removes movie from watchlist id is the payload to be filtered
        case "REMOVE_MOVIE_FROM_WATCHLIST":
            return {
                ...state,
                watchlist: state.watchlist.filter(
                    movie => movie.id !== action.payload),
            };
        //Moves a movie from the watchlist to the watched list
        case "ADD_MOVIE_TO_VIEWED":
            return {
                ...state,
                watchlist: state.watchlist.filter(
                    movie => movie.id !== action.payload.id),
                viewed: [action.payload, ...state.viewed],
            };
        //Moves a movie from the viewed list back to the wathclist
        case "MOVE_TO_VIEWED_LIST":
            return {
                ...state,
                viewed: state.viewed.filter(movie => movie.id !== action.payload.id),
                watchlist: [action.payload, ...state.watchlist]
            };
        //Removes movie from viewed list
        case "REMOVE_FROM_VIEWED_LIST":
            return {
                ...state,
                viewed: state.viewed.filter(
                    movie => movie.id !== action.payload),
            };
        default:
            return state;
    }
};

export default AppReducer;
