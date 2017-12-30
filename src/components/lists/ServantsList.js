import React from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
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
})

const ServantsList = ({classes, servants, removeServant}) => (
  <Paper>
    <Typography
      type="headline"
      className={classes.panelHeader}>
      Servants
    </Typography>
    <List dense={false}>
      {servants && Object.keys(servants).map(key => (
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
              onClick={removeServant(key)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  </Paper>
)

ServantsList.propTypes = {
  classes: PropTypes.object.isRequired,
  servants: PropTypes.object.isRequired,
  removeServant: PropTypes.func.isRequired,
}

export default compose(
  withStyles(styles),
  connect(state => state.servants),
)(ServantsList)
