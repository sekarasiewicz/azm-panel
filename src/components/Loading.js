import React from 'react'
import { CircularProgress } from 'material-ui/Progress'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'

const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
})

const Loading = ({ classes }) => (
  <div className={classes.root}>
    <h1>LOADING</h1>
    <CircularProgress size={100} />
  </div>
)

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Loading)
