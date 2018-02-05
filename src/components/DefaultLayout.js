import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Button from 'material-ui/Button'
import Hidden from 'material-ui/Hidden'
import Menu, { MenuItem } from 'material-ui/Menu'
import MenuIcon from 'material-ui-icons/Menu'
import IconButton from 'material-ui/IconButton'
import { logout } from '../reducers/auth/actions'

const styles = theme => ({
  root: {
    width: '100%',
  },
  nav: {
    flex: 1,
    marginLeft: 30,
    display: 'flex',
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
  activeHiddenMenuItem: {
    backgroundColor: theme.palette.secondary.A200,
    color: theme.palette.getContrastText(theme.palette.secondary.A200),
  },
})

class DefaultLayout extends React.Component {
  state = {
    auth: true,
    anchorEl: null,
  }

  handleChange = (event, checked) => {
    this.setState({ auth: checked })
  }

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render () {
    const { classes, children } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography type="title" color="inherit">
                Słudzy Azmodana
            </Typography>
            <Hidden only={['xs', 'sm']}>
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
            </Hidden>
            <Hidden only={['md', 'lg', 'xl']}>
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={ open }
                  onClose={ this.handleClose }
                >
                  <MenuItem
                    component={ NavLink }
                    to="/servants"
                    onClick={ this.handleClose }
                  >Servants</MenuItem>
                  <MenuItem
                    component={ NavLink }
                    to="/ranks"
                    onClick={ this.handleClose }
                  >Ranks</MenuItem>
                  <hr />
                  <MenuItem onClick={ logout } style={{ color: '#ff0000' }}>Logout</MenuItem>
                </Menu>
              </div>
            </Hidden>
          </Toolbar>
        </AppBar>
        {children}
      </div>)
  }
}

DefaultLayout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DefaultLayout)
