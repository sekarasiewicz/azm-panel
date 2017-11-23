import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import AppBar from './components/AppBar'
import logo from './logo.svg'
import './App.css'

import { login, userState, updateUser } from './reducers/auth/actions'

class App extends Component {
  login = (e) => {
    e.preventDefault()
    login({email: 'sekarasiewicz@gmail.com', password: 'sebastian'})
  }

  check = (e) => {
    e.preventDefault()
    userState()
  }

  update = (e) => {
    e.preventDefault()
    updateUser({
      displayName: 'sebix',
      photoURL: 'https://example.com/jane-q-user/profile.jpg',
    })
  }

  render () {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={() => <p>Home</p>}/>
          <Route path="/login" component={() => <div>
            <p>Login</p>
            <a href="#" onClick={this.login}>login</a>
            <br />
            <a href="#" onClick={this.userState}>Check User</a>
            <br />
            <a href="#" onClick={this.update}>Update User</a>
            <br />
            <br />
            <Link to="/servants">Servants</Link>
          </div>}/>
          <AppBar>
            <img src={logo} className="App-logo" alt="logo" />
            <Switch>
              <PrivateRoute path="/servants" component={() => <p>Servants</p>}/>
            </Switch>
          </AppBar>
        </Switch>
      </Router>
    )
  }
}

export default App
