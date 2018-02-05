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
import DeleteIcon from 'material-ui-icons/Delete'

const styles = (theme, uc) => {
  console.log(theme, uc)
  return ({
    panelHeader: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.primary[500],
      color: theme.palette.getContrastText(theme.palette.primary[500]),
      height: 50,
    },
    paper: {
      backgroundColor: '#ddd',
    },
    avatar: {
      width: '100%',
      height: '100%',
    },
  })
}

class RanksList extends React.Component {
  getBackgroundColor = (rankKey) => {
    if (this.props.ranks) {
      const rankColor = this.props.ranks[rankKey].color
      return rankColor && {
        backgroundColor: rankColor,
      }
    }
  }

  render () {
    const {classes, ranks, updateRank, removeRank} = this.props
    return (
      <Paper className={classes.paper}>
        <Typography
          type="headline"
          className={classes.panelHeader}>
          Ranks
        </Typography>
        <List dense={false}>
          {ranks && Object.keys(ranks).map(key => (
            <ListItem
              button
              key={key}
              onClick={updateRank(key)}
            >
              <ListItemAvatar>
                <Avatar>
                  <div className={classes.avatar} style={this.getBackgroundColor(key)}>&nbsp;</div>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={ranks[key].name}
                secondary={`level: ${ranks[key].level}`}
              />
              <ListItemSecondaryAction>
                <IconButton aria-label="Delete"
                  onClick={removeRank(key)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    )
  }
}

RanksList.propTypes = {
  classes: PropTypes.object.isRequired,
  updateRank: PropTypes.func.isRequired,
  removeRank: PropTypes.func.isRequired,
  ranks: PropTypes.object,
}

export default withStyles(styles)(RanksList)
