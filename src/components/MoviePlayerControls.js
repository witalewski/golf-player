import React from "react";
import { exec } from "child_process";
import { MoviePlayerControlsStyled } from "./MoviePlayerControlsStyled";

export const MoviePlayerControls = ({ exitPlayer, movieFilePath }) => {
  return (
    <MoviePlayerControlsStyled>
      <button onClick={exitPlayer}>
        <i className="fas fa-arrow-left" /> Back
      </button>
      <button
        onClick={() => {
          exec(`open "${movieFilePath}"`, console.log);
        }}
      >
        Open in default player
      </button>
    </MoviePlayerControlsStyled>
  );
};
