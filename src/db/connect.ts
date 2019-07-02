import Datastore from "nedb";
import os from "os";
import path from "path";

export const db = new Datastore({
  filename: path.resolve(os.homedir(), ".golfPlayer"),
  autoload: true
});

export const find = (query: any): Promise<any[]> =>
  new Promise((resolve, reject) =>
    db.find(query, (err, docs) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    })
  );
