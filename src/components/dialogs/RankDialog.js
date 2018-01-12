import React from 'react'
import BaseDialog from './BaseDialog'
import PropTypes from 'prop-types'
import TextInput from '../inputs/TextInput'

class RankDialog extends React.Component {
  state = {
    name: '',
    level: '',
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  render () {
    const { open, handleClose, handleConfirm } = this.props

    return (
      <BaseDialog
        title="Add/Edit Rank"
        desc="For now no Description"
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
        </div>}
      />
    )
  }
}

RankDialog.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default RankDialog
