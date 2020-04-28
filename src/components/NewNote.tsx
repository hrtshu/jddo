import * as React from 'react'
import {Box, BoxProps, Button } from '@material-ui/core'
import { Note } from '~/components'

export interface NewNoteProps extends BoxProps {
  onCreateButtonClick?(subject: string, body: string): void
}

interface State {
  subject: string,
  body: string
}

export class NewNote extends React.Component<NewNoteProps, State> {
  constructor(props: NewNoteProps) {
    super(props)
    this.state = {
      subject: "",
      body: ""
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
            subject={this.state.subject}
            body={this.state.body}
            onSubjectChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({ subject: e.currentTarget.value })}}
            onBodyChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({ body: e.currentTarget.value })}}
          />
          <Button
            variant="contained"
            size="small"
            disableElevation
            onClick={() => onCreateButtonClick(this.state.subject, this.state.body)}
          >
            Add
          </Button>
        </Box>
      </Box>
    )
  }
}

export default NewNote