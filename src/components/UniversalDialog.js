import React from 'react'
import Button from 'material-ui/Button'
import PropTypes from 'prop-types'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog'

const UniversalDialog = ({ open, handleClose, handleConfirm, title, desc, child }) => (
  <div>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="dialog-title"
      { ...(desc && { 'aria-describedby': 'dialog-description' }) }
    >
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
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)

UniversalDialog.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  child: PropTypes.object,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleConfirm: PropTypes.func.isRequired,
}

export default UniversalDialog
