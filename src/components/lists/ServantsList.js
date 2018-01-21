import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
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

const styles = theme => ({
  panelHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette.primary[500],
    color: theme.palette.getContrastText(theme.palette.primary[500]),
    height: 50,
  },
  rankHeader: {
    paddingLeft: 10,
  },
  orphans: {
    backgroundColor: 'red',
  },
})

class ServantsList extends React.Component {
  getSecondary = (servant) => {
    if (servant) {
      let text = []
      if (servant.rank) {
        text.push(`Rank: ${this.props.ranks[servant.rank].name}`)
      }
      text.push(`Name: ${servant.name}`)
      return text.join(', ')
    }
    return ''
  }

  getAvatar = (key) => {
    const { servants, avatars, classes } = this.props

    if (servants && servants[key].avatar) {
      if (avatars && avatars[key]) {
        return <Avatar className={classes.avatar} src={avatars[key]} alt="avatar" />
      }
      return <Avatar><p>Loading</p></Avatar>
    }
    return <Avatar><FolderIcon /></Avatar>
  }

  render () {
    const {
      classes, servants, ranks, servantRanks, updateServant, removeServant } = this.props
    const withoutRank = servants ? Object.keys(servants).filter(s => !servants[s].rank) : []
    return (
      <Paper>
        <Typography
          type="headline"
          className={classes.panelHeader}>
          Servants
        </Typography>
        { ranks && Object.keys(ranks).map(rankKey => (
          servantRanks && servantRanks[rankKey] &&
          <div key={rankKey}>
            <h2 className={classes.rankHeader}>{ ranks[rankKey].name }</h2>
            <List dense={false}>
              { servantRanks && Object.keys(servantRanks[rankKey]).map(key => (
                <ListItem button key={key} onClick={updateServant(key)}>
                  <ListItemAvatar>
                    { this.getAvatar(key) }
                  </ListItemAvatar>
                  <ListItemText
                    primary={servants[key].nick}
                    secondary={this.getSecondary(servants[key])}
                  />
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete"
                      onClick={removeServant(key)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        ))}
        { withoutRank.length > 0 &&
        <div>
          <h2 className={classes.rankHeader}>Without Rank</h2>
          <List dense={false}>
            { withoutRank.map(key => (
              <ListItem button key={key} onClick={updateServant(key)} className={classes.orphans}>
                <ListItemAvatar>
                  <Avatar>
                    <FolderIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={servants[key].nick}
                  secondary={this.getSecondary(servants[key])}
                />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Delete"
                    onClick={removeServant(key)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            )) }
          </List>
        </div>
        }
      </Paper>
    )
  }
}

ServantsList.propTypes = {
  classes: PropTypes.object.isRequired,
  updateServant: PropTypes.func.isRequired,
  removeServant: PropTypes.func.isRequired,
  servants: PropTypes.object,
  avatars: PropTypes.object,
  ranks: PropTypes.object,
  servantRanks: PropTypes.object,
}

export default withStyles(styles)(ServantsList)
