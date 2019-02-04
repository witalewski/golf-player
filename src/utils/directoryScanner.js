import os from "os";
import fs from "fs";
import { List } from "immutable";

const removeHiddenDirs = items => items.filter(item => !item.match(/^\./));

export const getMovieDirs = (parentDirPath = `${os.homedir()}/Movies`) =>
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

export const getMovieFile = dirpath => {
  const filesInDirectory = fs.readdirSync(dirpath).map(fileName => {
    const filePath = `${dirpath}/${fileName}`;
    const { size: fileSize } = fs.statSync(filePath);
    return {
      filePath,
      fileSize,
      fileName
    };
  });
  if (filesInDirectory.length) {
    return List(filesInDirectory)
      .sort((a, b) => b.fileSize - a.fileSize)
      .get(0);
  }
};
