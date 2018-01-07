import React from 'react'
import BaseDialog from './BaseDialog'
import PropTypes from 'prop-types'
import TextInput from '../inputs/TextInput'

class ServantDialog extends React.Component {
  state = {
    name: '',
    nick: '',
    status: true,
    year: '',
    from: '',
    battleTag: '',
    rank: '',
    ranks: {
      founders: true,
    },
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  render () {
    const { open, handleClose, handleConfirm, servant } = this.props
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
            onChange={this.handleChange('name')}
            value={servant && servant.name}
          /></div>}
      />
    )
  }
}

ServantDialog.propTypes = {
  handleConfirm: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
}

export default ServantDialog
