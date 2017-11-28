import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import DefaultLayout from './components/DefaultLayout'
import LoginPage from './components/login/LoginPage'
import './App.css'

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Redirect from="/" exact to="/login"/>
          <Route path="/login" component={LoginPage}/>
          <DefaultLayout>
            <Switch>
              <PrivateRoute path="/servants" component={() => <p>Servants</p>}/>
            </Switch>
          </DefaultLayout>
        </Switch>
      </Router>
    )
  }
}

export default App
