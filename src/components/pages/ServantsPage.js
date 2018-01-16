import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import BaseDialog from '../dialogs/BaseDialog'
import ServantDialog from '../dialogs/ServantDialog'
import {
  addServant,
  updateServant,
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
  state = {
    confirmOpen: false,
    servantOpen: false,
    currentServantKey: null,
  }

  handleServantDialogConfirmAdd = (servant) => () => {
    addServant(servant).then(() => {
      this.setState({
        servantOpen: false,
      })
    })
  }

  handleServantDialogConfirmUpdate = (servant) => () => {
    updateServant(
      servant,
      this.state.currentServantKey,
      this.props.servants[this.state.currentServantKey].rank).then(() => {
      this.setState({
        servantOpen: false,
      })
    })
  }

  getServantConfirmFunc = () => {
    if (this.state.currentServantKey) {
      return this.handleServantDialogConfirmUpdate
    }
    return this.handleServantDialogConfirmAdd
  }

  newServant = () => {
    this.setState({
      servantOpen: true,
    })
  }

  handleAlertDialogClose = () => this.setState({confirmOpen: false})
  handleServantDialogClose = () => this.setState({servantOpen: false, currentServantKey: null})

  handleAlertDialogConfirm = () => {
    this.setState({
      confirmOpen: false,
    }, () => deleteServant(
      this.state.currentServantKey,
      this.props.servants[this.state.currentServantKey].rank
    ))
  }

  removeServantDialog = key => () => {
    this.setState({
      confirmOpen: true,
      currentServantKey: key,
    })
  }

  updateServantDialog = key => () => {
    this.setState({
      servantOpen: true,
      currentServantKey: key,
    })
  }

  render () {
    const { classes, servants, ranks } = this.props
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
        <ServantsList
          removeServant={this.removeServantDialog}
          updateServant={this.updateServantDialog}
          servants={servants}
          ranks={ranks}
        />
      </Grid>
      <Button
        fab color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={this.newServant}
      >
        <AddIcon />
      </Button>
      {this.state.confirmOpen &&
        <BaseDialog
          title="Confirm: Delete Servant"
          desc="Do you really want to delete Servant?"
          open={this.state.confirmOpen}
          handleClose={this.handleAlertDialogClose}
          handleConfirm={this.handleAlertDialogConfirm}
        />
      }
      {this.state.servantOpen &&
        <ServantDialog
          open={this.state.servantOpen}
          handleClose={this.handleServantDialogClose}
          handleConfirm={this.getServantConfirmFunc()}
          ranks={ranks}
          servant={servants && servants[this.state.currentServantKey]}
        />
      }
    </Grid>)
  }
}

ServantsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  servants: PropTypes.object,
  ranks: PropTypes.object,
}
export default compose(
  withStyles(styles),
  connect(state => state.servants),
  connect(state => state.ranks),
)(ServantsPage)
