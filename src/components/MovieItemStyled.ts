import styled from "@emotion/styled";

export const MovieItemStyled = styled.li`
  display: block;
  flex-basis: 30rem;
  flex-shrink: 0;
  height: 43rem;
  align-items: stretch;
  margin: 3rem;
  font-size: 16px;
  background-color: #333;
  background-size: cover;
  background-position: center;
  color: white;
  overflow: hidden;
  text-overflow: ellipsis;
  transform: scale(1);
  transition: 0.2s;

  &:hover {
    transform: scale(1.1);
    transition: 0.2s;
    box-shadow: 0 1rem 1rem 1rem rgba(0, 0, 0, 0.2);

    .movieDetails {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: stretch;
      background-size: cover;
      background-position: center;
      background-blend-mode: multiply;
      background-color: #333;
    }
  }
`;
