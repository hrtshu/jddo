import * as React from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

interface Props {
}

interface State {}

export default class NewNoteView extends React.Component<Props, State> {
  render() {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <TextField variant="outlined" multiline rows={5} fullWidth margin="normal" />
        <Button variant="contained" size="small" disableElevation>Add</Button>
      </Box>
    )
  }
}
