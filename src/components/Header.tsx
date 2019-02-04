import React from "react";
import { HeaderStyled } from "./HeaderStyled";
import { SortOrder } from "../global/constants";

export const Header = ({ sort }) => (
  <HeaderStyled>
    <h1 className="appTitle">🏌🏿‍ Golf Player</h1>
    <span>
      <span>
        <input id="groupByGenre" name="groupByGenre" type="checkbox" />
        <label htmlFor="groupByGenre">Group by genre</label>
      </span>
      <span>
        Sort by
        <select onChange={({ target: { value } }) => sort(value)}>
          <option value={SortOrder.RecentlyAdded}>Recently Added</option>
          <option value={SortOrder.ReleaseDate}>Release Date</option>
          <option value={SortOrder.Rating}>Rating</option>
          <option value={SortOrder.Alphabetically}>Alphabetically</option>
        </select>
      </span>
    </span>
  </HeaderStyled>
);
