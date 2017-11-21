import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import PrivateRoute from './components/PrivateRoute'
import logo from './logo.svg'
import './App.css'

import { login, checkUser, updateUser } from './reducers/auth/actions'

const DefaultLayout = ({ children }) => (
  <div>
    <h1>DefaultLayout</h1>
    {children}
  </div>
)

class App extends Component {
  onClick = (e) => {
    e.preventDefault()
    login({email: 'sekarasiewicz@gmail.com', password: 'sebastian'})
  }

  onCheck = (e) => {
    e.preventDefault()
    checkUser()
  }

  onUpdate = (e) => {
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
            <a href="#" onClick={this.onClick}>Click</a>
            <br />
            <a href="#" onClick={this.onCheck}>Check User</a>
            <br />
            <a href="#" onClick={this.onUpdate}>Update User</a>
          </div>}/>
          <DefaultLayout>
            <img src={logo} className="App-logo" alt="logo" />
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
