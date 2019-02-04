import React from "react";
import { connect } from "react-redux";
import { MovieListConnected } from "./MovieList";
import { MoviePlayerConnected } from "./MoviePlayer";

export const Main = ({ moviePlayerIsOpen }) => {
  return moviePlayerIsOpen ? <MoviePlayerConnected /> : <MovieListConnected />;
};

const mapStateToProps = state => ({
  moviePlayerIsOpen: state.moviePlayer.isOpen
});

export const MainConnected = connect(mapStateToProps)(Main);
