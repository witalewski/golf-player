import styled from "@emotion/styled";

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
`;
