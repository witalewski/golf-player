import { combineReducers } from "redux";

import { libraryReducer } from "./libraryReducer";
import { playerReducer } from "./playerReducer";

export const reducers = combineReducers({
  library: libraryReducer,
  player: playerReducer
});
