import React from 'react'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'
import PropTypes from 'prop-types'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'
import { LinearProgress } from 'material-ui/Progress'

const styles = theme => ({
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
})

class BaseDialog extends React.Component {
  state = {
    disabled: false,
  }

  handleConfirm = () => {
    this.setState({ disabled: true }, () => this.props.handleConfirm())
  }

  render () {
    const { classes, open, handleClose, title, desc, child } = this.props
    const { disabled } = this.state
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="dialog-title"
          { ...(desc && { 'aria-describedby': 'dialog-description' }) }
        >
          { disabled && <LinearProgress className={classes.loader} />}
          <DialogTitle id="dialog-title">{title}</DialogTitle>
          <DialogContent>
            {desc &&
              <DialogContentText id="dialog-description">
                { desc }
              </DialogContentText>
            }
            { child }
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
            <Button
              onClick={this.handleConfirm}
              color="primary" autoFocus disabled={disabled}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

BaseDialog.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  child: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
}

export default withStyles(styles)(BaseDialog)
