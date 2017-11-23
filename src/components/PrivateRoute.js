import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

class PrivateRouteContainer extends React.Component {
  componentWillMount () {
    // Add wrapper for all routes?
    console.log('loading')
    // console.log('PrivateRouteContainer', this.props.user)
  }

  render () {
    const {
      user,
      loading,
      component: Component,
      ...props
    } = this.props
    if (loading) {
      console.log('was here loading')
      return (<div>Loading</div>)
    } else {
      console.log('Loaded')
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

const PrivateRoute = connect(state => ({
  user: state.authReducer.user,
  loading: state.authReducer.loading,
}))(PrivateRouteContainer)

export default PrivateRoute
