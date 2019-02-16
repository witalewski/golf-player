import React from "react";
import { connect } from "react-redux";
import { LibraryStyled } from "./LibraryStyled";
import { Header } from "./Header";
import { playMovie } from "../state/actions/playerActions";
import { playTrailer, hideTrailer } from "../state/actions/libraryActions";
import { MovieList } from "./MovieList";
import { GENRE_DISPLAY_LOWER_TRESHOLD } from "../global/constants";

export const Library = ({
  trailer,
  allMoviesAlphabetically,
  recentlyAdded,
  newReleases,
  topRates,
  actionAndAdventure,
  comedyAndFamily,
  crimeAndMystery,
  documetaryAndAnimation,
  dramaAndRomance,
  historyAndWar,
  music,
  scienceFictionHorrorAndFantasy,
  thriller,
  playMovie,
  playTrailer,
  hideTrailer
}) => (
  <LibraryStyled>
    <Header />
    <section>
      <h2>Recently Added</h2>
    </section>
    <MovieList
      movies={recentlyAdded}
      playMovie={playMovie}
      playTrailer={playTrailer}
    />
    {actionAndAdventure.size > GENRE_DISPLAY_LOWER_TRESHOLD && (
      <section>
        <h2>Action & Adventure</h2>
        <MovieList
          movies={actionAndAdventure}
          playMovie={playMovie}
          playTrailer={playTrailer}
        />
      </section>
    )}
    {comedyAndFamily.size > GENRE_DISPLAY_LOWER_TRESHOLD && (
      <section>
        <h2>Comedy & Family</h2>
        <MovieList
          movies={comedyAndFamily}
          playMovie={playMovie}
          playTrailer={playTrailer}
        />
      </section>
    )}
    {crimeAndMystery.size > GENRE_DISPLAY_LOWER_TRESHOLD && (
      <section>
        <h2>Crime & Mystery</h2>
        <MovieList
          movies={crimeAndMystery}
          playMovie={playMovie}
          playTrailer={playTrailer}
        />
      </section>
    )}
    {documetaryAndAnimation.size > GENRE_DISPLAY_LOWER_TRESHOLD && (
      <section>
        <h2>Documentary & Animation</h2>
        <MovieList
          movies={documetaryAndAnimation}
          playMovie={playMovie}
          playTrailer={playTrailer}
        />
      </section>
    )}
    {dramaAndRomance.size > GENRE_DISPLAY_LOWER_TRESHOLD && (
      <section>
        <h2>Drama & Romance</h2>
        <MovieList
          movies={dramaAndRomance}
          playMovie={playMovie}
          playTrailer={playTrailer}
        />
      </section>
    )}
    {historyAndWar.size > GENRE_DISPLAY_LOWER_TRESHOLD && (
      <section>
        <h2>History & War</h2>
        <MovieList
          movies={historyAndWar}
          playMovie={playMovie}
          playTrailer={playTrailer}
        />
      </section>
    )}
    {music.size > GENRE_DISPLAY_LOWER_TRESHOLD && (
      <section>
        <h2>Music</h2>
        <MovieList
          movies={music}
          playMovie={playMovie}
          playTrailer={playTrailer}
        />
      </section>
    )}
    {scienceFictionHorrorAndFantasy.size > GENRE_DISPLAY_LOWER_TRESHOLD && (
      <section>
        <h2>Science Fiction, Horror & Fantasy</h2>
        <MovieList
          movies={scienceFictionHorrorAndFantasy}
          playMovie={playMovie}
          playTrailer={playTrailer}
        />
      </section>
    )}
    {thriller.size > GENRE_DISPLAY_LOWER_TRESHOLD && (
      <section>
        <h2>Thriller</h2>
        <MovieList
          movies={thriller}
          playMovie={playMovie}
          playTrailer={playTrailer}
        />
      </section>
    )}
    <section>
      <h2>New Releases</h2>
      <MovieList
        movies={newReleases}
        playMovie={playMovie}
        playTrailer={playTrailer}
      />
    </section>
    <section>
      <h2>Top Rated</h2>
      <MovieList
        movies={topRates}
        playMovie={playMovie}
        playTrailer={playTrailer}
      />
    </section>
    <section>
      <h2>All movies</h2>
      <MovieList
        movies={allMoviesAlphabetically}
        playMovie={playMovie}
        playTrailer={playTrailer}
      />
    </section>
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
  trailer: state.library.trailer,
  allMoviesAlphabetically: state.library.allMoviesAlphabetically,
  recentlyAdded: state.library.recentlyAdded,
  newReleases: state.library.newReleases,
  topRates: state.library.topRates,
  actionAndAdventure: state.library.actionAndAdventure,
  comedyAndFamily: state.library.comedyAndFamily,
  crimeAndMystery: state.library.crimeAndMystery,
  documetaryAndAnimation: state.library.documetaryAndAnimation,
  dramaAndRomance: state.library.dramaAndRomance,
  historyAndWar: state.library.historyAndWar,
  music: state.library.music,
  scienceFictionHorrorAndFantasy: state.library.scienceFictionHorrorAndFantasy,
  thriller: state.library.thriller
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
