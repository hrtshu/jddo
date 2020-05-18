import * as React from 'react'
import { Box, BoxProps, TextField } from '@material-ui/core'
import * as types from '~/types'

export type NoteProps = {
  note: types.Note
} & types.OnNoteChange & types.ReadOnly & BoxProps

export const Note = ({ note, onNoteChange, readOnly = false, ...otherProps }: NoteProps) => {
  const onSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onNoteChange) {
      let newNote = note.clone()
      newNote.subject = e.currentTarget.value
      onNoteChange(newNote)
    }
  }
  const onBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onNoteChange) {
      let newNote = note.clone()
      newNote.body = e.currentTarget.value
      onNoteChange(newNote)
    }
  }
  return (
    <Box width={1} border={1} borderColor="primary.main" borderRadius={5} {...otherProps}>
      <TextField
        fullWidth
        value={note.subject}
        onChange={onSubjectChange}
        InputProps={{ readOnly }}
      />
      <TextField
        multiline
        rows={5}
        fullWidth
        value={note.body}
        onChange={onBodyChange}
        InputProps={{ readOnly }}
      />
    </Box>
  )
}

export default Note