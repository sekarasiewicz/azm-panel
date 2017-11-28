import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import DefaultLayout from './components/DefaultLayout'
import LoginPage from './components/login/LoginPage'
import ServantsPage from './components/servants/ServantsPage'
import Loading from './components/Loading'
import NoMatch from './components/NoMatch'
import { connect } from 'react-redux'
import './App.css'

class App extends Component {
  render () {
    console.log('Render Main Component')
    // Try to use bind like in tutorial
    return (
      <div>
        { this.props.initializing
          ? <Loading/>
          : <Router>
            <Switch>
              <Redirect from="/" exact to="/login"/>
              <Route path="/login" component={LoginPage}/>
              { !isEmpty(this.props.user) &&
              <DefaultLayout>
                <Switch>
                  <Route path="/servants" component={ServantsPage}/>
                  <Route path="/404" component={NoMatch}/>
                  <Redirect to="/404"/>
                </Switch>
              </DefaultLayout>
              }
              <Redirect to="/login"/>
            </Switch>
          </Router>
        }
      </div>
    )
  }
}

export default connect(state => state.auth)(App)
