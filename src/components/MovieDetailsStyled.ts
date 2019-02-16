import styled from "@emotion/styled";
import { colorPrimary } from "../styles/styleGlobals";

export const MovieDetailsStyled = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  overflow: hidden;

  .title {
    margin: 1rem 1rem;
    font-size: 24px;
  }

  .runtime,
  .info {
    margin: 1rem 1rem;
    font-size: 16px;
  }

  .plot {
    margin: 1rem 1rem;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .buttons {
    display: flex;
    justify-content: center;
  }

  button {
    flex-basis: 50%;
    margin: 1rem;
    padding: 2rem;
    color: white;
    font-size: 18px;
    border: none;
    background-color: ${colorPrimary};
    cursor: pointer;
  }
`;
