import React from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import BaseDialog from '../dialogs/BaseDialog'
import RanksList from '../lists/RanksList'
import {
  saveRank,
  deleteRank,
} from '../../reducers/ranks/actions'
import RankDialog from '../dialogs/RankDialog'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  panelHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
    height: 50,
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

class RanksPage extends React.Component {
  state ={
    confirmOpen: false,
    rankOpen: false,
    currentRankKey: null,
  }

  handleRankDialogConfirm = (servant) => () => {
    saveRank(servant).then(() => {
      this.setState({
        rankOpen: false,
      })
    })
  }

  newRank = () => {
    this.setState({
      rankOpen: true,
    })
  }

  handleAlertDialogClose = () => this.setState({confirmOpen: false})
  handleRankDialogClose = () => this.setState({rankOpen: false})

  handleAlertDialogConfirm = () => {
    this.setState({
      confirmOpen: false,
    }, () => deleteRank(this.state.currentRankKey))
  }

  removeRank = key => () => {
    this.setState({
      confirmOpen: true,
      currentRankKey: key,
    })
  }

  render () {
    const { classes, ranks } = this.props
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
        <RanksList
          removeRank={this.removeRank}
          ranks={ranks}
        />
      </Grid>
      <Button
        fab color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={this.newRank}
      >
        <AddIcon />
      </Button>
      <BaseDialog
        title="Confirm: Delete Rank"
        desc="Do you really want to delete Rank? It will leave Servants With This Rank Without Rank!"
        open={this.state.confirmOpen}
        handleClose={this.handleAlertDialogClose}
        handleConfirm={this.handleAlertDialogConfirm}
      />
      <RankDialog
        open={this.state.rankOpen}
        handleClose={this.handleRankDialogClose}
        handleConfirm={this.handleRankDialogConfirm}
      />
    </Grid>)
  }
}

export default compose(
  withStyles(styles),
  connect(state => state.ranks),
)(RanksPage)
