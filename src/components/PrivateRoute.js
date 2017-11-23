import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class PrivateRouteContainer extends React.Component {
  componentWillMount () {
    console.log('PrivateRouteContainer', this.props.user)
  }

  render () {
    const {
      user,
      component: Component,
      ...props
    } = this.props
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

const PrivateRoute = connect(state => ({user: state.authReducer.user}))(PrivateRouteContainer)

export default PrivateRoute
