import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { handleKey } from "../utils/videoKeyboardControls";
import { getSubsForMovie } from "../utils/subtitles";
import { MoviePlayerStyled } from "./MoviePlayerStyled";
import { MoviePlayerControls } from "./MoviePlayerControls";
import { exitPlayer } from "../state/actions/playerActions";

export class MoviePlayer extends Component<
  {
    movie: Movie;
    exitPlayer: () => void;
  },
  {
    subtitlesFiles: Subtitles[];
    notification: string;
    displayControls: boolean;
  }
> {
  state = {
    subtitlesFiles: [],
    notification: "",
    displayControls: false
  };

  videoRef: React.RefObject<HTMLVideoElement> = createRef();
  notificationTimeout = 0;
  controlsTimeout = 0;

  componentDidMount() {
    this.showControls();

    getSubsForMovie(this.props.movie).then(results =>
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
    this.notificationTimeout = window.setTimeout(
      () => this.setState({ notification: "" }),
      2000
    );
  };

  showControls = () => {
    if (this.controlsTimeout > 0) {
      clearTimeout(this.controlsTimeout);
    }
    this.setState({ displayControls: true });
    this.controlsTimeout = window.setTimeout(
      () => this.setState({ displayControls: false }),
      3000
    );
  };

  onKeyDown = event => {
    handleKey(event, this.videoRef.current, this.showNotification);
  };

  onMouseMove = event => {
    this.showControls();
  };

  render() {
    const { subtitlesFiles, notification, displayControls } = this.state;
    const { movie, exitPlayer } = this.props;
    return (
      <MoviePlayerStyled>
        <video className="moviePlayer" ref={this.videoRef} controls autoPlay>
          <source src={`file:///${movie.filePath}`} />
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
        {notification && (
          <aside className="notificationArea">{notification}</aside>
        )}
        {displayControls && (
          <MoviePlayerControls
            movieFilePath={movie.filePath}
            exitPlayer={() => exitPlayer()}
          />
        )}
      </MoviePlayerStyled>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.player.movie
});

const mapDispatchToProps = {
  exitPlayer
};

export const MoviePlayerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MoviePlayer);
