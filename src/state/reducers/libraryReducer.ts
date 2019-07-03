import { List, Set } from "immutable";
import {
  RECEIVE_MOVIE,
  PLAY_TRAILER,
  HIDE_TRAILER
} from "../actions/libraryActions";
import {
  SortOrder,
  CATEGORY_DISPLAY_UPPER_TRESHOLD
} from "../../global/constants";
import { sortMovies } from "../../utils/movieSorter";
import { MovieCollection, Movie } from "global";

const initialState = {
  trailer: "",
  movies: Set(),
  movieCollections: [
    {
      label: "New Releases",
      movies: List(),
      limit: CATEGORY_DISPLAY_UPPER_TRESHOLD,
      sortOrder: SortOrder.ReleaseDate
    },
    {
      label: "Top Rated",
      movies: List(),
      limit: CATEGORY_DISPLAY_UPPER_TRESHOLD,
      sortOrder: SortOrder.Rating
    },
    {
      label: "All movies",
      movies: List(),
      limit: Infinity,
      sortOrder: SortOrder.Alphabetically
    }
  ]
};

const updateCollection = (
  collection: MovieCollection,
  movie: Movie
): MovieCollection => ({
  ...collection,
  movies: sortMovies(collection.movies.push(movie), collection.sortOrder).take(
    collection.limit
  )
});

export const libraryReducer = (
  state = initialState,
  action
): {
  trailer: string;
  movies: Set<Movie>;
  movieCollections: MovieCollection[];
} => {
  switch (action.type) {
    case RECEIVE_MOVIE:
      return state.movies.find(
        movie => movie.fileName === action.movie.fileName
      )
        ? state
        : {
            ...state,
            movies: state.movies.add(action.movie),
            movieCollections: state.movieCollections.map(collection =>
              updateCollection(collection, action.movie)
            )
          };
    case PLAY_TRAILER:
      return {
        ...state,
        trailer: action.key
      };
    case HIDE_TRAILER:
      return {
        ...state,
        trailer: ""
      };
    default:
      return state;
  }
};
