import os from "os";
import fs from "fs";
import axios from "axios";
import { getUserVolumes } from "./volumesScanner";
import { parseDirectoryName } from "./directoryNameParser";
import { getMovieFromDbData } from "./movieDataConverter";
import { API_URL, API_KEY, MIN_MOVIE_FILE_SIZE } from "../global/constants";
import { receiveMovie } from "../state/actions/libraryActions";
import { logger } from "./logger";
import { db, find } from "../db/connect";

interface MovieFile {
  filePath: string;
  fileSize: number;
  fileName: string;
  dateModified: Date;
  directoryName: string;
  directoryPath: string;
}

type Dispatch = (action: { type: string }) => void;

const doTitlesMatch = (searchTitle: string, resultTitle: string): boolean =>
  resultTitle
    .replace(/\W/g, "")
    .toUpperCase()
    .includes(searchTitle.replace(/\W/g, "").toUpperCase());

const loadMovieDetails = async (movieFile: MovieFile, dispatch: Dispatch) => {
  const { title, year } = parseDirectoryName(
    isRelevantDirectParent(movieFile.directoryName)
      ? movieFile.directoryName
      : movieFile.fileName
  );
  let [movie] = await find(movieFile);

  if (!movie) {
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
    movie = {
      ...getMovieFromDbData(omdb, theMovieDb),
      ...movieFile
    };
  } else {
    logger.info(`Found ${movieFile.directoryName} in cache`);
  }
  db.insert(movie);
  if (movie.title && doTitlesMatch(title, movie.title)) {
    dispatch(receiveMovie(movie));
  } else {
    logger.error(`Couldn't find match for ${title}`);
  }
};

const isPossibleVideoFile = (name: string, size: number) =>
  name.match(/(webm|ogg|mp4|avi|mov|flv|wmv|mkv)$/) &&
  !name.match("SAMPLE") &&
  size > MIN_MOVIE_FILE_SIZE;

const isPossibleVideoDirectory = (directoryName: string) =>
  !directoryName.match(
    /(^\.|Applications|Music|Windows|\$Recycle.Bin|Recovery|Program Files)/
  );

const isRelevantDirectParent = (directoryName: string): boolean =>
  !directoryName.match(/(^\.|Downloads|Movies)/);

const scanDirectory = (
  path: string,
  directoryName: string,
  depthLimit: number,
  dispatch: Dispatch
): void => {
  logger.info(`Scanning ${path}/${directoryName}`);
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
