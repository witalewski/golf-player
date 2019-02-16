export const RECEIVE_MOVIE = "RECEIVE_MOVIE";
export const PLAY_TRAILER = "PLAY_TRAILER";
export const HIDE_TRAILER = "HIDE_TRAILER";

export const receiveMovie = (movie: Movie) => ({
  type: RECEIVE_MOVIE,
  movie
});

export const playTrailer = (key: string) => ({
  type: PLAY_TRAILER,
  key
});

export const hideTrailer = () => ({
  type: HIDE_TRAILER
});
