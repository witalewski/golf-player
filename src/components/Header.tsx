import React from "react";
import { HeaderStyled } from "./HeaderStyled";
import {
  SORT_RECENTLY_ADDED,
  SORT_RELEASE_DATE,
  SORT_RATING,
  SORT_ALPHABETICALLY
} from "../global/constants";

export const Header = () => (
  <HeaderStyled>
    <h1 className="appTitle">🏌🏿‍ Golf Player</h1>
    <span>
      Sort by
      <select>
        <option value={SORT_RECENTLY_ADDED}>Recently Added</option>
        <option value={SORT_RELEASE_DATE}>Release Date</option>
        <option value={SORT_RATING}>Rating</option>
        <option value={SORT_ALPHABETICALLY}>Alphabetically</option>
      </select>
    </span>
  </HeaderStyled>
);
