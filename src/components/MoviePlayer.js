import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import os from "os";
import fs from "fs";
import srt2vtt from "srt2vtt";
// const { exec } from "child_process");
import gunzip from "gunzip-file";
import { List } from "immutable";
import opensubtitles from "subtitler";
import { handleKey } from "../utils/videoKeyboardControls";

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

const getSubsForMovie = async (movieFilePath, movieDirectoryPath) => {
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

export class MoviePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = { movieFilePath: "", subtitlesFilePath: "" };
    this.videoRef = createRef();
  }
  componentDidMount() {
    const movieFilePath = getMovieFilePath(
      `${os.homedir()}/Movies/${this.props.movie}`
    );
    this.setState({
      movieFilePath
    });

    getSubsForMovie(movieFilePath, this.props.movie).then(vttPath =>
      this.setState({
        subtitlesFilePath: vttPath
      })
    );

    window.addEventListener("keydown", this.onKeyDown);
  }

  onKeyDown = event => {
    handleKey(event.code, this.videoRef.current);
  };

  render() {
    const { movieFilePath, subtitlesFilePath } = this.state;
    return (
      <div>
        <video className="moviePlayer" ref={this.videoRef} controls autoPlay>
          <source src={`file:///${movieFilePath}`} />
          {subtitlesFilePath && (
            <track
              src={subtitlesFilePath}
              kind="subtitles"
              label="English"
              srclang="en"
              default
            />
          )}
        </video>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.moviePlayer.movie
});

const mapDispatchToProps = {};

export const MoviePlayerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePlayer);
