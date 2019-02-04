import os from "os";
import fs from "fs";
import opensubtitles from "subtitler";
import gunzip from "gunzip-file";
import srt2vtt from "srt2vtt";

const searchForSubs = async (movieFilePath, language = "English") => {
  const token = await opensubtitles.api.login();
  const results = await opensubtitles.api.searchForFile(
    token,
    language,
    movieFilePath
  );
  return results.find(item => item.LanguageName === "English");
};

const downloadSubs = (subsResult, dirname) =>
  new Promise((resolve, reject) => {
    fetch(subsResult.SubDownloadLink).then(res =>
      res.arrayBuffer().then(data => {
        console.log(data);
        fs.writeFileSync(
          `${os.homedir()}/Movies/${dirname}/subs.gz`,
          new Buffer(data)
        );
        const subtitlesFile = `${os.homedir()}/Movies/${dirname}/${
          subsResult.SubFileName
        }`;
        gunzip(`${os.homedir()}/Movies/${dirname}/subs.gz`, subtitlesFile, () =>
          resolve(subtitlesFile)
        );
      })
    );
  });

const convertSubs = subtitlesFile =>
  new Promise((resolve, reject) => {
    const vttPath = subtitlesFile.replace(/srt$/, "vtt");
    var srtData = fs.readFileSync(subtitlesFile);
    srt2vtt(srtData, function(err, vttData) {
      if (err) {
        reject(err);
      }
      fs.writeFileSync(vttPath, vttData);
      resolve(vttPath);
    });
  });

export const getSubsForMovie = async (movieFilePath, movieDirectoryPath) => {
  try {
    const subsResult = await searchForSubs(movieFilePath);
    if (!subsResult) {
      return "";
    }
    const subtitlesFile = await downloadSubs(subsResult, movieDirectoryPath);
    if (!subtitlesFile) {
      return "";
    }
    return await convertSubs(subtitlesFile);
  } catch (e) {
    console.log(e);
    return "";
  }
};
