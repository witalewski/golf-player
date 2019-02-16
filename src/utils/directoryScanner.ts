import os from "os";
import fs from "fs";
import axios from "axios";
import { getUserVolumes } from "./volumesScanner";
import { parseDirectoryName } from "./directoryNameParser";
import { getMovieFromDbData } from "./movieDataConverter";
import { API_URL, API_KEY, MIN_MOVIE_FILE_SIZE } from "../global/constants";
import { receiveMovie } from "../state/actions/libraryActions";

interface MovieFile {
  filePath: string;
  fileSize: number;
  fileName: string;
  dateModified: Date;
  directoryName: string;
  directoryPath: string;
}

type Dispatch = (action: { type: string }) => void;

const loadMovieDetails = async (movieFile: MovieFile, dispatch: Dispatch) => {
  const { title, year } = parseDirectoryName(movieFile.directoryName);
  const {
    data: { omdb, theMovieDb }
  } = await axios.post(
    API_URL,
    JSON.stringify({
      title: title.replace(/-/g, " ").replace(/[^a-zA-Z0-9\s]/g, ""),
      year
    }),
    {
      headers: {
        "X-Api-Key": API_KEY,
        "Content-Type": "application/json"
      }
    }
  );
  const movie = {
    ...getMovieFromDbData(omdb, theMovieDb),
    ...movieFile
  };
  if (movie.title) {
    dispatch(receiveMovie(movie));
  } else {
    console.log("Couldn't find match for", title);
  }
};

const isPossibleVideoFile = (name: string, size: number) =>
  name.match(/(webm|ogg|mp4|avi|mov|flv|wmv|mkv)$/) &&
  !name.match("SAMPLE") &&
  size > MIN_MOVIE_FILE_SIZE;

const isPossibleVideoDirectory = (name: string) =>
  !name.match(
    /(^\.|Applications|Music|Windows|\$Recycle.Bin|Recovery|Program Files)/
  );

const scanDirectory = (
  path: string,
  directoryName: string,
  depthLimit: number,
  dispatch: Dispatch
): void => {
  console.log("Scanning", `${path}/${directoryName}`);
  try {
    fs.readdirSync(`${path}/${directoryName}`).forEach(item => {
      const filePath = `${path}/${directoryName}/${item}`;
      const stats: fs.Stats = fs.statSync(filePath);
      if (
        stats.isDirectory() &&
        isPossibleVideoDirectory(item) &&
        depthLimit > 0
      ) {
        scanDirectory(
          `${path}/${directoryName}`,
          item,
          depthLimit - 1,
          dispatch
        );
      } else if (isPossibleVideoFile(item, stats.size)) {
        loadMovieDetails(
          {
            filePath,
            fileSize: stats.size,
            fileName: item,
            dateModified: stats.mtime,
            directoryName,
            directoryPath: `${path}/${directoryName}`
          },
          dispatch
        );
      }
    });
  } catch (e) {
    return;
  }
};

export const searchForMovies = async (depthLimit, dispatch): Promise<void> => {
  const volumes = await getUserVolumes();
  [
    [os.homedir(), "Movies"],
    [os.homedir(), "Downloads"],
    ...volumes.map(item => ["/Volumes", item])
  ].forEach(([path, name]) => scanDirectory(path, name, depthLimit, dispatch));
};
