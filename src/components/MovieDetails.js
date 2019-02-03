import React from "react";

export const MovieDetails = ({ movie, onClick }) => {
  return (
    <div
      className="movieDetails"
      style={{ backgroundImage: `url(${movie.backdrop})` }}
      onClick={onClick}
    >
      <h2 className="title">{movie.title}</h2>
      <span className="runtime">{movie.runtime}</span>
      <span className="info">
        {movie.director && `${movie.director}, `}
        {movie.country} {movie.year}
      </span>
      <span className="plot">{movie.plot}</span>
    </div>
  );
};
