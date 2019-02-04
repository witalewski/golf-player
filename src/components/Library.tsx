import React from "react";
import { connect } from "react-redux";
import { LibraryStyled } from "./LibraryStyled";
import { playMovie } from "../state/actions/moviePlayerActions";
import { MovieList } from "./MovieList";

export const Library = ({ movies, playMovie }) => (
  <LibraryStyled>
    <h1 className="appTitle">🏌🏿‍ Golf Player</h1>
    <MovieList movies={movies} playMovie={playMovie} />
  </LibraryStyled>
);

const mapStateToProps = state => ({
  movies: state.movies.movies
});

const mapDispatchToProps = {
  playMovie
};

export const LibraryConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
