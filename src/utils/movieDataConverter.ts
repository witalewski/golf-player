import { List } from "immutable";

const convertGenreIdToLabel = (id:number):string => {
  switch(id) {
    case 28:
      return "Action";
    case 12:
      return "Adventure";
    case 16:
      return "Animation";
    case 35:
      return "Comedy";
    case 80:
      return "Crime";
    case 99:
      return "Documentary";
    case 18:
      return "Drama";
    case 10751:
      return "Family";
    case 14:
      return "Fantasy";
    case 36:
      return "History";
    case 27:
      return "Horror";
    case 10402:
      return "Music";
    case 9648:
      return "Mystery";
    case 10749:
      return "Romance";
    case 878:
      return "Science Fiction";
    case 10770:
      return "TV Movie";
    case 53:
      return "Thriller";
    case 10752:
      return "War";
    case 37:
      return "Western";
  }
}

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
      genre_ids: number[];
      videos: {
        results: {
          site: string;
          key: string;
        }[];
      };
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
  genres: string[];
  trailer: string;
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
    theMovieDb.details?.poster_path,
  genres: theMovieDb.details?.genre_ids.map(convertGenreIdToLabel),
  trailer: List(theMovieDb.videos?.results).filter(({site}) => site === "YouTube").get(0)?.key
});
