import React from 'react'
import BaseDialog from './BaseDialog'
import PropTypes from 'prop-types'
import TextInput from '../inputs/TextInput'
import CheckboxInput from '../inputs/CheckboxInput'
import SelectInput from '../inputs/SelectInput'

class ServantDialog extends React.Component {
  state = {
    name: '',
    nick: '',
    city: '',
    status: true,
    year: '',
    from: '',
    battleTag: '',
    rank: '',
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  // Something is wrong with library I have to wrap everything 2 times
  handleCheckChange = name => () => (event, checked) => {
    this.setState({ [name]: checked })
  }

  render () {
    const { open, handleClose, handleConfirm, ranks } = this.props

    return (
      <BaseDialog
        title="Add/Edit Servant"
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
            id="nick"
            label="Nick"
            onChange={this.handleChange('nick')}
            value={this.state.nick}
          />
          <TextInput
            id="city"
            label="City"
            onChange={this.handleChange('city')}
            value={this.state.city}
          />
          <CheckboxInput
            label="Status"
            onChange={this.handleCheckChange('status')}
            value="status"
            checked={this.state.status}
          />
          <TextInput
            id="year"
            label="Year"
            onChange={this.handleChange('year')}
            value={this.state.year}
          />
          <TextInput
            id="from"
            label="In Clan From"
            onChange={this.handleChange('from')}
            value={this.state.from}
          />
          <TextInput
            id="battleTag"
            label="Battle Tag"
            onChange={this.handleChange('battleTag')}
            value={this.state.battleTag}
          />
          <SelectInput
            id="rank"
            label="Rank"
            options={ranks}
            value={this.state.rank}
            onChange={this.handleChange('rank')}
          />
        </div>}
      />
    )
  }
}

ServantDialog.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  ranks: PropTypes.object,
}

export default ServantDialog
