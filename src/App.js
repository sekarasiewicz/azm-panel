import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import PropTypes from 'prop-types'
import DefaultLayout from './components/DefaultLayout'
import logo from './logo.svg'
import './App.css'

import { login, updateUser, logout } from './reducers/auth/actions'

class LoginForm extends Component {
  componentWillMount () {
    console.log('LoginForm')
  }

  login = (e) => {
    e.preventDefault()
    login({email: 'sekarasiewicz@gmail.com', password: 'sebastian'}).then(u => {
      this.context.router.history.push('/servants')
    })
  }

  update = (e) => {
    e.preventDefault()
    updateUser({
      displayName: 'sebix',
      photoURL: 'https://example.com/jane-q-user/profile.jpg',
    })
  }

  logout = (e) => {
    e.preventDefault()
    logout()
  }

  render () {
    return (<div>
      <p>Login</p>
      <a href="#" onClick={this.login}>login</a>
      <br />
      <a href="#" onClick={this.userState}>Check User</a>
      <br />
      <a href="#" onClick={this.update}>Update User</a>
      <br />
      <a href="#" onClick={this.logout}>Logout</a>
      <br />
      <Link to="/servants">Servants</Link>
    </div>)
  }
}

LoginForm.contextTypes = {
  router: PropTypes.object.isRequired,
}

class App extends Component {
  render () {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={() => <p>Home</p>}/>
          <Route path="/login" component={LoginForm}/>
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
