import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { login } from '../../reducers/auth/actions'
import { connect } from 'react-redux'
import { DEFAULT_PATH } from '../../lib/config'

class LoginPage extends React.Component {
  componentWillReceiveProps (nextProps) {
    if (nextProps.user) {
      const currentPath = this.context.router.route.location.pathname
      if (nextProps.redirectTo === currentPath || nextProps.redirectTo === '/') {
        this.context.router.history.push(DEFAULT_PATH)
      } else {
        this.context.router.history.push(nextProps.redirectTo)
      }
    }
  }

  componentWillMount () {
    if (this.props.user) {
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
