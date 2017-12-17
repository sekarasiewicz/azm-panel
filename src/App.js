import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout'
import LoginPage from './components/pages/LoginPage'
import RanksPage from './components/pages/RanksPage'
import ServantsPage from './components/pages/ServantsPage'
import Loading from './components/Loading'
import NoMatch from './components/NoMatch'
import { connect } from 'react-redux'
import './App.css'

// TODO Keep path in 404
const App = ({ user, initializing }) => (
  <div id="root">
    { initializing
      ? <Loading />
      : <Router>
        <Switch>
          <Redirect from="/" exact to="/login" />
          <Route path="/login" component={LoginPage} />
          { user &&
          <DefaultLayout>
            <Switch>
              <Route path="/servants" component={ServantsPage} />
              <Route path="/ranks" component={RanksPage} />
              <Route component={NoMatch} />
            </Switch>
          </DefaultLayout>
          }
          <Redirect to="/login" />
        </Switch>
      </Router>
    }
  </div>
)

export default connect(state => state.auth)(App)
