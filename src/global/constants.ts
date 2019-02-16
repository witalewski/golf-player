export enum SortOrder {
  RecentlyAdded = "RecentlyAdded",
  ReleaseDate = "ReleaseDate",
  Rating = "Rating",
  Alphabetically = "Alphabetically"
}

export const DEFAULT_DEPTH_LIMIT = 2;
export const MIN_MOVIE_FILE_SIZE = 80 * 1024 * 1024; // 80 MB

export const GENRE_DISPLAY_LOWER_TRESHOLD = 1;
export const CATEGORY_DISPLAY_UPPER_TRESHOLD = 6;

export const API_URL =
  "https://qw6c0mxwz9.execute-api.eu-west-1.amazonaws.com/default/lightswitch";
export const API_KEY = "S0a5WCywb68N075YgoTVK3TidPB11bus2vplyW9s";