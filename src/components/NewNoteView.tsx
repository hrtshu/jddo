import * as React from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Note from '~/components/Note'

interface Props {
}

interface State {}

export default class NewNoteView extends React.Component<Props, State> {
  render() {
    return (
      <Box display="flex" flexDirection="column" alignItems="center">
        <Note />
        <Button variant="contained" size="small" disableElevation>Add</Button>
      </Box>
    )
  }
}
