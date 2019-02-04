import { List } from "immutable";

interface IYearPatternsGenerator {
  hasNext: () => boolean;
  next: () => RegExp;
}

const yearPatternsGenerator = (): IYearPatternsGenerator => {
  const values: RegExp[] = [
    /[\(\[](\d\d\d\d)[\)\]]/g,
    /(\d\d\d\d)$/g,
    /(\d\d\d\d),/g,
    /\d\d\d\d/g
  ];
  let index: number = 0;
  const hasNext = () => index < values.length;
  const next = () => values[index++];
  return {
    hasNext,
    next
  };
};

const isPossibleMovieReleaseYear = (n: number): boolean =>
  n >= 1887 && n <= new Date().getFullYear() + 5;

const testYearPattern = (name: string, pattern: RegExp): number =>
  List(name.match(pattern))
    .map((s: string) => parseInt(s))
    .sort((a: number, b: number): number => b - a)
    .find(isPossibleMovieReleaseYear);

const findYear = (name: string): number => {
  let year: number = 0;
  const yearPatterns: IYearPatternsGenerator = yearPatternsGenerator();
  while (year === 0 && yearPatterns.hasNext()) {
    year = testYearPattern(name, yearPatterns.next());
  }
  return year;
};

const findTitle = (name: string, year: number): string =>
  name
    .replace(/[\[\(-].*[\]\)-]/g, "")
    .replace(RegExp(`${year}(?!.*${year})`), "")
    .replace(/^\W+/, "")
    .replace(/\W+$/, "");

export const parseDirectoryName = (
  name: string
): {
  year: number;
  title: string;
} => {
  const year: number = findYear(name);
  return {
    year,
    title: findTitle(name, year)
  };
};
