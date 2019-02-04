import { Action } from "redux";

export const RECEIVE_DIRECTORIES = "RECEIVE_DIRECTORIES";
export const RECEIVE_DETAILS = "RECEIVE_DETAILS";

export const receiveDirectories = (directories: string[]) => ({
  type: RECEIVE_DIRECTORIES,
  directories
});

export const receiveDetails = (details: Movie) => ({
  type: RECEIVE_DETAILS,
  details
});
