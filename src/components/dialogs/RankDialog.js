import React from 'react'
import BaseDialog from './BaseDialog'
import PropTypes from 'prop-types'
import TextInput from '../inputs/TextInput'
import { ChromePicker } from 'react-color'

class RankDialog extends React.Component {
  constructor (props) {
    super(props)
    if (props.rank) {
      this.state = {...props.rank}
    } else {
      this.state = {
        name: '',
        level: '',
        color: '',
      }
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  handleChangeComplete = (color) => {
    this.setState({ color: color.hex })
  }

  getTitle = () => {
    if (this.props.rank) {
      return 'Edit Rank'
    }
    return 'Add Rank'
  }

  render () {
    const { open, handleClose, handleConfirm } = this.props

    return (
      <BaseDialog
        title={this.getTitle()}
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm(this.state)}
        child={<div>
          <TextInput
            id="name"
            label="Name"
            onChange={this.handleChange('name')}
            value={this.state.name}
          />
          <TextInput
            id="level"
            label="Level"
            onChange={this.handleChange('level')}
            value={this.state.level}
          />
          <ChromePicker
            color={ this.state.color }
            onChangeComplete={ this.handleChangeComplete }
          />
        </div>}
      />
    )
  }
}

RankDialog.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  rank: PropTypes.object,
}

export default RankDialog
