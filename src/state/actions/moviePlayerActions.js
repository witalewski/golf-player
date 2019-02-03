export const PLAY_MOVIE = "PLAY_MOVIE";

export const playMovie = movie => {
  console.log(movie);
  return {
    type: PLAY_MOVIE,
    movie
  };
};
