import styled from "@emotion/styled";
import { colorPrimary } from "../styles/styleGlobals";

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;

  h1 {
    font-size: 48px;
    color: ${colorPrimary};
    margin: 3rem;
  }

  button {
    margin: 1rem;
    padding: 2rem;
    color: white;
    font-size: 18px;
    border: none;
    background-color: ${colorPrimary};
    cursor: pointer;
  }
`;
