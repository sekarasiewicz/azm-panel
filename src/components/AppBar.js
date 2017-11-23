import React from 'react'
import AppBar from 'material-ui/AppBar'

const DefaultLayout = ({ children }) => (
  <div>
    <AppBar
      title="Title"
    />
    {children}
  </div>
)

export default DefaultLayout
