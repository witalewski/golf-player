import styled from "@emotion/styled";
import { colorPrimary } from "../styles/styleGlobals";

export const MoviePlayerControlsStyled = styled.div`
  /* display: flex; */
  position: absolute;
  top: 1rem;
  left: 1rem;

  button {
    margin: 1rem;
    padding: 2rem;
    color: white;
    font-size: 24px;
    border: none;
    background-color: ${colorPrimary};
    cursor: pointer;
  }
`;
