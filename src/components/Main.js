import React from "react";
import { connect } from "react-redux";
import { MovieListConnected } from "./MovieList";
import { MoviePlayer } from "./MoviePlayer";

export const Main = ({ moviePlayer }) => {
  return moviePlayer.isOpen ? (
    <MoviePlayer movie={moviePlayer.movie} />
  ) : (
    <MovieListConnected />
  );
};

const mapStateToProps = state => ({
  moviePlayer: state.moviePlayer
});

export const MainConnected = connect(mapStateToProps)(Main);
