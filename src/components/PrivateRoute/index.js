import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     fakeAuth.isAuthenticated ? (
//       <Component {...props}/>
//     ) : (
//       <Redirect to={{
//         pathname: '/login',
//         state: { from: props.location },
//       }}/>
//     )
//   )}/>
// )

// https://github.com/ReactTraining/react-router/pull/5647/files
class PrivateRoute extends React.Component {
  render () {
    const { component: Component, ...rest } = this.props
    return (
      <Route {...rest} render={props => (
        isAuthenticated ? (
          <Component {...props}/>
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: props.location },
          }}/>
        )
      )}/>
    )
  }
}

export default connect(state => state.auth)(PrivateRoute)
