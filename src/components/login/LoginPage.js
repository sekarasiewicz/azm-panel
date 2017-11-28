import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'
import Button from 'material-ui/Button'
import { login } from '../../reducers/auth/actions'
import { connect } from 'react-redux'

class LoginPage extends React.Component {
  componentWillMount () {
    console.log('componentWillMount', this.props)
  }
  componentWillReceiveProps (nextProps) {
    if (!isEmpty(nextProps.user)) {
      this.context.router.history.push(nextProps.redirectTo)
    }
  }

  onLogin = (e) => {
    this.props.login({
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
