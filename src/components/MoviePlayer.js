import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import os from "os";
import fs from "fs";
// const { exec } from "child_process");
import { handleKey } from "../utils/videoKeyboardControls";
import { getSubsForMovie } from "../utils/subtitles";
import { getMovieFilePath } from "../utils/directoryScanner";
import { MoviePlayerStyled } from "./MoviePlayerStyled";

export class MoviePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = { movieFilePath: "", subtitlesFiles: [], notification: "" };
    this.videoRef = createRef();
  }

  notificationTimeout = 0;

  componentDidMount() {
    const movieFilePath = getMovieFilePath(
      `${os.homedir()}/Movies/${this.props.movie}`
    );
    this.setState({
      movieFilePath
    });

    getSubsForMovie(movieFilePath, this.props.movie).then(results =>
      this.setState({
        subtitlesFiles: results
      })
    );

    window.addEventListener("keydown", this.onKeyDown);
  }

  showNotification = notification => {
    if (this.notificationTimeout > 0) {
      clearTimeout(this.notificationTimeout);
    }
    this.setState({ notification });
    this.notificationTimeout = setTimeout(
      () => this.setState({ notification: "" }),
      2000
    );
  };

  onKeyDown = event => {
    handleKey(event.code, this.videoRef.current, this.showNotification);
  };

  render() {
    const { movieFilePath, subtitlesFiles, notification } = this.state;
    return (
      <MoviePlayerStyled>
        <video className="moviePlayer" ref={this.videoRef} controls autoPlay>
          <source src={`file:///${movieFilePath}`} />
          {subtitlesFiles.map((subtitles, i) => {
            const subtitlesPathElements = subtitles.vttPath.split("/");
            return (
              <track
                key={subtitles.vttPath}
                src={subtitles.vttPath}
                kind="subtitles"
                label={`${subtitles.language} (${
                  subtitlesPathElements[subtitlesPathElements.length - 1]
                })`}
                default={i === 0}
              />
            );
          })}
          )}
        </video>
        <aside className="notificationArea">{notification}</aside>
      </MoviePlayerStyled>
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
