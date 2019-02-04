import React from "react";
import { connect } from "react-redux";
import { LibraryConnected } from "./Library";
import { MoviePlayerConnected } from "./MoviePlayer";

export const Main = ({ moviePlayerIsOpen }) => {
  return moviePlayerIsOpen ? <MoviePlayerConnected /> : <LibraryConnected />;
};

const mapStateToProps = state => ({
  moviePlayerIsOpen: state.player.isOpen
});

export const MainConnected = connect(mapStateToProps)(Main);
