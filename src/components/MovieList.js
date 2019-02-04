import React from "react";
import styled from "@emotion/styled";
import { connect } from "react-redux";
import { MovieItem } from "./MovieItem";
import { playMovie } from "../state/actions/moviePlayerActions";

const MovieListStyled = styled.ul`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: rgb(20, 20, 20);
`;

export const MovieList = ({ movies, playMovie, receiveDetails }) => (
  <MovieListStyled>
    {movies.map(movie => (
      <MovieItem
        key={movie.directoryName}
        movie={movie}
        directoryName={movie.directoryName}
        onClick={() => playMovie(directoryName)}
      />
    ))}
  </MovieListStyled>
);

const mapStateToProps = state => ({
  movies: state.movies.movies
});

const mapDispatchToProps = dispatch => ({
  playMovie: movie => dispatch(playMovie(movie)),
});

export const MovieListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);
