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

const downloadSubs = (subsResult, directoryPath) =>
  new Promise((resolve, reject) => {
    fetch(subsResult.SubDownloadLink).then(res =>
      res.arrayBuffer().then(data => {
        const gzPath = `${directoryPath}/${subsResult.SubFileName}.gz`;
        fs.writeFileSync(gzPath, new Buffer(data));
        const subtitlesFile = `${directoryPath}/${subsResult.SubFileName}`;
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

const convertSubs = subtitlesItem =>
  new Promise((resolve, reject) => {
    const vttPath = subtitlesItem.file.replace(/\.[^\.]*$/, ".vtt");
    if (subtitlesItem.file.match(/srt$/)) {
      var srtData = fs.readFileSync(subtitlesItem.file);
      srt2vtt(srtData, function(err, vttData) {
        if (err) {
          reject(err);
        }
        fs.writeFileSync(vttPath, vttData);
        resolve({ vttPath, language: subtitlesItem.language });
      });
    } else if (subtitlesItem.file.match(/ass$/)) {
      fs.createReadStream(subtitlesItem.file)
        .pipe(ass2vtt())
        .pipe(fs.createWriteStream(vttPath));
      resolve({ vttPath, language: subtitlesItem.language });
    }
  });

export const getSubsForMovie = async movie => {
  try {
    const subsResults = await searchForSubs(movie.filePath);
    if (!subsResults) {
      return "";
    }
    const subtitlesFiles = await Promise.all(
      subsResults.map(subsItem => downloadSubs(subsItem, movie.directoryPath))
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
