import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Input, { InputLabel } from 'material-ui/Input'
import Select from 'material-ui/Select'
import { MenuItem } from 'material-ui/Menu'
import { FormControl } from 'material-ui/Form'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
})

const TextInput = ({ id, name, label, options, value, onChange, classes }) => (
  <FormControl fullWidth className={classes.formControl}>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      input={<Input name={name} id={id} />}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      { options && Object.keys(options).map((key) =>
        <MenuItem key={key} value={key}>{options[key].display}</MenuItem>)}
    </Select>
  </FormControl>
)

TextInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.object,
  value: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
}

export default withStyles(styles)(TextInput)
