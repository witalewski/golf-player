import React from "react";
import { connect } from "react-redux";
import { MovieListStyled } from "./MovieListStyled";
import { MovieItem } from "./MovieItem";
import { playMovie } from "../state/actions/moviePlayerActions";

export const MovieList = ({ movies, playMovie }) => (
  <MovieListStyled>
    {movies.map(movie => (
      <MovieItem
        key={movie.directoryName}
        movie={movie}
        directoryName={movie.directoryName}
        onClick={() => playMovie(movie)}
      />
    ))}
  </MovieListStyled>
);

const mapStateToProps = state => ({
  movies: state.movies.movies
});

const mapDispatchToProps = dispatch => ({
  playMovie: movie => dispatch(playMovie(movie))
});

export const MovieListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);
