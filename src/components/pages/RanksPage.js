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
import {
  addRankListener,
  saveRank,
  deleteRank,
} from '../../reducers/ranks/actions'

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
  constructor (props) {
    super(props)
    this.props.addRankListener()
  }

  newRank = () => {
    saveRank('Servant', {
      display: 'Something',
      level: 100,
    })
  }

  removeRank = key => () => {
    deleteRank(key)
  }

  render () {
    const { classes, ranks } = this.props
    const rankObjKeys = ranks && Object.keys(ranks)
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
            Ranks
          </Typography>
          <div>
            <List dense={false}>
              {rankObjKeys && rankObjKeys.map(key => (
                <ListItem button key={key}>
                  <ListItemAvatar>
                    <Avatar>
                      <FolderIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={ranks[key].display}
                    secondary={key}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={this.removeRank(key)}>
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
        onClick={this.newRank}
      >
        <AddIcon />
      </Button>
    </Grid>)
  }
}

export default compose(
  withStyles(styles),
  connect(state => state.ranks, {
    addRankListener,
  }),
)(RanksPage)
