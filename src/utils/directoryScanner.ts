import os from "os";
import fs from "fs";
import { List } from "immutable";

const removeHiddenDirs = (items: string[]): string[] =>
  items.filter(item => !item.match(/^\./));

export const getMovieDirs = (
  parentDirPath: string = `${os.homedir()}/Movies`
): Promise<
  {
    directoryName: string;
    directoryPath: string;
  }[]
> =>
  new Promise((resolve, reject) => {
    fs.readdir(parentDirPath, (err, items) => {
      if (err) {
        reject(err);
      } else {
        resolve(
          removeHiddenDirs(items).map(item => ({
            directoryName: item,
            directoryPath: `${parentDirPath}/${item}`
          }))
        );
      }
    });
  });

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
