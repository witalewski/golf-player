import React from "react";
import { exec } from "child_process";
import { MoviePlayerControlsStyled } from "./MoviePlayerControlsStyled";
import { logger } from "../utils/logger";

export const MoviePlayerControls = ({ exitPlayer, movieFilePath }) => {
  return (
    <MoviePlayerControlsStyled className="moviePlayerControls">
      <button onClick={exitPlayer}>
        <i className="fas fa-arrow-left" /> Back
      </button>
      <button
        onClick={() => {
          exec(`open "${movieFilePath}"`, logger.error);
        }}
      >
        Open in default player
      </button>
    </MoviePlayerControlsStyled>
  );
};
