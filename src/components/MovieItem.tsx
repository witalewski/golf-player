import React from "react";
import { MovieDetails } from "./MovieDetails";
import { MovieItemStyled } from "./MovieItemStyled";

export const MovieItem = ({ movie, onClick }) => (
  <MovieItemStyled style={{ backgroundImage: `url(${movie.poster})` }}>
    <MovieDetails onClick={onClick} movie={movie} />
  </MovieItemStyled>
);
