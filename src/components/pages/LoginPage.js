import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import compose from 'recompose/compose'
import PasswordInput from '../inputs/PasswordInput'
import TextInput from '../inputs/TextInput'
import { login } from '../../reducers/auth/actions'
import { DEFAULT_PATH } from '../../lib/config'

const AUTH_WRONG_PASSWORD = 'auth/wrong-password'

const styles = theme => ({
  root: {
    flexGrow: 1,
    minHeight: '100%',
  },
  form: {
    padding: 16,
    textAlign: 'center',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
    height: 50,
  },
})

class LoginPage extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.user) {
      const currentPath = this.context.router.route.location.pathname
      if (nextProps.redirectTo === currentPath || nextProps.redirectTo === '/') {
        this.context.router.history.push(DEFAULT_PATH)
      } else {
        this.context.router.history.push(nextProps.redirectTo)
      }
    } else {
      this.setState({isLoading: false})
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

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  };

  onLogin = () => {
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    })
    this.setState({isLoading: true})
  }

  render () {
    const { classes, error } = this.props
    const { isLoading } = this.state
    const passwordError = error && error.code === AUTH_WRONG_PASSWORD
    const otherError = error && error.code !== AUTH_WRONG_PASSWORD
    return (<Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid
        item
        xs={12}
        sm={4}
      >
        <Paper>
          <Typography
            type="headline"
            className={classes.panelHeader}>
            Słudzy Azmodana
          </Typography>
          <Grid
            container
            direction="column"
            justify="center"
            className={classes.form}
          >
            <TextInput
              id="email"
              error={otherError && error.message}
              onChange={this.handleChange('email')}
              value={this.state.email}
            />
            <PasswordInput
              id="password"
              error={passwordError && error.message}
              onChange={this.handleChange('password')}
              value={this.state.password}
            />
            <Button raised color="primary"
              onClick={this.onLogin}
              disabled={isLoading}>
              Login
            </Button>
          </Grid>
        </Paper>
      </Grid>
    </Grid>)
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
}

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  user: PropTypes.object,
  error: PropTypes.object,
}

export default compose(
  withStyles(styles),
  connect(state => state.auth, {login}),
)(LoginPage)
