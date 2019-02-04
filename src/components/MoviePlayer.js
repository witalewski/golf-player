import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import os from "os";
import fs from "fs";
// const { exec } from "child_process");
import { handleKey } from "../utils/videoKeyboardControls";
import { getSubsForMovie } from "../utils/subtitles";
import { getMovieFilePath } from "../utils/directoryScanner";
import { MoviePlayerStyled } from "./MoviePlayerStyled";
import { MoviePlayerControls } from "./MoviePlayerControls";
import { exitPlayer } from "../state/actions/moviePlayerActions";

export class MoviePlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieFilePath: "",
      subtitlesFiles: [],
      notification: "",
      displayControls: false
    };
    this.videoRef = createRef();
  }

  notificationTimeout = 0;
  controlsTimeout = 0;

  componentDidMount() {
    this.showControls();

    const movieFilePath = getMovieFilePath(
      `${os.homedir()}/Movies/${this.props.movie.directoryName}`
    );
    this.setState({
      movieFilePath
    });

    getSubsForMovie(movieFilePath, this.props.movie.directoryName).then(results =>
      this.setState({
        subtitlesFiles: results
      })
    );

    window.addEventListener("keydown", this.onKeyDown);
    window.addEventListener("mousemove", this.onMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onKeyDown);
    window.removeEventListener("mousemove", this.onMouseMove);
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

  showControls = () => {
    if (this.controlsTimeout > 0) {
      clearTimeout(this.controlsTimeout);
    }
    this.setState({ displayControls: true });
    this.controlsTimeout = setTimeout(
      () => this.setState({ displayControls: false }),
      3000
    );
  };

  onKeyDown = event => {
    handleKey(event.code, this.videoRef.current, this.showNotification);
  };

  onMouseMove = event => {
    this.showControls();
  };

  render() {
    const {
      movieFilePath,
      subtitlesFiles,
      notification,
      displayControls
    } = this.state;
    const { movie, exitPlayer } = this.props;
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
        {displayControls && (
          <MoviePlayerControls
            movieFilePath={movieFilePath}
            exitPlayer={() => exitPlayer()}
          />
        )}
      </MoviePlayerStyled>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.moviePlayer.movie
});

const mapDispatchToProps = dispatch => ({
  exitPlayer: () => dispatch(exitPlayer())
});

export const MoviePlayerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePlayer);
