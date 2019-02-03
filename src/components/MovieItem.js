import React, { Component } from "react";
import styled from "@emotion/styled";
import { parseDirectoryName } from "../utils/directoryNameParser";
import axios from "axios";
import { MovieDetails } from "./MovieDetails";

const MovieItemStyled = styled.li`
  display: block;
  flex-basis: 30rem;
  height: 43rem;
  align-items: stretch;
  margin: 3rem;
  font-size: 16px;
  background-color: #333;
  background-size: cover;
  background-position: center;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
  transform: scale(1);
  transition: 0.2s;

  .movieDetails {
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  &:hover {
    transform: scale(1.1);
    transition: 0.2s;

    .movieDetails {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: stretch;
      background-size: cover;
      background-position: center;
      background-blend-mode: multiply;
      background-color: #333;
    }
  }

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

export class MovieItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {
        title: "",
        director: "",
        country: "",
        year: NaN,
        poster: "",
        backdrop: "",
        runtime: "",
        plot: "",
        movieNotFound: false
      }
    };
  }
  componentDidMount() {
    this.downloadData();
  }

  downloadData = () => {
    const { title, year } = parseDirectoryName(this.props.directoryName);
    this.setState({ title, year });
    axios
      .post(
        "https://qw6c0mxwz9.execute-api.eu-west-1.amazonaws.com/default/lightswitch",
        JSON.stringify({
          title: title.replace(/[^a-zA-Z0-9\s]/g, ""),
          year
        }),
        {
          headers: {
            "X-Api-Key": "S0a5WCywb68N075YgoTVK3TidPB11bus2vplyW9s",
            "Content-Type": "application/json"
          }
        }
      )
      .then(({ data: { omdb, theMovieDb } }) => {
        if (theMovieDb.details.status_code === 25) {
          setTimeout(this.downloadData, 1000);
        } else {
          this.setState({
            movie: {
              title: omdb.Title || theMovieDb.details.title,
              runtime: parseInt(omdb.Runtime || theMovieDb.details.runtime),
              director: omdb.Director,
              country:
                omdb.Country ||
                theMovieDb.details.production_countries
                  .map(country => country.name)
                  .join(", "),
              year: parseInt(omdb.Year || theMovieDb.details.release_date),
              plot: omdb.Plot || theMovieDb.details.overview,
              poster: omdb.Poster || theMovieDb.details.poster_path,
              backdrop:
                theMovieDb.details.backdrop_path ||
                omdb.Poster ||
                theMovieDb.details.poster_path
            }
          });
        }
      });
  };

  render() {
    const { movie } = this.state;
    return (
      <MovieItemStyled style={{ backgroundImage: `url(${movie.poster})` }}>
        <MovieDetails onClick={this.props.onClick} movie={movie} />
      </MovieItemStyled>
    );
  }
}
