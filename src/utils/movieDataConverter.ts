export const getMovieFromDbData = (
  omdb: {
    Title: string;
    Runtime: string;
    Director: string;
    Country: string;
    Year: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
  },
  theMovieDb: {
    details: {
      title: string;
      runtime: string;
      release_date: string;
      overview: string;
      poster_path: string;
      backdrop_path: string;
      vote_average: string;
    };
  }
): {
  title: string;
  runtime: number;
  director: string;
  country: string;
  imdbRating: number;
  year: number;
  releaseDate: Date;
  plot: string;
  poster: string;
  backdrop: string;
} => ({
  title: omdb.Title || theMovieDb.details?.title,
  runtime: parseInt(omdb.Runtime || theMovieDb.details?.runtime),
  director: omdb.Director,
  country: omdb.Country,
  imdbRating: parseFloat(omdb.imdbRating || theMovieDb.details?.vote_average),
  year: parseInt(omdb.Year || theMovieDb.details?.release_date),
  releaseDate: new Date(theMovieDb.details?.release_date),
  plot: omdb.Plot || theMovieDb.details?.overview,
  poster: omdb.Poster || theMovieDb.details?.poster_path,
  backdrop:
    theMovieDb.details?.backdrop_path ||
    omdb.Poster ||
    theMovieDb.details?.poster_path
});
