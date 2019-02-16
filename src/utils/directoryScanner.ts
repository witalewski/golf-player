import os from "os";
import fs from "fs";
import axios from "axios";
import { List } from "immutable";
import { getUserVolumes } from "./volumesScanner";
import { DEFAULT_DEPTH_LIMIT } from "../global/constants";
import { parseDirectoryName } from "./directoryNameParser";
import { getMovieFromDbData } from "./movieDataConverter";
import { API_URL, API_KEY } from "../global/constants";
import { receiveMovie } from "../state/actions/libraryActions";

interface MovieFile {
  filePath: string;
  fileSize: number;
  fileName: string;
  dateModified: Date;
  directoryName: string;
  directoryPath: string;
}

const loadMovieDetails = (movieFile, store) => {
  const { title, year } = parseDirectoryName(movieFile.directoryName);
  axios
    .post(
      API_URL,
      JSON.stringify({
        title: title.replace(/[^a-zA-Z0-9\s]/g, ""),
        year
      }),
      {
        headers: {
          "X-Api-Key": API_KEY,
          "Content-Type": "application/json"
        }
      }
    )
    .then(({ data: { omdb, theMovieDb } }) => {
      const movie = {
        ...getMovieFromDbData(omdb, theMovieDb),
        ...movieFile
      };
      if (movie.title) {
        store.dispatch(receiveMovie(movie));
      } else {
        console.log("Couldn't find match for", title);
      }
    })
    .catch(console.log);
};

export const scanDirectory = (
  path: string,
  directoryName: string,
  depthLimit: number,
  store
): void => {
  console.log("Scanning", `${path}/${directoryName}`);
  try {
    fs.readdirSync(`${path}/${directoryName}`).forEach(item => {
      const filePath = `${path}/${directoryName}/${item}`;
      const stats: fs.Stats = fs.statSync(filePath);
      if (stats.isDirectory() && depthLimit > 0) {
        scanDirectory(`${path}/${directoryName}`, item, depthLimit - 1, store);
      }
      if (
        item.match(/(webm|ogg|mp4|avi|mov|flv|wmv|mkv)$/) &&
        stats.size > 80 * 1024 * 1024
      ) {
        loadMovieDetails(
          {
            filePath,
            fileSize: stats.size,
            fileName: item,
            dateModified: stats.mtime,
            directoryName,
            directoryPath: `${path}/${directoryName}`
          },
          store
        );
      }
    });
  } catch (e) {
    return;
  }
};

export const getMovieDirs = (depthLimit, store): Promise<MovieFile[]> =>
  new Promise((resolve, reject) =>
    getUserVolumes().then(volumes =>
      resolve(
        [
          ...volumes.map(item => ["/Volumes", item]),
          [os.homedir(), "Movies"],
          [os.homedir(), "Downloads"]
        ]
          .map(([path, name]) => scanDirectory(path, name, depthLimit, store))
          .reduce((a, b) => [...a, ...b], [])
      )
    )
  );

export const getMovieFile = (
  dirpath: string
): {
  filePath: string;
  fileSize: number;
  fileName: string;
  dateModified: Date;
} => {
  const filesInDirectory = fs.readdirSync(dirpath).map(fileName => {
    const filePath = `${dirpath}/${fileName}`;
    const { size: fileSize, mtime: dateModified } = fs.statSync(filePath);
    return {
      filePath,
      fileSize,
      fileName,
      dateModified
    };
  });
  if (filesInDirectory.length) {
    return List(filesInDirectory)
      .sort((a, b) => b.fileSize - a.fileSize)
      .get(0);
  } else {
    return null;
  }
};
