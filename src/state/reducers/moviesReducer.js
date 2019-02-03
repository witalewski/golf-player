import { RECEIVE_DIRECTORIES } from "../actions/movieActions";

const initialState = {
  directories: []
};

export const moviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECEIVE_DIRECTORIES:
      return {
        ...state,
        directories: action.directories
      };
    default:
      return state;
  }
};
