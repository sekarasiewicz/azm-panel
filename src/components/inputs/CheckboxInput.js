import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import {
  FormGroup,
  FormControlLabel,
} from 'material-ui/Form'
import Checkbox from 'material-ui/Checkbox'

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
  },
})

const CheckboxInput = ({ label, checked, value, onChange, classes }) => (
  <FormGroup>
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange(value)}
          value={value}
        />
      }
      label={label}
    />
  </FormGroup>
)

CheckboxInput.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  value: PropTypes.string,
}

export default withStyles(styles)(CheckboxInput)
