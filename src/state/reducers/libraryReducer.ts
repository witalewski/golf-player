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
import { sortMovies } from "../../utils/movieSorter"
import { GENRE_DISPLAY_LOWER_TRESHOLD } from "../../global/constants";
import { MovieCollection, Movie } from "global";

const initialState = {
  trailer: "",
  movies: Set(),
  movieCollections: [
    {
      label: "Recently Added",
      movies: List(),
      genres: [],
      displayTreshold: 0,
      limit: CATEGORY_DISPLAY_UPPER_TRESHOLD,
      sortOrder: SortOrder.RecentlyAdded
    },
    {
      label: "Action & Adventure",
      movies: List(),
      genres: ["Action", "Adventure"],
      displayTreshold: GENRE_DISPLAY_LOWER_TRESHOLD,
      limit: Infinity,
      sortOrder: SortOrder.Rating
    },
    {
      label: "Comedy & Family",
      movies: List(),
      genres: ["Comedy", "Family"],
      displayTreshold: GENRE_DISPLAY_LOWER_TRESHOLD,
      limit: Infinity,
      sortOrder: SortOrder.Rating
    },
    {
      label: "Crime & Mystery",
      movies: List(),
      genres: ["Crime", "Mystery"],
      displayTreshold: GENRE_DISPLAY_LOWER_TRESHOLD,
      limit: Infinity,
      sortOrder: SortOrder.Rating
    },
    {
      label: "Documentary & Animation",
      movies: List(),
      genres: ["Documentary", "Animation"],
      displayTreshold: GENRE_DISPLAY_LOWER_TRESHOLD,
      limit: Infinity,
      sortOrder: SortOrder.Rating
    },
    {
      label: "Drama & Romance",
      movies: List(),
      genres: ["Drama", "Romance"],
      displayTreshold: GENRE_DISPLAY_LOWER_TRESHOLD,
      limit: Infinity,
      sortOrder: SortOrder.Rating
    },
    {
      label: "History & War",
      movies: List(),
      genres: ["History", "War"],
      displayTreshold: GENRE_DISPLAY_LOWER_TRESHOLD,
      limit: Infinity,
      sortOrder: SortOrder.Rating
    },
    {
      label: "Music",
      movies: List(),
      genres: ["Music"],
      displayTreshold: GENRE_DISPLAY_LOWER_TRESHOLD,
      limit: Infinity,
      sortOrder: SortOrder.Rating
    },
    {
      label: "Science Fiction, Horror & Fantasy",
      movies: List(),
      genres: ["Science Fiction", "Horror", "Fantasy"],
      displayTreshold: GENRE_DISPLAY_LOWER_TRESHOLD,
      limit: 0,
      sortOrder: SortOrder.Rating
    },
    {
      label: "Thrillers",
      movies: List(),
      genres: ["Thriller"],
      displayTreshold: GENRE_DISPLAY_LOWER_TRESHOLD,
      limit: Infinity,
      sortOrder: SortOrder.Rating
    },

    {
      label: "New Releases",
      movies: List(),
      genres: [],
      displayTreshold: 0,
      limit: CATEGORY_DISPLAY_UPPER_TRESHOLD,
      sortOrder: SortOrder.ReleaseDate
    },
    {
      label: "Top Rated",
      movies: List(),
      genres: [],
      displayTreshold: 0,
      limit: CATEGORY_DISPLAY_UPPER_TRESHOLD,
      sortOrder: SortOrder.Rating
    },
    {
      label: "All movies",
      movies: List(),
      genres: [],
      displayTreshold: 0,
      limit: Infinity,
      sortOrder: SortOrder.Alphabetically
    }
  ]
};

const updateCollection = (
  collection: MovieCollection,
  movie: Movie
): MovieCollection =>
  !collection.genres.length ||
  collection.genres.find(genre => movie.genres.indexOf(genre) > -1)
    ? {
        ...collection,
        movies: sortMovies(
          collection.movies.push(movie),
          collection.sortOrder
        ).take(collection.limit)
      }
    : collection;

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
