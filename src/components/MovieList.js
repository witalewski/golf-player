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

export const MovieList = ({ directoryNames, playMovie }) => (
  <MovieListStyled>
    {directoryNames.map(directoryName => (
      <MovieItem
        key={directoryName}
        directoryName={directoryName}
        onClick={() => playMovie(directoryName)}
      />
    ))}
  </MovieListStyled>
);

const mapStateToProps = state => ({
  directoryNames: state.movies.directories
});

const mapDispatchToProps = dispatch => ({
  playMovie: movie => dispatch(playMovie(movie))
});

export const MovieListConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList);
