import styled from "@emotion/styled";
import { colorPrimary } from "../styles/styleGlobals";

export const HeaderStyled = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 24px;
  margin: 3rem;

  > {
    margin: 3rem;
  }

  span {
    display: flex;
    align-items: center;
  }

  &:nth-child(1) {
    margin-left: 0;
  }
  &:nth-last-child(1) {
    margin-right: 0;
  }

  .appTitle {
    font-size: 48px;
    color: ${colorPrimary};
    margin: 3rem;
  }

  label {
    margin-left: 2rem;
    margin-right: 10rem;
  }

  select {
    font-size: 24px;
    margin-left: 2rem;
  }
`;
