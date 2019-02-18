import React from "react";
import { HeaderStyled } from "./HeaderStyled";

export const Header = () => (
  <HeaderStyled>
    <h1>🏌🏿‍ Golf Player</h1>
    <button onClick={() => window.close()}>Exit</button>
  </HeaderStyled>
);
