import os from "os";
import fs from "fs";
import opensubtitles from "subtitler";
import gunzip from "gunzip-file";
import srt2vtt from "srt2vtt";
import ass2vtt from "ass-to-vtt";

const searchForSubs = async (movieFilePath, language = "") => {
    const token = await opensubtitles.api.login();
    const results = await opensubtitles.api.searchForFile(
      token,
      language,
      movieFilePath
    );
    return results.filter(
      item => item.LanguageName === "English" || item.LanguageName === "Polish"
    );
};

const downloadSubs = (subsResult, dirname) =>
  new Promise((resolve, reject) => {
    fetch(subsResult.SubDownloadLink).then(res =>
      res.arrayBuffer().then(data => {
        const gzPath = `${os.homedir()}/Movies/${dirname}/${
          subsResult.SubFileName
        }.gz`;
        fs.writeFileSync(gzPath, new Buffer(data));
        const subtitlesFile = `${os.homedir()}/Movies/${dirname}/${
          subsResult.SubFileName
        }`;
        gunzip(gzPath, subtitlesFile, () => {
          fs.unlinkSync(gzPath);
          resolve({
            file: subtitlesFile,
            language: subsResult.LanguageName
          });
        });
      })
    );
  });

const convertSubs = subtitlesFile =>
  new Promise((resolve, reject) => {
    const vttPath = subtitlesFile.file.replace(/\.[^\.]*$/, ".vtt");
    if (subtitlesFile.file.match(/srt$/)) {
      var srtData = fs.readFileSync(subtitlesFile.file);
      srt2vtt(srtData, function(err, vttData) {
        if (err) {
          reject(err);
        }
        fs.writeFileSync(vttPath, vttData);
        resolve({ vttPath, language: subtitlesFile.language });
      });
    } else if (subtitlesFile.file.match(/ass$/)) {
      fs.createReadStream(subtitlesFile.file)
        .pipe(ass2vtt())
        .pipe(fs.createWriteStream(vttPath));
      resolve({ vttPath, language: subtitlesFile.language });
    }
  });

export const getSubsForMovie = async (movieFilePath, movieDirectoryPath) => {
  try {
    const subsResults = await searchForSubs(movieFilePath);
    if (!subsResults) {
      return "";
    }
    const subtitlesFiles = await Promise.all(
      subsResults.map(subsItem => downloadSubs(subsItem, movieDirectoryPath))
    );
    if (!subtitlesFiles) {
      return "";
    }
    return await Promise.all(subtitlesFiles.map(file => convertSubs(file)));
  } catch (e) {
    console.log(e);
    return "";
  }
};
