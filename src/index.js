import React from 'react'
import ReactDOM from 'react-dom'
import purple from 'material-ui/colors/purple'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'
import App from './App'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import './index.css'
import registerServiceWorker from './registerServiceWorker'

const theme = createMuiTheme({
  palette: {
    primary: purple, // Purple and green play nicely together.
    secondary: {
      ...green,
      A400: '#00e677',
    },
    error: red,
  },
})

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <App/>
  </MuiThemeProvider>,
  document.getElementById('root'),
)
registerServiceWorker()
