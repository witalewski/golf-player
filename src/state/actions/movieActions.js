export const RECEIVE_DIRECTORIES = "RECEIVE_DIRECTORIES";
export const RECEIVE_DETAILS = "RECEIVE_DETAILS";

export const receiveDirectories = directories => ({
  type: RECEIVE_DIRECTORIES,
  directories
});

export const receiveDetails = details => ({
  type: RECEIVE_DETAILS,
  details
});
