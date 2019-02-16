import styled from "@emotion/styled";

export const MoviePlayerStyled = styled.div`
  .moviePlayer {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
  .notificationArea {
    position: absolute;
    top: 3rem;
    right: 3rem;
    padding: 1rem;
    color: white;
    font-size: 32px;
    background-color: rgba(0, 0, 0, 0.5);
  }
  video::-webkit-media-controls-fullscreen-button {
    display: none;
  }
`;
