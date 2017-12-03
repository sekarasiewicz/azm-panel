import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Visibility from 'material-ui-icons/Visibility'
import VisibilityOff from 'material-ui-icons/VisibilityOff'
import IconButton from 'material-ui/IconButton'
import { FormControl, FormHelperText } from 'material-ui/Form'
import Input, { InputLabel, InputAdornment } from 'material-ui/Input'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
})

class PasswordInput extends React.Component {
  state = {
    showPassword: false,
  }

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  handleMouseDownPassword = event => {
    event.preventDefault()
  }

  render () {
    const { id, error, value, onChange, classes } = this.props
    return (
      <FormControl className={classes.formControl} error={error}>
        <InputLabel htmlFor={id}>Password</InputLabel>
        <Input
          id={id}
          type={this.state.showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                onClick={this.handleClickShowPasssword}
                onMouseDown={this.handleMouseDownPassword}
              >
                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText>{error && error}</FormHelperText>
      </FormControl>
    )
  }
}

PasswordInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
}

export default withStyles(styles)(PasswordInput)
