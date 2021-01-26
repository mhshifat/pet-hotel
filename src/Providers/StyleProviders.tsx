import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyles, { theme } from '../styles'

const StyleProviders: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  )
}

export default StyleProviders
