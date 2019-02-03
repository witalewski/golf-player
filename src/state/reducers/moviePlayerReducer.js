import { PLAY_MOVIE } from "../actions/moviePlayerActions";

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
    default:
      return state;
  }
};
