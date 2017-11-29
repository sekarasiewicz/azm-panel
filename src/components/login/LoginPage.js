import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Button from 'material-ui/Button'
import { login } from '../../reducers/auth/actions'
import { connect } from 'react-redux'

class LoginPage extends React.Component {
  componentWillReceiveProps (nextProps) {
    // Consider this.context.router.route.location.pathname
    // nextProps.redirectTo === currentPath, some different cases
    if (!isEmpty(nextProps.user)) {
      const currentPath = this.context.router.route.location.pathname
      if (nextProps.redirectTo === currentPath || nextProps.redirectTo === '/') {
        this.context.router.history.push(nextProps.defaultPath)
      } else {
        this.context.router.history.push(nextProps.redirectTo)
      }
    }
  }

  componentWillMount () {
    if (!isEmpty(this.props.user)) {
      const currentPath = this.context.router.route.location.pathname
      if (this.props.redirectTo === currentPath || this.props.redirectTo === '/') {
        this.context.router.history.push(this.props.defaultPath)
      } else {
        this.context.router.history.push(this.props.redirectTo)
      }
    }
  }

  onLogin = (e) => {
    this.props.login({
      email: '',
      password: '',
    })
  }

  render () {
    return (<div>
      {this.props.error &&
        <p>{this.props.error.message}</p>
      }
      <Button raised color="primary" onClick={this.onLogin}>Login</Button>
    </div>)
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

export default connect(state => state.auth, {login})(LoginPage)
