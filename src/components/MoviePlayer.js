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
    this.state = { movieFilePath: "", subtitlesFilePath: "", notification: "" };
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

    getSubsForMovie(movieFilePath, this.props.movie).then(vttPath =>
      this.setState({
        subtitlesFilePath: vttPath
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
    const { movieFilePath, subtitlesFilePath, notification } = this.state;
    return (
      <MoviePlayerStyled>
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
