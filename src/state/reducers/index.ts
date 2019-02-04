import { combineReducers } from "redux";

import { moviesReducer } from "./moviesReducer";
import { moviePlayerReducer } from "./moviePlayerReducer";

export const reducers = combineReducers({
  movies: moviesReducer,
  moviePlayer: moviePlayerReducer
});
