import React from 'react'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'

// Maybe keep initialize logic here ?
const DefaultLayout = ({ children }) => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
            Słudzy Azmodana
        </Typography>
      </Toolbar>
    </AppBar>
    <Button raised color="primary">Primary</Button>
    {children}
  </div>
)

export default DefaultLayout
