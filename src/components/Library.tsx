import React from "react";
import { connect } from "react-redux";
import { LibraryStyled } from "./LibraryStyled";
import { Header } from "./Header";
import { playMovie } from "../state/actions/playerActions";
import { sort } from "../state/actions/libraryActions";
import { MovieList } from "./MovieList";

export const Library = ({ movies, playMovie, sort }) => (
  <LibraryStyled>
    <Header sort={sort} />
    <MovieList movies={movies} playMovie={playMovie} />
  </LibraryStyled>
);

const mapStateToProps = state => ({
  movies: state.library.movies
});

const mapDispatchToProps = {
  playMovie,
  sort
};

export const LibraryConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
