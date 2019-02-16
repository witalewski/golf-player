import styled from "@emotion/styled";

export const LibraryStyled = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
  background-color: rgb(40, 40, 40);

  section {
    flex-shrink: 0;
    flex-grow: 0;
    flex-basis: auto;
  }

  h2 {
    margin-left: 3rem;
    color: white;
    font-size: 24px;
  }

  .trailerModal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
  }

  .trailerEmbed {
    width: 66%;
    height: 66%;
  }
`;
