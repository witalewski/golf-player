import React from "react";
import { connect } from "react-redux";
import { MovieListStyled } from "./MovieListStyled";
import { MovieItem } from "./MovieItem";
import { playMovie } from "../state/actions/playerActions";

export const MovieList = ({ movies, playMovie, playTrailer }) => (
  <MovieListStyled>
    {movies.map(movie => (
      <MovieItem
        key={movie.directoryName}
        movie={movie}
        playMovie={() => playMovie(movie)}
        playTrailer={() => playTrailer(movie.trailer)}
      />
    ))}
  </MovieListStyled>
);

const mapStateToProps = state => ({
  movies: state.movies.movies
});

const mapDispatchToProps = {
  playMovie
};

export const MovieListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);
