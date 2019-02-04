import os from "os";
import fs from "fs";
import { List } from "immutable";

const removeHiddenDirs = items => items.filter(item => !item.match(/^\./));

export const getMovieDirs = () =>
  new Promise((resolve, reject) => {
    fs.readdir(`${os.homedir()}/Movies`, (err, items) => {
      if (err) {
        reject(err);
      } else {
        resolve(removeHiddenDirs(items));
      }
    });
  });

export const getMovieFilePath = dirpath => {
  const itemsInDirectory = fs.readdirSync(dirpath);
  const filesInDirectory = [];
  itemsInDirectory.forEach(item => {
    const path = `${dirpath}/${item}`;
    const { size } = fs.statSync(path);
    filesInDirectory.push({
      path,
      size
    });
  });
  if (filesInDirectory.length) {
    return List(filesInDirectory)
      .sort((a, b) => b.size - a.size)
      .get(0).path;
  }
};
