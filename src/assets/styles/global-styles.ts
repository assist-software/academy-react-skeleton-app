import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    font-family: var(--font-family);
    margin: 0;
    padding: 0;
  }

  a {
    color: #38aabb;
    text-decoration: none;
  }

  h1 {
    font-size: 40px;
    font-weight: 600;
  }

  label {
    color: #111;
    font-size: 20px;
    font-weight: 600;
  }
`
