import { List } from "immutable";

const yearPatternsGenerator = () => {
  const values = [
    /[\(\[](\d\d\d\d)[\)\]]/g,
    /(\d\d\d\d)$/g,
    /(\d\d\d\d),/g,
    /\d\d\d\d/g
  ];
  let index = 0;
  const hasNext = () => index < values.length;
  const next = () => values[index++];
  return {
    hasNext,
    next
  };
};

const isPossibleMovieReleaseYear = number =>
  number >= 1887 && number <= new Date().getFullYear() + 5;

const testYearPattern = (name, pattern) =>
  List(name.match(pattern))
    .map(s => parseInt(s))
    .sort((a, b) => a < b)
    .find(isPossibleMovieReleaseYear);

const findYear = name => {
  let year = null;
  const yearPatterns = yearPatternsGenerator();
  while (!year && yearPatterns.hasNext()) {
    year = testYearPattern(name, yearPatterns.next());
  }
  return year;
};

const findTitle = (name, year) =>
  name
    .replace(/[\[\(-].*[\]\)-]/g, "")
    .replace(RegExp(`${year}(?!.*${year})`), "")
    .replace(/^\W+/, "")
    .replace(/\W+$/, "");

export const parseDirectoryName = name => {
  const year = findYear(name);
  return {
    year,
    title: findTitle(name, year)
  };
};
