import { List } from "immutable";
import { RECEIVE_DETAILS } from "../actions/movieActions";

const initialState = {
  movies: List()
};

export const libraryReducer = (
  state = initialState,
  action
): {
  movies: List<Movie>;
} => {
  switch (action.type) {
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
