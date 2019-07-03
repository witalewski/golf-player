import { List } from "immutable";
import { SortOrder } from "./global/constants";

interface Movie {
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
  fileName: string;
  filePath: string;
  directoryName: string;
  directoryPath: string;
  dateModified: Date;
  genres: string[];
  trailer: string;
}

interface MovieCollection {
  label: string;
  movies: List<Movie>;
  limit: number;
  sortOrder: SortOrder;
}

interface Subtitles {
  vttPath: string;
  language: string;
}
