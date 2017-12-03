import React from 'react'
import PropTypes from 'prop-types'
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
  flex: {
    flex: 1,
  },
  appBar: {
    marginBottom: 20,
  },
})

const DefaultLayout = ({ children, classes }) => (
  <div className={classes.root}>
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Typography type="title" color="inherit" className={classes.flex}>
            Słudzy Azmodana
        </Typography>
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
