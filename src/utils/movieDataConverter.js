export const getMovieFromDbData = (omdb, theMovieDb) => ({
  title: omdb.Title || theMovieDb.details.title,
  runtime: parseInt(omdb.Runtime || theMovieDb.details.runtime),
  director: omdb.Director,
  country: omdb.Country,
  year: parseInt(omdb.Year || theMovieDb.details.release_date),
  plot: omdb.Plot || theMovieDb.details.overview,
  poster: omdb.Poster || theMovieDb.details.poster_path,
  backdrop:
    theMovieDb.details.backdrop_path ||
    omdb.Poster ||
    theMovieDb.details.poster_path
});
