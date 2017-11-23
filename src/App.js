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
// import firebase from './lib/firebaseService'

import { login, userState, updateUser } from './reducers/auth/actions'

class App extends Component {
  // componentWillMount = () => {
  //   this.setState({
  //     loading: true,
  //   })
  //   firebase.auth().onAuthStateChanged((user) => {
  //     this.setState({
  //       loading: false,
  //     })
  //   })
  // }

  state = {
    loading: false,
  }
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
      <div>
        { !this.state.loading
          ? <Router>
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
          : <div>LOADING</div>}
      </div>
    )
  }
}

export default App
