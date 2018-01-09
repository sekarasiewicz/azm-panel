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

const TextInput = ({ id, label, value, error, onChange, classes }) => (
  <FormControl fullWidth className={classes.formControl} error={error}>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <Input
      id={id}
      type= 'text'
      value={value}
      onChange={onChange}
    />
    <FormHelperText>{error}</FormHelperText>
  </FormControl>
)

TextInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
}

export default withStyles(styles)(TextInput)
