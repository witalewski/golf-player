import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import os from "os";
import axios from "axios";
import { MainConnected } from "./components/Main";
import { receiveDirectories } from "./state/actions/movieActions";
import { receiveDetails } from "./state/actions/movieActions";
import { reducers } from "./state/reducers";
import { getMovieDirs, getMovieFile } from "./utils/directoryScanner";
import { parseDirectoryName } from "./utils/directoryNameParser";
import { getMovieFromDbData } from "./utils/movieDataConverter";

const store = createStore(reducers);

getMovieDirs().then(directories => {
  directories.forEach(({ directoryName, directoryPath }) => {
    const { title, year } = parseDirectoryName(directoryName);
    // this.setState({ title, year });
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
        const movie = {
          ...getMovieFromDbData(omdb, theMovieDb),
          ...getMovieFile(`${os.homedir()}/Movies/${directoryName}`),
          directoryName,
          directoryPath
        };
        store.dispatch(receiveDetails(movie));
      });
  });
});

ReactDOM.render(
  <Provider store={store}>
    <MainConnected />
  </Provider>,
  document.getElementById("root")
);
