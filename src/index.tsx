import React from 'react'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import Providers from './Providers'
import Routes from './routes'

ReactDOM.render(
  <Providers>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Providers>,
  document.getElementById('root')
)
