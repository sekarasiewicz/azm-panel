import React from 'react'
import { withStyles } from 'material-ui/styles'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import Grid from 'material-ui/Grid'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'
import List, {
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
} from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import FolderIcon from 'material-ui-icons/Folder'
import DeleteIcon from 'material-ui-icons/Delete'
import AlertDialog from '../dialogs/AlertDialog'
import {
  addServantListener,
  saveServant,
  deleteServant,
} from '../../reducers/servants/actions'

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

  handleAlertDialogClose = () => {
    this.setState({confirmOpen: false})
  }

  handleAlertDialogConfirm = () => {
    this.setState({
      confirmOpen: false,
    }, () => deleteServant(this.state.currentServantKey))
  }

  handleDelete = key => () => {
    this.setState({
      confirmOpen: true,
      currentServantKey: key,
    })
  }

  render () {
    const { classes, servants } = this.props
    const servantObjKeys = servants && Object.keys(servants)
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
        <Paper>
          <Typography
            type="headline"
            className={classes.panelHeader}>
            Servants
          </Typography>
          <div>
            <List dense={false}>
              {servantObjKeys && servantObjKeys.map(key => (
                <ListItem button key={key}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={servants[key].nick}
                    secondary={key}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete"
                      onClick={this.handleDelete(key)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        </Paper>
      </Grid>
      <Button
        fab color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={this.newServant}
      >
        <AddIcon />
      </Button>
      <AlertDialog
        title="Confirm: Delete Servant"
        text="Do you really want to delete Servant?"
        open={this.state.confirmOpen}
        handleClose={this.handleAlertDialogClose}
        handleConfirm={this.handleAlertDialogConfirm}
      />
    </Grid>)
  }
}

export default compose(
  withStyles(styles),
  connect(state => state.servants, {
    addServantListener,
  }),
)(ServantsPage)
