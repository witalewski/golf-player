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

interface Subtitles {
  vttPath: string;
  language: string;
}
