import styled, { createGlobalStyle } from 'styled-components'

export const theme = {
  color: {
    primary: '#AD4D25',
    secondary: '#C18936',
    dark: '#302e4d',
    lightDark: '#504e70',
    white: '#ffffff',
    lightWhite: '#f1f6fc'
  }
}

const GlobalStyles = createGlobalStyle`
  html {
    font-size: 10px;
    box-sizing: border-box;
  }
  
  *, *::before, *::after {
    padding: 0;
    margin: 0;
    box-sizing: inherit;
  }

  body {
    font-size: 1.5rem;
    font-weight: 400;
    line-height: 1.5;
    font-family: 'Roboto', sans-serif;
    color: ${theme.color.lightDark};
    -webkit-font-smoothing: antialiased;
  }

  input,
  textarea,
  select {
    font-family: 'Roboto', sans-serif;
  }
`

export const SectionHeading = styled.h3`
  font-size: 1.5rem;
  font-weight: 500;
  position: relative;
  text-transform: uppercase;
  color: ${theme.color.dark};

  &::before {
    content: '';
    width: 1.5rem;
    height: 2px;
    background: ${theme.color.primary};
    position: absolute;
    top: 0;
    left: 0;
  }
`

export const ButtonGroups = styled.div`
  margin: 2rem 0;

  & a {
    text-decoration: none;
    display: inline-block;
  }

  & button {
    display: flex;
    align-items: center;

    & > svg {
      margin-right: 0.5rem;
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`

export const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  display: inline-block;
  object-fit: cover;
  border-radius: 50%;
`

export default GlobalStyles
