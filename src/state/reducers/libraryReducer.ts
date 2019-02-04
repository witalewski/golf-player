import { List } from "immutable";
import { RECEIVE_DETAILS, SORT } from "../actions/libraryActions";
import { SortOrder } from "../../global/constants";

const initialState = {
  movies: List(),
  sortOrder: SortOrder.RecentlyAdded
};

const sortMovies = (movies: List<Movie>, sortOrder: SortOrder): List<Movie> => {
  switch (sortOrder) {
    case SortOrder.Alphabetically:
      return movies.sort((m1, m2) => m1.title.localeCompare(m2.title));
    case SortOrder.Rating:
      return movies.sort((m1, m2) => m2.imdbRating - m1.imdbRating);
    case SortOrder.ReleaseDate:
      return movies.sort(
        (m1, m2) => m2.releaseDate.getTime() - m1.releaseDate.getTime()
      );
    case SortOrder.RecentlyAdded:
    default:
      return movies.sort(
        (m1, m2) => m2.dateModified.getTime() - m1.dateModified.getTime()
      );
  }
};

export const libraryReducer = (
  state = initialState,
  action
): {
  movies: List<Movie>;
  sortOrder: SortOrder;
} => {
  switch (action.type) {
    case RECEIVE_DETAILS:
      return {
        ...state,
        movies: sortMovies(state.movies.push(action.details), state.sortOrder)
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
