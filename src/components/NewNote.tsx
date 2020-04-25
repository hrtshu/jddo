import * as React from 'react'
import {Box, BoxProps, Button } from '@material-ui/core'
import { Note } from '~/components'

export interface NewNoteProps extends BoxProps {}

interface State {}

export class NewNote extends React.Component<NewNoteProps, State> {
  render() {
    return (
      <Box {...this.props}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Note width={1} mb={1} />
          <Button variant="contained" size="small" disableElevation>Add</Button>
        </Box>
      </Box>
    )
  }
}

export default NewNote