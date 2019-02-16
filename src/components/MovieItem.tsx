import React from "react";
import { MovieDetails } from "./MovieDetails";
import { MovieItemStyled } from "./MovieItemStyled";

export const MovieItem = ({ movie, playMovie, playTrailer }) => (
  <MovieItemStyled style={{ backgroundImage: `url(${movie.poster})` }}>
    <MovieDetails
      playMovie={playMovie}
      playTrailer={playTrailer}
      movie={movie}
    />
  </MovieItemStyled>
);
