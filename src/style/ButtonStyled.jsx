import styled from "styled-components";

const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 5px;
`;

const LogInButton = styled(Button)`
  background-color: lightgray;
  border: 2px solid gray;
`;

export { Button, LogInButton };
