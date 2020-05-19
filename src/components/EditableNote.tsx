import * as React from 'react'
import { Box, BoxProps, TextField, Card, CardContent } from '@material-ui/core'
import * as types from '~/types'

export type EditableNoteProps = {
  note: types.Note
} & types.OnNoteChange & types.ReadOnly & BoxProps

export const EditableNote = ({ note, onNoteChange, readOnly = false, ...otherProps }: EditableNoteProps) => {
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
    <Box width={1} p={0.15} {...otherProps}>
      <Card>
        <CardContent>
          <TextField
            placeholder="Title"
            fullWidth
            value={note.subject}
            onChange={onSubjectChange}
            InputProps={{ readOnly }}
          />
          <TextField
            placeholder="Take a note..."
            multiline
            rows={5}
            fullWidth
            value={note.body}
            onChange={onBodyChange}
            InputProps={{ readOnly }}
          />
        </CardContent>
      </Card>
    </Box>
  )
}

export default EditableNote