import React from "react";
import { connect } from "react-redux";
import { LibraryStyled } from "./LibraryStyled";
import { Header } from "./Header";
import { playMovie } from "../state/actions/playerActions";
import { playTrailer, hideTrailer } from "../state/actions/libraryActions";
import { MovieList } from "./MovieList";
import { MovieCollection, Movie } from "global";
import { List } from "immutable";
import { sortMovies } from "../utils/movieSorter";
import { SortOrder } from "../../lib/global/constants";

const getCategories = movies => {
  const allGenres = Array.from(movies).reduce((acc, el: Movie) => {
    const newAcc = Object.assign({}, acc);
    el.genres.forEach(genre => {
      if (newAcc[genre]) {
        newAcc[genre] = newAcc[genre] + 1;
      } else {
        newAcc[genre] = 1;
      }
    });
    return newAcc;
  }, {});
  const avgCount =
    Object.values(allGenres).reduce((acc, el) => acc + el, 0) /
    Object.values(allGenres).length;
  [
    ["Action", "Adventure"],
    ["Comedy", "Family"],
    ["Comedy", "Music"],
    ["Crime", "Mystery"],
    ["Documentary", "Animation"],
    ["Drama", "Romance"],
    ["History", "War"],
    ["Action", "Thriller"],
    ["History", "Romance"],
    ["Science Fiction", "Fantasy"],
    ["Horror", "Fantasy"],
    ["Thriller", "Horror"]
  ].forEach(([a, b]) => {
    if (
      allGenres[a] &&
      allGenres[b] &&
      Math.min(allGenres[a], allGenres[b]) < avgCount
    ) {
      allGenres[`${a} & ${b}`] = allGenres[a] + allGenres[b];
      delete allGenres[a];
      delete allGenres[b];
    }
  });

  const selectedGenres = Object.entries(allGenres)
    .sort((a, b) => b[1] - a[1])
    .filter(el => el[1] >= avgCount);

  return selectedGenres.map(([category]) => ({
    label: category,
    movies: sortMovies(
      List(
        Array.from(movies).filter((movie: Movie) =>
          movie.genres.some(genre => category.includes(genre))
        )
      ),
      SortOrder.RecentlyAdded
    )
  }));
};

export const Library = ({
  movieCollections,
  trailer,
  playMovie,
  playTrailer,
  hideTrailer,
  movies
}) => (
  <LibraryStyled>
    <Header />
    {[...getCategories(movies), ...movieCollections].map(
      (collection: MovieCollection) => (
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
  trailer: state.library.trailer,
  movies: state.library.movies
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
