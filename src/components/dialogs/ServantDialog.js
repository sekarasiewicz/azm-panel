import React from 'react'
import BaseDialog from './BaseDialog'
import PropTypes from 'prop-types'
import TextInput from '../inputs/TextInput'
import CheckboxInput from '../inputs/CheckboxInput'
import SelectInput from '../inputs/SelectInput'

class ServantDialog extends React.Component {
  constructor (props) {
    super(props)
    if (props.servant) {
      this.state = {...props.servant}
    } else {
      this.state = {
        name: '',
        nick: '',
        city: '',
        status: true,
        year: '',
        since: '',
        battleTag: '',
        rank: '',
      }
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  // Something is wrong with library I have to wrap everything 2 times
  handleCheckChange = name => () => (event, checked) => {
    this.setState({ [name]: checked })
  }

  getTitle = () => {
    if (this.props.servant) {
      return 'Edit Servant'
    }
    return 'Add Servant'
  }

  render () {
    const { open, handleClose, handleConfirm, ranks } = this.props

    return (
      <BaseDialog
        title={this.getTitle()}
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
            label="In Clan Since"
            onChange={this.handleChange('since')}
            value={this.state.since}
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
  servant: PropTypes.object,
}

export default ServantDialog
