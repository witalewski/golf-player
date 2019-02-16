import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import axios from "axios";
import { MainConnected } from "./components/Main";
import { receiveDetails } from "./state/actions/libraryActions";
import { reducers } from "./state/reducers";
import { getMovieDirs } from "./utils/directoryScanner";
import { parseDirectoryName } from "./utils/directoryNameParser";
import { getMovieFromDbData } from "./utils/movieDataConverter";
import { API_URL, API_KEY } from "global/constants";

const store = window.hasOwnProperty("__REDUX_DEVTOOLS_EXTENSION__")
  ? createStore(reducers, window["__REDUX_DEVTOOLS_EXTENSION__"]())
  : createStore(reducers);

getMovieDirs().then(directories => {
  console.log(directories);
  directories.forEach(directory => {
    const { title, year } = parseDirectoryName(directory.directoryName);
    axios
      .post(
        API_URL,
        JSON.stringify({
          title: title.replace(/[^a-zA-Z0-9\s]/g, ""),
          year
        }),
        {
          headers: {
            "X-Api-Key": API_KEY,
            "Content-Type": "application/json"
          }
        }
      )
      .then(({ data: { omdb, theMovieDb } }) => {
        const movie = {
          ...getMovieFromDbData(omdb, theMovieDb),
          ...directory
        };
        if (movie.title) {
          store.dispatch(receiveDetails(movie));
        } else {
          console.log("Couldn't find match for", title);
        }
      })
      .catch(console.log);
  });
});

ReactDOM.render(
  <Provider store={store}>
    <MainConnected />
  </Provider>,
  document.getElementById("root")
);
