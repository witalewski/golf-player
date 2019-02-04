export const PLAY_MOVIE = "PLAY_MOVIE";
export const EXIT_PLAYER = "EXIT_PLAYER";

export const playMovie = (movie: Movie) => {
  return {
    type: PLAY_MOVIE,
    movie
  };
};

export const exitPlayer = () => {
  return {
    type: EXIT_PLAYER
  };
};
