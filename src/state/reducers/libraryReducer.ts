import { List } from "immutable";
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
import { filterByGenre } from "../../utils/movieFilterer";

const initialState = {
  trailer: "",
  allMoviesAlphabetically: List(),
  recentlyAdded: List(),
  newReleases: List(),
  topRates: List(),
  actionAndAdventure: List(),
  comedyAndFamily: List(),
  crimeAndMystery: List(),
  documetaryAndAnimation: List(),
  dramaAndRomance: List(),
  historyAndWar: List(),
  music: List(),
  scienceFictionHorrorAndFantasy: List(),
  thriller: List()
};

export const libraryReducer = (
  state = initialState,
  action
): {
  trailer: string;
  allMoviesAlphabetically: List<Movie>;
  recentlyAdded: List<Movie>;
  newReleases: List<Movie>;
  topRates: List<Movie>;
  actionAndAdventure: List<Movie>;
  comedyAndFamily: List<Movie>;
  crimeAndMystery: List<Movie>;
  documetaryAndAnimation: List<Movie>;
  dramaAndRomance: List<Movie>;
  historyAndWar: List<Movie>;
  music: List<Movie>;
  scienceFictionHorrorAndFantasy: List<Movie>;
  thriller: List<Movie>;
} => {
  switch (action.type) {
    case RECEIVE_MOVIE:
      const movies = state.allMoviesAlphabetically.find(
        movie => movie.fileName === action.movie.fileName
      )
        ? state.allMoviesAlphabetically
        : state.allMoviesAlphabetically.push(action.movie);
      return {
        ...state,
        allMoviesAlphabetically: sortMovies(movies, SortOrder.Alphabetically),
        recentlyAdded: sortMovies(movies, SortOrder.RecentlyAdded).take(
          CATEGORY_DISPLAY_UPPER_TRESHOLD
        ),
        newReleases: sortMovies(movies, SortOrder.ReleaseDate).take(
          CATEGORY_DISPLAY_UPPER_TRESHOLD
        ),
        topRates: sortMovies(movies, SortOrder.Rating).take(
          CATEGORY_DISPLAY_UPPER_TRESHOLD
        ),
        actionAndAdventure: sortMovies(
          filterByGenre(movies, ["Action", "Adventure"]),
          SortOrder.RecentlyAdded
        ),
        comedyAndFamily: sortMovies(
          filterByGenre(movies, ["Comedy", "Family"]),
          SortOrder.RecentlyAdded
        ),
        crimeAndMystery: sortMovies(
          filterByGenre(movies, ["Crime", "Mystery"]),
          SortOrder.RecentlyAdded
        ),
        documetaryAndAnimation: sortMovies(
          filterByGenre(movies, ["Documentary", "Animation"]),
          SortOrder.RecentlyAdded
        ),
        dramaAndRomance: sortMovies(
          filterByGenre(movies, ["Drama", "Romance"]),
          SortOrder.RecentlyAdded
        ),
        historyAndWar: sortMovies(
          filterByGenre(movies, ["History", "War"]),
          SortOrder.RecentlyAdded
        ),
        music: sortMovies(
          filterByGenre(movies, ["Music"]),
          SortOrder.RecentlyAdded
        ),
        scienceFictionHorrorAndFantasy: sortMovies(
          filterByGenre(movies, ["Science Fiction", "Horror", "Fantasy"]),
          SortOrder.RecentlyAdded
        ),
        thriller: sortMovies(
          filterByGenre(movies, ["Thriller"]),
          SortOrder.RecentlyAdded
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
