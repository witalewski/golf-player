import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { getMovieDirs } from "./utils/directoryScanner";
import { reducers } from "./state/reducers";
import { receiveDirectories } from "./state/actions/movieActions";
import { MainConnected } from "./components/Main";

const store = createStore(reducers);

getMovieDirs().then(directories => {
  store.dispatch(receiveDirectories(directories));
  directories.forEach(directoryName => {
    console.log(directoryName);
  });
});

ReactDOM.render(
  <Provider store={store}>
    <MainConnected />
  </Provider>,
  document.getElementById("root")
);
