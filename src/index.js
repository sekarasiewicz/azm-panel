import React from 'react'
import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer'

import purple from 'material-ui/colors/purple'
import green from 'material-ui/colors/green'
import red from 'material-ui/colors/red'
import App from './App'
import { initializeApp } from './reducers/auth/actions'

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

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
)

// If User is already auth, set in reducer
// this will not work, because, it will be redirected and catch again ?
console.log(window.location.pathname)
store.dispatch(initializeApp(window.location.pathname))

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}><App/></Provider>
  </MuiThemeProvider>,
  document.getElementById('root'),
)
registerServiceWorker()
