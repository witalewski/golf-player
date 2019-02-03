import os from "os";
import fs from "fs";

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
