import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Open Sans Condensed', Arial, Helvetica, sans-serif;  
    padding: 20px 60px;
    
    @media screen and (max-width: 800px) {
      padding: 10px;
    }
  }

  html {
    overflow: scroll;
  }

  a {
    color: black;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

`