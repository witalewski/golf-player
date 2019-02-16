import styled from "@emotion/styled";
import { colorPrimary } from "../styles/styleGlobals";

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: flex-end;
  h1 {
    font-size: 48px;
    color: ${colorPrimary};
    margin: 3rem;
  }
`;
