import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import os from "os";
import fs from "fs";
// const { exec } from "child_process");
import { handleKey } from "../utils/videoKeyboardControls";
import { getSubsForMovie } from "../utils/subtitles";
import { getMovieFilePath } from "../utils/directoryScanner";

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
