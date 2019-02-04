import { List } from "immutable";
import { SortOrder } from "../global/constants";

export const sortMovies = (
  movies: List<Movie>,
  sortOrder: SortOrder
): List<Movie> => {
  switch (sortOrder) {
    case SortOrder.Alphabetically:
      return movies.sort((m1, m2) => m1.title.localeCompare(m2.title));
    case SortOrder.Rating:
      return movies.sort((m1, m2) => m2.imdbRating - m1.imdbRating);
    case SortOrder.ReleaseDate:
      return movies.sort(
        (m1, m2) => m2.releaseDate.getTime() - m1.releaseDate.getTime()
      );
    case SortOrder.RecentlyAdded:
    default:
      return movies.sort(
        (m1, m2) => m2.dateModified.getTime() - m1.dateModified.getTime()
      );
  }
};
