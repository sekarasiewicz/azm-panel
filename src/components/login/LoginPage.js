import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'
import { FormControl } from 'material-ui/Form'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import compose from 'recompose/compose'
import { login } from '../../reducers/auth/actions'
import { DEFAULT_PATH } from '../../lib/config'

const styles = theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  alert: {
    backgroundColor: theme.palette.error[500],
    color: theme.palette.getContrastText(theme.palette.error[500]),
    padding: theme.spacing.unit,
  },
})

class LoginPage extends React.Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
  }

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

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  };

  handleMouseDownPassword = event => {
    event.preventDefault()
  };

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  onLogin = () => {
    console.log(this.state)
    this.props.login({
      email: this.state.email,
      password: this.state.password,
    })
  }

  render () {
    const { classes, error } = this.props
    return (<div
      className={classes.root}
    >
      <Grid
        item
        xs={12}
        sm={3}
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
            {error &&
              // TODO make component for message
              <Paper className={classes.alert}>{error.message}</Paper>
            }
            <TextField
              id="email"
              label="email"
              margin="normal"
              className={classes.formControl}
              onChange={this.handleChange('email')}
            />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type={this.state.showPassword ? 'text' : 'password'}
                value={this.state.password}
                onChange={this.handleChange('password')}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={this.handleClickShowPasssword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button raised color="primary" onClick={this.onLogin}>Login</Button>
          </Grid>
        </Paper>
      </Grid>
    </div>)
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
