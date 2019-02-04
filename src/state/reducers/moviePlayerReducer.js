import { PLAY_MOVIE, EXIT_PLAYER } from "../actions/moviePlayerActions";

const initialState = {
  isOpen: false,
  movie: ""
};

export const moviePlayerReducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_MOVIE:
      return {
        ...state,
        isOpen: true,
        movie: action.movie
      };
    case EXIT_PLAYER:
      return {
        ...state,
        isOpen: false,
        movie: null
      };
    default:
      return state;
  }
};
