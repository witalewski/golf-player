const { getMovieDirs } = require("./utils/directoryScanner");
const { MovieList } = require("./components/MovieList");

getMovieDirs().then(dirs => {
  ReactDOM.render(
    React.createElement(MovieList, { directoryNames: dirs }, null),
    document.getElementById("root")
  );
});
