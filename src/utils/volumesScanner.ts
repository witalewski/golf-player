import os from "os";
import { exec } from "child_process";
import { List } from "immutable";

export const getUserVolumes = (): Promise<List<string>> =>
  new Promise((resolve, reject) =>
    exec("ls -la /Volumes", (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else if (stderr) {
        reject(stderr);
      } else if (stdout) {
        resolve(
          List(stdout.split("\n"))
            .rest()
            .butLast()
            .map(line => {
              const [, , user, , , , , , path] = line.split(/\s+/);
              return { user, path };
            })
            .filter(({ user }) => user === os.userInfo().username)
            .map(({ path }) => path)
        );
      }
    })
  );
