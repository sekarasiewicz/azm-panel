import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import { FormControl, FormHelperText } from 'material-ui/Form'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
})

class TextInput extends React.Component {
  render () {
    const { id, value, error, onChange, classes } = this.props
    return (
      <FormControl className={classes.formControl} error={error}>
        <InputLabel htmlFor={id}>Email</InputLabel>
        <Input
          id={id}
          type= 'text'
          value={value}
          onChange={onChange}
        />
        <FormHelperText>{error}</FormHelperText>
      </FormControl>
    )
  }
}

TextInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
}

export default withStyles(styles)(TextInput)
