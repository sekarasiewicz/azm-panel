import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'
import logo from './logo.svg'
import './App.css'

const fakeAuth = {
  isAuthenticated: false,
}


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location },
      }}/>
    )
  )}/>
)

const DefaultLayout = ({ children }) => (
  <div>
     <h1>DefaultLayout</h1>
     {children}
 </div>
)

class App extends Component {
  render() {
    return (
    <Router>
      <Switch>
        <Route path="/checkout" exact component={() => <p>checkout</p>}/>
        <DefaultLayout>
          <Switch>
            <Route path="/" exact component={() => <p>Home</p>}/>
            <PrivateRoute path="/products" component={() => <p>products</p>}/>
            <Route path="/cart" component={() => <p>Cart</p>}/>
            <Route path="/login" component={() => <p>Login</p>}/>
            <Route path="/register" component={() => <p>Register</p>}/>
            <Route path="/forgetpass" component={() => <p>forgetpass</p>}/>
          </Switch>
        </DefaultLayout>
      </Switch>
    </Router>
    )
  }
}

export default App
