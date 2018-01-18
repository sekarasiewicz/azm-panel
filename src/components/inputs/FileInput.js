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

class FileInput extends React.Component {
  state = {
    imgData: null,
  }

  onChange = (e) => {
    let reader = new FileReader()
    reader.onload = () => {
      this.setState({ imgData: reader.result })
    }
    reader.readAsDataURL(e.target.files[0])
  }

  onImgCancel = () => {
    this.setState({imgData: null})
  }

  getImg = () => {
    if (this.state.imgData) {
      return this.state.imgData
    } else if (this.props.avatar) {
      return `http://costs/${this.props.avatar}`
    }
  }

  render () {
    const { classes } = this.props
    const img = this.getImg()
    return (
      <div className={classes.wrapper}>
        { img && <span className={classes.closeBtn} onClick={this.onImgCancel}>X</span> }
        <Avatar className={classes.avatar} src={img} alt="avatar" />
        <Button raised
          component='label' // <-- Just add me!
        >
          Upload Avatar
          <input type="file" style={{ display: 'none' }} onChange={this.onChange} />
        </Button>
      </div>
    )
  }
}

FileInput.propTypes = {
  // onFileChange: PropTypes.func.isRequired,
  avatar: PropTypes.string,
}

export default withStyles(styles)(FileInput)
