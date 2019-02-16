import { List } from "immutable";
import { RECEIVE_MOVIE, SORT } from "../actions/libraryActions";
import { SortOrder } from "../../global/constants";
import { sortMovies } from "../../utils/movieSorter";

const initialState = {
  movies: List(),
  sortOrder: SortOrder.RecentlyAdded
};

export const libraryReducer = (
  state = initialState,
  action
): {
  movies: List<Movie>;
  sortOrder: SortOrder;
} => {
  switch (action.type) {
    case RECEIVE_MOVIE:
      return {
        ...state,
        movies: state.movies.find(
          movie => movie.fileName === action.movie.fileName
        )
          ? state.movies
          : sortMovies(state.movies.push(action.movie), state.sortOrder)
      };
    case SORT:
      return {
        ...state,
        sortOrder: action.sortOrder,
        movies: sortMovies(state.movies, action.sortOrder)
      };
    default:
      return state;
  }
};
