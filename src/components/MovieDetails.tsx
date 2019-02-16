import React from "react";
import { MovieDetailsStyled } from "./MovieDetailsStyled";
import { formatRuntime } from "../utils/runtimeFormatter";

export const MovieDetails = ({ movie, playMovie, playTrailer }) => {
  return (
    <MovieDetailsStyled
      className="movieDetails"
      style={{ backgroundImage: `url(${movie.backdrop})` }}
    >
      <h2 className="title">{movie.title}</h2>
      {!Number.isNaN(movie.runtime) && movie.runtime && (
        <span className="runtime">{formatRuntime(movie.runtime)}</span>
      )}
      <span className="info">
        {movie.director && `${movie.director}, `}
        {movie.country} {movie.year ? movie.year : ""}
      </span>
      <span className="plot">{movie.plot}</span>
      <span className="buttons">
        {movie.trailer && (
          <button onClick={playTrailer}>
            <i className="fas fa-video" /> Trailer
          </button>
        )}
        <button onClick={playMovie}>
          <i className="fas fa-play" /> Watch
        </button>
      </span>
    </MovieDetailsStyled>
  );
};
