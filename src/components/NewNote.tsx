import * as React from 'react'
import {Box, BoxProps, Button } from '@material-ui/core'
import * as types from '~/types'
import { Note } from '~/components'

export type NewNoteProps = types.NoteEditor & BoxProps

export const NewNote = ({ note, onComplete, onNoteChange, readOnly = false, ...boxProps }: NewNoteProps) => {
  return (
    <Box {...boxProps}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Note
          width={1}
          mb={1}
          note={note}
          onNoteChange={onNoteChange} />
        <Button
          variant="contained"
          size="small"
          disableElevation
          onClick={() => {onComplete && onComplete()}}>
            Add
        </Button>
      </Box>
    </Box>
  )
}

export default NewNote