import React from "react";
import { connect } from "react-redux";
import { LibraryStyled } from "./LibraryStyled";
import { Header } from "./Header";
import { playMovie } from "../state/actions/playerActions";
import { playTrailer, hideTrailer } from "../state/actions/libraryActions";
import { MovieList } from "./MovieList";
import { GENRE_DISPLAY_LOWER_TRESHOLD } from "../global/constants";
import { MovieCollection } from "global";

export const Library = ({
  movieCollections,
  trailer,
  playMovie,
  playTrailer,
  hideTrailer
}) => (
  <LibraryStyled>
    <Header />
    {movieCollections.map(
      (collection: MovieCollection) =>
        collection.movies.size > collection.displayTreshold && (
          <section>
            <h2>{collection.label}</h2>
            <MovieList
              movies={collection.movies}
              playMovie={playMovie}
              playTrailer={playTrailer}
            />
          </section>
        )
    )}
    {trailer && (
      <div className="trailerModal" onClick={() => hideTrailer()}>
        <iframe
          className="trailerEmbed"
          src={`https://www.youtube.com/embed/${trailer}`}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          frameBorder="0"
        />
      </div>
    )}
  </LibraryStyled>
);

const mapStateToProps = state => ({
  movieCollections: state.library.movieCollections,
  trailer: state.library.trailer
});

const mapDispatchToProps = {
  playMovie,
  playTrailer,
  hideTrailer
};

export const LibraryConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Library);
