import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { Box, BoxProps } from '@material-ui/core'

export interface NoteProps extends BoxProps {
  subject: string,
  body: string,
  onSubjectChange?(event: React.ChangeEvent<HTMLInputElement>): void,
  onBodyChange?(event: React.ChangeEvent<HTMLInputElement>): void
}

interface State {}

export class Note extends React.Component<NoteProps, State> {
  render() {
    const { subject, body, onSubjectChange, onBodyChange, ...otherProps } = this.props
    return (
      <Box width={1} border={1} borderColor="primary.main" borderRadius={5} {...otherProps}>
        <TextField
          fullWidth
          value={subject}
          onChange={onSubjectChange}
        />
        <TextField
          multiline
          rows={5}
          fullWidth
          value={body}
          onChange={onBodyChange}
        />
      </Box>
    )
  }
}

export default Note