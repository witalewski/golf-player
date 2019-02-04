import { PLAY_MOVIE, EXIT_PLAYER } from "../actions/playerActions";

const initialState = {
  isOpen: false,
  movie: ""
};

export const playerReducer = (state = initialState, action) => {
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
