import React from 'react'
import BaseDialog from './BaseDialog'
import PropTypes from 'prop-types'
import TextInput from '../inputs/TextInput'
import CheckboxInput from '../inputs/CheckboxInput'
import SelectInput from '../inputs/SelectInput'
import FileInput from '../inputs/FileInput'

class ServantDialog extends React.Component {
  constructor (props) {
    super(props)
    if (props.servant) {
      this.state = { servant: { ...props.servant } }
    } else {
      this.state = {
        servant: {
          avatar: '',
          name: '',
          nick: '',
          city: '',
          status: true,
          year: '',
          since: '',
          battleTag: '',
          rank: '',
        },
        avatar: null,
        avatarBinary: null,
      }
    }
  }

  handleChange = prop => event => {
    this.setState({servant: { [prop]: event.target.value }})
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

  onAvaterChange = (e) => {
    const file = e.target.files[0]
    let reader = new FileReader()
    reader.onload = () => {
      this.setState({
        servant: { ...this.state.servant, avatar: file.name },
        avatarBinary: reader.result,
      })
    }
    this.setState({ avatar: file }, () => reader.readAsDataURL(file))
  }

  onAvatarCancel = () => {
    this.setState({
      servant: { ...this.state.servant, avatar: null },
      avatar: null,
      avatarBinary: null,
    })
  }

  getAvatar = () => {
    if (this.state.avatarBinary) {
      return this.state.avatarBinary
    } else if (this.state.servant.avatar) {
      return `http://costs/${this.state.servant.avatar}`
    }
  }

  render () {
    const { open, handleClose, handleConfirm, ranks } = this.props
    return (
      <BaseDialog
        title={this.getTitle()}
        open={open}
        handleClose={handleClose}
        handleConfirm={handleConfirm(this.state.servant)}
        child={<div>
          <FileInput
            onImageChange={this.onAvaterChange}
            onImageCancel={this.onAvatarCancel}
            image={this.getAvatar()}
          />
          <TextInput
            id="name"
            label="Name"
            onChange={this.handleChange('name')}
            value={this.state.servant.name}
          />
          <TextInput
            id="nick"
            label="Nick"
            onChange={this.handleChange('nick')}
            value={this.state.servant.nick}
          />
          <TextInput
            id="city"
            label="City"
            onChange={this.handleChange('city')}
            value={this.state.servant.city}
          />
          <CheckboxInput
            label="Status"
            onChange={this.handleCheckChange('status')}
            value="status"
            checked={this.state.servant.status}
          />
          <TextInput
            id="year"
            label="Year"
            onChange={this.handleChange('year')}
            value={this.state.servant.year}
          />
          <TextInput
            id="from"
            label="In Clan Since"
            onChange={this.handleChange('since')}
            value={this.state.servant.since}
          />
          <TextInput
            id="battleTag"
            label="Battle Tag"
            onChange={this.handleChange('battleTag')}
            value={this.state.servant.battleTag}
          />
          <SelectInput
            id="rank"
            label="Rank"
            options={ranks}
            value={this.state.servant.rank}
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
