import { RECEIVE_DIRECTORIES, RECEIVE_DETAILS } from "../actions/movieActions";

const initialState = {
  directories: [],
  movies: []
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DIRECTORIES:
      return {
        ...state,
        directories: action.directories
      };
    case RECEIVE_DETAILS:
      console.log([...state.movies, action.details]);
      return {
        ...state,
        movies: [...state.movies, action.details]
      };
    default:
      return state;
  }
};
