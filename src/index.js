import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers'

import red from 'material-ui/colors/red'
import App from './App'
import { initializeApp } from './reducers/auth/actions'

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'

import './index.css'
import registerServiceWorker from './registerServiceWorker'

const theme = createMuiTheme({
  palette: {
    primary: {
      50: '#250E0D',
      100: '#250E0D',
      200: '#250E0D',
      300: '#250E0D',
      400: '#250E0D',
      500: '#172424', // AppBar
      600: '#250E0D',
      700: '#250E0D',
      800: '#250E0D',
      900: '#250E0D',
      A100: '#250E0D',
      A200: '#250E0D',
      A400: '#250E0D',
      A700: '#250E0D',
      contrastDefaultColor: 'light',
    },
    secondary: {
      50: '#7CD1A8',
      100: '#7CD1A8',
      200: '#7CD1A8',
      300: '#7CD1A8',
      400: '#7CD1A8',
      500: '#7CD1A8',
      600: '#250E0D',
      700: '#250E0D',
      800: '#250E0D',
      900: '#250E0D',
      A100: '#7CD1A8',
      A200: '#7CD1A8', // buttons
      A400: '#7CD1A8',
      A700: '#7CD1A8',
      contrastDefaultColor: 'light',
    },
    error: red,
  },
})

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
)

// If User is already auth, set in reducer
store.dispatch(initializeApp(window.location.pathname))

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}><App/></Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
)
registerServiceWorker()
