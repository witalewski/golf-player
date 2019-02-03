const os = require("os");
const fs = require("fs");
const srt2vtt = require("srt2vtt");
// const { exec } = require("child_process");
const gunzip = require("gunzip-file");
const { List } = require("immutable");
var opensubtitles = require("subtitler");

const openInExternalPlayer = moviePath =>
  exec(`vlc "${moviePath}"`, (err, stdout, stderr) => {
    console.log(err, stderr, stdout);
  });

const getMovieFilePath = dirpath => {
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

const searchForSubs = (movieFilePath, language = "English") =>
  new Promise((resolve, reject) => {
    opensubtitles.api.login().then(function(token) {
      opensubtitles.api
        .searchForFile(token, "English", movieFilePath)
        .then(function(results) {
          const englishsubs = results.find(
            item => item.LanguageName === "English"
          );
          resolve(englishsubs);
        });
    });
  });

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

const playMovie = dirname => {
  const dirpath = `${os.homedir()}/Movies/${dirname}`;
  const movieFilePath = getMovieFilePath(dirpath);
  if (movieFilePath) {
    console.log(`Playing ${movieFilePath}`);
    const videoEl = document.createElement("video");
    videoEl.className = "player";
    videoEl.controls = true;
    const sourceEl = document.createElement("source");
    sourceEl.src = `file:///${movieFilePath}`;
    searchForSubs(movieFilePath).then(subsResult =>
      downloadSubs(subsResult, dirname).then(subtitlesFile => {
        convertSubs(subtitlesFile).then(vttPath => {
          const trackEl = document.createElement("track");
          trackEl.label = "English";
          trackEl.kind = "subtitles";
          trackEl.srclang = "en";
          trackEl.default = "true";
          trackEl.src = vttPath;
          videoEl.appendChild(sourceEl);
          videoEl.appendChild(trackEl);
          document.getElementById("main").appendChild(videoEl);
        });
      })
    );
  }
};

module.exports = { playMovie };
