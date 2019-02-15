import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
body {
  font-family: ${props => props.theme.fontFamily};
  background: ${props => props.theme.bodyColor};
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.theme.fontColor};
  box-sizing: border-box;
  margin: 0;
  * {
    box-sizing: border-box;
  }
}
`;
