import React from 'react'
import PropTypes from 'prop-types'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
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
              <Paper className={classes.alert}>{error.message}</Paper>
            }
            <TextField
              id="email"
              label="email"
              margin="normal"
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              autoComplete="current-password"
              margin="normal"
            />
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
