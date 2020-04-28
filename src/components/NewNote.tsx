import * as React from 'react'
import {Box, BoxProps, Button } from '@material-ui/core'
import * as types from '~/types'
import { Note } from '~/components'

export interface NewNoteProps extends BoxProps {
  onCreateButtonClick?(note: types.Note): void
}

interface State {
  note: types.Note
}

export class NewNote extends React.Component<NewNoteProps, State> {
  constructor(props: NewNoteProps) {
    super(props)
    this.state = {
      note: new types.Note()
    }
  }
  onCreateButtonClick = () => {
    if (!this.state.note.isEmpty()) {
      if (this.props.onCreateButtonClick) {
        this.props.onCreateButtonClick(this.state.note)
        this.setState({
          note: new types.Note()
        })
      }
    }
  }
  render() {
    const { onCreateButtonClick, ...otherProps } = this.props
    return (
      <Box {...otherProps}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Note
            width={1}
            mb={1}
            note={this.state.note}
            onNoteChange={(note: types.Note) => {this.setState({ note })}}
          />
          <Button
            variant="contained"
            size="small"
            disableElevation
            onClick={this.onCreateButtonClick}
          >
            Add
          </Button>
        </Box>
      </Box>
    )
  }
}

export default NewNote