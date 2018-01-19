import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  wrapper: {
    height: '80',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  closeBtn: {
    color: 'red',
    position: 'absolute',
    top: 0,
    margin: 0,
    cursor: 'pointer',
  },
})

const FileInput = ({ classes, image, onImageChange, onImageCancel }) => (
  <div className={classes.wrapper}>
    { image && <span className={classes.closeBtn} onClick={onImageCancel}>X</span> }
    <Avatar className={classes.avatar} src={image} alt="avatar" />
    <Button raised
      component='label'
    >
      Upload Avatar
      <input type="file" style={{ display: 'none' }} onChange={onImageChange} />
    </Button>
  </div>
)

FileInput.propTypes = {
  onImageChange: PropTypes.func.isRequired,
  onImageCancel: PropTypes.func.isRequired,
  image: PropTypes.string,
}

export default withStyles(styles)(FileInput)
