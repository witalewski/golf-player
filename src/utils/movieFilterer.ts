import { List } from "immutable";

export const filterByGenre = (
  movies: List<Movie>,
  genres: string[]
): List<Movie> =>
  movies.filter(movie =>
    movie.genres.find(genre => genres.indexOf(genre) > -1)
  );
