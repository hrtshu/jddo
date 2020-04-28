import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { Box, BoxProps } from '@material-ui/core'
import * as types from '~/types'

export interface NoteProps extends BoxProps {
  note: types.Note,
  onNoteChange?(note: types.Note): void
}

interface State {}

export class Note extends React.Component<NoteProps, State> {
  onSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onNoteChange) {
      this.props.onNoteChange({ ...this.props.note, subject: e.currentTarget.value })
    }
  }
  onBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onNoteChange) {
      this.props.onNoteChange({ ...this.props.note, body: e.currentTarget.value })
    }
  }
  render() {
    const { note, onNoteChange, ...otherProps } = this.props
    return (
      <Box width={1} border={1} borderColor="primary.main" borderRadius={5} {...otherProps}>
        <TextField
          fullWidth
          value={note.subject}
          onChange={this.onSubjectChange}
        />
        <TextField
          multiline
          rows={5}
          fullWidth
          value={note.body}
          onChange={this.onBodyChange}
        />
      </Box>
    )
  }
}

export default Note