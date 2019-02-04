import React, { Component } from "react";
import axios from "axios";
import { parseDirectoryName } from "../utils/directoryNameParser";
import { getMovieFromDbData } from "../utils/movieDataConverter";
import { MovieDetails } from "./MovieDetails";
import { MovieItemStyled } from "./MovieItemStyled";

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
        this.setState({
          movie: getMovieFromDbData(omdb, theMovieDb)
        });
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
