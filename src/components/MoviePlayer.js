import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import os from "os";
import fs from "fs";
// const { exec } from "child_process");
import { List } from "immutable";
import { handleKey } from "../utils/videoKeyboardControls";
import {getSubsForMovie} from "../utils/subtitles"

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
