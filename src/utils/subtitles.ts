import fs from "fs";
import opensubtitles from "subtitler";
import gunzip from "gunzip-file";
import srt2vtt from "srt2vtt";
import ass2vtt from "ass-to-vtt";
import { logger } from "./logger";

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
    }
  });

export const getSubsForMovie = async (movie: Movie): Promise<Subtitles[]> => {
  try {
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
    return await Promise.all(
      subsDownloadResults.map(file => convertSubs(file))
    );
  } catch (e) {
    logger.error(e);
    return [];
  }
};
