import * as React from 'react'
import { Box, BoxProps, Card, CardContent, Typography, CardActions, IconButton } from '@material-ui/core'
import * as types from '~/types'
import { Delete as DeleteIcon } from '@material-ui/icons'

export type NoteProps = {
  note: types.Note
} & types.OnNoteClick & types.OnDeleteButtonClick & BoxProps

function convertNewlineToBr(text: string) {
  var regex = /(\n)/g
  return text.split(regex).map(function (line) {
      if (line.match(regex)) {
          return React.createElement('br')
      }
      else {
          return line
      }
  })
}

export const Note = ({ note, onNoteClick, onDeleteButtonClick, ...otherProps }: NoteProps) => {
  return (
    <Box width={1} p={0.15} {...otherProps}>
      <Card>
        <CardContent onClick={() => { onNoteClick && onNoteClick(note) }}>
          <Typography gutterBottom variant="h5" component="h2">
            {note.subject}
          </Typography>
          <Typography variant="body1" component="p">
            {convertNewlineToBr(note.body)}
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton size="small" onClick={() => { onDeleteButtonClick && onDeleteButtonClick(note) }}>
            <DeleteIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Box>
  )
}

export default Note