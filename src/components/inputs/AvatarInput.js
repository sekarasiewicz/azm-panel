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
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  avatarWrapper: {
    position: 'relative',
  },
  closeBtn: {
    color: 'red',
    position: 'absolute',
    top: 0,
    right: 0,
    margin: 0,
    cursor: 'pointer',
  },
})

class AvatarInput extends React.Component {
  state = {
    image: null,
  }

  getAvatar = () => {
    if (this.state.image) {
      return this.state.image
    } else if (this.props.image) {
      return this.props.image
    }
  }

  onImageChange = (e) => {
    const file = e.target.files[0]
    this.props.onImageChange(file)

    let reader = new FileReader()
    reader.onload = () => {
      this.setState({
        image: reader.result,
      })
    }
    reader.readAsDataURL(file)
  }

  onImageCancel = () => {
    this.setState({image: null}, () => this.props.onImageCancel())
  }

  render () {
    const { classes } = this.props
    const avatar = this.getAvatar()
    return (
      <div className={classes.wrapper}>
        <Button variant="raised"
          color="primary"
          component='label'
        >
          Avatar
          <input type="file" style={{ display: 'none' }} onChange={this.onImageChange} />
        </Button>
        <div className={classes.avatarWrapper}>
          { avatar && <span className={classes.closeBtn} onClick={this.onImageCancel}>X</span> }
          <Avatar className={classes.avatar} src={avatar} alt="avatar" />
        </div>
      </div>
    )
  }
}

AvatarInput.propTypes = {
  onImageChange: PropTypes.func.isRequired,
  onImageCancel: PropTypes.func.isRequired,
  image: PropTypes.string,
}

export default withStyles(styles)(AvatarInput)
