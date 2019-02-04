import { List } from "immutable";
import { RECEIVE_DIRECTORIES, RECEIVE_DETAILS } from "../actions/movieActions";

const initialState = {
  directories: [],
  movies: List()
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DIRECTORIES:
      return {
        ...state,
        directories: action.directories
      };
    case RECEIVE_DETAILS:
      const movies = state.movies
        .push(action.details)
        .sort((m1, m2) => m1.title.localeCompare(m2.title));
      return {
        ...state,
        movies
      };
    default:
      return state;
  }
};
