import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { Box, BoxProps } from '@material-ui/core'
import * as types from '~/types'

export type NoteProps = {
  note: types.Note
} & types.OnNoteChange & types.ReadOnly & BoxProps

interface State {}

export class Note extends React.Component<NoteProps, State> {
  static defaultProps = {
    readOnly: false
  }
  onSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onNoteChange) {
      let newNote = this.props.note.clone()
      newNote.subject = e.currentTarget.value
      this.props.onNoteChange(newNote)
    }
  }
  onBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (this.props.onNoteChange) {
      let newNote = this.props.note.clone()
      newNote.body = e.currentTarget.value
      this.props.onNoteChange(newNote)
    }
  }
  render() {
    const { note, onNoteChange, readOnly, ...otherProps } = this.props
    return (
      <Box width={1} border={1} borderColor="primary.main" borderRadius={5} {...otherProps}>
        <TextField
          fullWidth
          value={note.subject}
          onChange={this.onSubjectChange}
          InputProps={{ readOnly }}
        />
        <TextField
          multiline
          rows={5}
          fullWidth
          value={note.body}
          onChange={this.onBodyChange}
          InputProps={{ readOnly }}
        />
      </Box>
    )
  }
}

export default Note