import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { MainConnected } from "./components/Main";
import { reducers } from "./state/reducers";
import { searchForMovies } from "./utils/directoryScanner";
import { DEFAULT_DEPTH_LIMIT } from "./global/constants";

const store = window.hasOwnProperty("__REDUX_DEVTOOLS_EXTENSION__")
  ? createStore(reducers, window["__REDUX_DEVTOOLS_EXTENSION__"]())
  : createStore(reducers);

searchForMovies(DEFAULT_DEPTH_LIMIT, store.dispatch);

ReactDOM.render(
  <Provider store={store}>
    <MainConnected />
  </Provider>,
  document.getElementById("root")
);
