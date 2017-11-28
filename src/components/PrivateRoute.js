import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class PrivateRouteContainer extends React.Component {
  render () {
    const {
      user,
      initializing,
      component: Component,
      ...props
    } = this.props
    if (initializing) {
      return (<div>Loading</div>)
    } else {
      return (
        <Route
          {...props}
          render={props =>
            !isEmpty(user)
              ? <Component {...props} />
              : (
                <Redirect to={{
                  pathname: '/login',
                  state: { from: props.location },
                }} />
              )
          }
        />
      )
    }
  }
}

const PrivateRoute = connect(state => state.auth)(PrivateRouteContainer)

export default PrivateRoute
