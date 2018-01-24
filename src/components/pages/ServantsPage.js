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
  saveAvatar,
  updateAvatar,
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

  handleServantDialogConfirmAdd = (servantObj) => () => {
    const {key, promise} = addServant(servantObj.servant)

    const toResolve = [promise]
    if (servantObj.avatarObj) {
      toResolve.push(saveAvatar(servantObj.avatarObj, key).then(snapshot => {
        this.props.updateAvatar({[key]: snapshot.downloadURL})
      }))
    }

    Promise.all(toResolve).then(() => {
      this.setState({
        servantOpen: false,
        currentServantKey: null,
      })
    })
  }

  handleServantDialogConfirmUpdate = (servantObj) => () => {
    const { currentServantKey } = this.state
    const { servants } = this.props
    const servant = servants[currentServantKey]

    const toResolve = [
      updateServant(
        servantObj.servant,
        currentServantKey,
        servant.rank,
        servant.avatar,
      )]
    if (servantObj.avatarObj) {
      toResolve.push(saveAvatar(servantObj.avatarObj, currentServantKey).then(snapshot => {
        this.props.updateAvatar({[currentServantKey]: snapshot.downloadURL})
      }))
    }
    Promise.all(toResolve).then(() => {
      this.setState({
        servantOpen: false,
        currentServantKey: null,
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

  handleAlertDialogClose = () => this.setState({confirmOpen: false, currentServantKey: null})
  handleServantDialogClose = () => this.setState({servantOpen: false, currentServantKey: null})

  handleAlertDialogConfirm = () => {
    const servant = this.props.servants[this.state.currentServantKey]
    deleteServant(
      this.state.currentServantKey,
      servant.rank,
      servant.avatar,
    ).then(() => this.setState({ confirmOpen: false, currentServantKey: null }))
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
    const { classes, servants, ranks, servantRanks, avatars } = this.props
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
          avatars={avatars}
          ranks={ranks}
          servantRanks={servantRanks}
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
          avatar={avatars[this.state.currentServantKey]}
        />
      }
    </Grid>)
  }
}

ServantsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  servants: PropTypes.object,
  servantRanks: PropTypes.object,
  ranks: PropTypes.object,
}
export default compose(
  withStyles(styles),
  connect(state => state.servants, { updateAvatar }),
  connect(state => state.ranks),
)(ServantsPage)
