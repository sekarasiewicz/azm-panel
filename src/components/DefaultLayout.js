import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import { logout } from '../reducers/auth/actions'

const styles = theme => ({
  root: {
    width: '100%',
  },
  nav: {
    flex: 1,
    marginLeft: 30,
  },
  appBar: {
    marginBottom: 20,
  },
  activeButton: {
    backgroundColor: theme.palette.secondary.A200,
    color: theme.palette.getContrastText(theme.palette.secondary.A200),
    boxShadow: theme.shadows[8],
    '&:hover': {
      backgroundColor: theme.palette.grey.A100,
      // Reset on mouse devices
      '@media (hover: none)': {
        backgroundColor: theme.palette.grey[300],
      },
    },
  },
})

const DefaultLayout = ({ children, classes }) => (
  <div className={classes.root}>
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography type="title" color="inherit">
            Słudzy Azmodana
        </Typography>
        <nav className={classes.nav}>
          <Button
            color="contrast"
            component={NavLink}
            activeClassName={classes.activeButton}
            to="/servants"
          >
            Servants
          </Button>
          <Button
            color="contrast"
            component={NavLink}
            to="/ranks"
            activeClassName={classes.activeButton}
          >
            Ranks
          </Button>
        </nav>
        <Button color="contrast" onClick={logout}>Logout</Button>
      </Toolbar>
    </AppBar>
    {children}
  </div>
)

DefaultLayout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DefaultLayout)
