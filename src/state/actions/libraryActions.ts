import { SortOrder } from "../../global/constants";

export const RECEIVE_DETAILS = "RECEIVE_DETAILS";
export const SORT = "SORT";

export const receiveDetails = (details: Movie) => ({
  type: RECEIVE_DETAILS,
  details
});

export const sort = (sortOrder: SortOrder) => ({
  type: SORT,
  sortOrder
});
