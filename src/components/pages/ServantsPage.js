import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import BaseDialog from '../dialogs/BaseDialog'
import {
  addServantListener,
  saveServant,
  deleteServant,
} from '../../reducers/servants/actions'
import ServantsList from '../lists/ServantsList'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
})

class ServantsPage extends React.Component {
  state ={
    confirmOpen: false,
    currentServantKey: null,
  }

  constructor (props) {
    super(props)
    this.props.addServantListener()
  }

  newServant = () => {
    saveServant('seba', {
      name: 'Seba',
      nick: 'Othil',
      status: true,
      year: 1983,
      from: 2000,
      battleTag: 'Othil#2978',
      rank: 'founders',
      ranks: {
        founders: true,
      },
    })
  }

  handleAlertDialogClose = () => this.setState({confirmOpen: false})

  handleAlertDialogConfirm = () => {
    this.setState({
      confirmOpen: false,
    }, () => deleteServant(this.state.currentServantKey))
  }

  removeServant = key => () => {
    this.setState({
      confirmOpen: true,
      currentServantKey: key,
    })
  }

  render () {
    const { classes } = this.props
    return (<Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      className={classes.root}
      spacing={0}
    >
      <Grid
        item
        xs={12}
        sm={10}
      >
        <ServantsList removeServant={this.removeServant} />
      </Grid>
      <Button
        fab color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={this.newServant}
      >
        <AddIcon />
      </Button>
      <BaseDialog
        title="Confirm: Delete Servant"
        desc="Do you really want to delete Servant?"
        open={this.state.confirmOpen}
        handleClose={this.handleAlertDialogClose}
        handleConfirm={this.handleAlertDialogConfirm}
      />
    </Grid>)
  }
}

ServantsPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default compose(
  withStyles(styles),
  connect(null, {
    addServantListener,
  }),
)(ServantsPage)
