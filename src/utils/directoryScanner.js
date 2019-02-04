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
  const itemsInDirectory = fs.readdirSync(dirpath);
  const filesInDirectory = [];
  itemsInDirectory.forEach(fileName => {
    const filePath = `${dirpath}/${fileName}`;
    const { size: fileSize } = fs.statSync(filePath);
    filesInDirectory.push({
      filePath,
      fileSize,
      fileName
    });
  });
  if (filesInDirectory.length) {
    return List(filesInDirectory)
      .sort((a, b) => b.size - a.size)
      .get(0);
  }
};
