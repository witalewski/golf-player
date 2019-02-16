import { SortOrder } from "../../global/constants";

export const RECEIVE_MOVIE = "RECEIVE_MOVIE";
export const SORT = "SORT";

export const receiveMovie = (movie: Movie) => ({
  type: RECEIVE_MOVIE,
  movie
});

export const sort = (sortOrder: SortOrder) => ({
  type: SORT,
  sortOrder
});
