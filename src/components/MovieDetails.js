import React from "react";
import styled from "@emotion/styled";
import { formatRuntime } from "../utils/runtimeFormatter";

const MovieDetailsStyled = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .title {
    margin: 1rem 1rem;
    font-size: 24px;
  }

  .runtime,
  .info {
    margin: 1rem 1rem;
    font-size: 16px;
  }

  .plot {
    margin: 1rem 1rem;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const MovieDetails = ({ movie, onClick }) => {
  return (
    <MovieDetailsStyled
      className="movieDetails"
      style={{ backgroundImage: `url(${movie.backdrop})` }}
      onClick={onClick}
    >
      <h2 className="title">{movie.title}</h2>
      <span className="runtime">{formatRuntime(movie.runtime)}</span>
      <span className="info">
        {movie.director && `${movie.director}, `}
        {movie.country} {movie.year}
      </span>
      <span className="plot">{movie.plot}</span>
    </MovieDetailsStyled>
  );
};
