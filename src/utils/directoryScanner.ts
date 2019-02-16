import os from "os";
import fs from "fs";
import { List } from "immutable";
import { getUserVolumes } from "./volumesScanner";

const removeHiddenDirs = (items: string[]): string[] =>
  items.filter(item => !item.match(/^[\.\$]/));

interface Directory {
  filePath: string;
  fileSize: number;
  fileName: string;
  dateModified: Date;
  directoryName: string;
  directoryPath: string;
}

export const scanDirectory = (
  path: string,
  directoryName: string,
  depthLimit: number = 2
): Directory[] => {
  console.log("Scanning", `${path}/${directoryName}`);
  try {
    return List(fs.readdirSync(`${path}/${directoryName}`))
      .map(item => {
        const filePath = `${path}/${directoryName}/${item}`;
        const stats: fs.Stats = fs.statSync(filePath);
        if (stats.isDirectory() && depthLimit > 0) {
          return scanDirectory(
            `${path}/${directoryName}`,
            item,
            depthLimit - 1
          );
        }
        if (
          item.match(/(webm|ogg|mp4|avi|mov|flv|wmv|mkv)$/) &&
          stats.size > 80 * 1024 * 1024
        ) {
          return [
            {
              filePath,
              fileSize: stats.size,
              fileName: item,
              dateModified: stats.mtime,
              directoryName,
              directoryPath: `${path}/${directoryName}`
            }
          ];
        }
        return [];
      })
      .toArray()
      .reduce((a, b) => [...a, ...b], []);
  } catch (e) {
    return [];
  }
};

export const getMovieDirs = (): Promise<Directory[]> =>
  new Promise((resolve, reject) =>
    getUserVolumes().then(volumes =>
      resolve(
        [
          ...volumes.map(item => ["/Volumes", item]),
          [os.homedir(), "Movies"],
          [os.homedir(), "Downloads"]
        ]
          .map(([path, name]) => scanDirectory(path, name))
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
