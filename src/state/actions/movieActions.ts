export const RECEIVE_DETAILS = "RECEIVE_DETAILS";

export const receiveDetails = (details: Movie) => ({
  type: RECEIVE_DETAILS,
  details
});
