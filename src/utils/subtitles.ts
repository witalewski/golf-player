import fs from "fs";
import opensubtitles from "subtitler";
import gunzip from "gunzip-file";
import srt2vtt from "srt2vtt";
import ass2vtt from "ass-to-vtt";
import { logger } from "./logger";
import { Movie, Subtitles } from "global";

interface ISubsSearchResult {
  LanguageName: string;
  SubDownloadLink: string;
  SubFileName: string;
}

interface ISubsDownloadResult {
  file: string;
  language: string;
}

const searchForSubs = async (
  movieFilePath: string,
  language: string = ""
): Promise<ISubsSearchResult[]> => {
  const token = await opensubtitles.api.login();
  const results = await opensubtitles.api.searchForFile(
    token,
    language,
    movieFilePath
  );
  return results.filter(
    item => item.LanguageName === "English" || item.LanguageName === "Polish"
  );
};

const downloadSubs = (
  subsResult: ISubsSearchResult,
  directoryPath: string
): Promise<ISubsDownloadResult> =>
  new Promise((resolve, reject) => {
    fetch(subsResult.SubDownloadLink).then(res =>
      res.arrayBuffer().then(data => {
        const gzPath = `${directoryPath}/${subsResult.SubFileName}.gz`;
        fs.writeFileSync(gzPath, new Buffer(data));
        const subtitlesFile = `${directoryPath}/${subsResult.SubFileName}`;
        gunzip(gzPath, subtitlesFile, () => {
          fs.unlinkSync(gzPath);
          resolve({
            file: subtitlesFile,
            language: subsResult.LanguageName
          });
        });
      })
    );
  });

const convertSubs = (
  subsDownloadResult: ISubsDownloadResult
): Promise<Subtitles> =>
  new Promise((resolve, reject) => {
    const vttPath = subsDownloadResult.file.replace(/\.[^\.]*$/, ".vtt");
    if (subsDownloadResult.file.match(/srt$/)) {
      var srtData = fs.readFileSync(subsDownloadResult.file);
      srt2vtt(srtData, function(err, vttData) {
        if (err) {
          reject(err);
        }
        fs.writeFileSync(vttPath, vttData);
        resolve({ vttPath, language: subsDownloadResult.language });
      });
    } else if (subsDownloadResult.file.match(/ass$/)) {
      fs.createReadStream(subsDownloadResult.file)
        .pipe(ass2vtt())
        .pipe(fs.createWriteStream(vttPath));
      resolve({ vttPath, language: subsDownloadResult.language });
    } else {
      resolve();
    }
  });

export const getSubtitlesLanguage = filename => {
  if (filename.toUpperCase().match(/\.EN\.|ENGLISH/)) {
    return "English";
  }
  if (filename.toUpperCase().match(/\.PL\.|POLISH/)) {
    return "Polish";
  }
  return "Unknown";
};

export const getSubsForMovie = async (movie: Movie): Promise<Subtitles[]> => {
  try {
    const items = fs.readdirSync(movie.directoryPath);
    if (items.some(item => item.match(/\.vtt$/))) {
      return items
        .filter(item => item.match(/\.vtt$/))
        .map(item => ({
          vttPath: `${movie.directoryPath}/${item}`,
          language: getSubtitlesLanguage(item)
        }));
    } else if (items.some(item => item.match(/\.srt$|\.ass/))) {
      const results = await Promise.all(
        items
          .filter(item => item.match(/\.srt$|\.ass$/))
          .map(item =>
            convertSubs({
              file: `${movie.directoryPath}/${item}`,
              language: getSubtitlesLanguage(item)
            })
          )
      );
      return results.filter(Boolean);
    } else {
      const subsSearchResults: ISubsSearchResult[] = await searchForSubs(
        movie.filePath
      );
      if (!subsSearchResults) {
        return [];
      }
      const subsDownloadResults: ISubsDownloadResult[] = await Promise.all(
        subsSearchResults.map(subsItem =>
          downloadSubs(subsItem, movie.directoryPath)
        )
      );
      if (!subsDownloadResults) {
        return [];
      }
      const results = await Promise.all(
        subsDownloadResults.map(file => convertSubs(file))
      );
      return results.filter(Boolean);
    }
  } catch (e) {
    logger.error(e);
    return [];
  }
};
