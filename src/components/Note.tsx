import * as React from 'react'
import { Box, BoxProps, Card, CardContent, Typography, CardActions, IconButton } from '@material-ui/core'
import * as types from '~/types'
import { Delete as DeleteIcon } from '@material-ui/icons'

export type NoteProps = {
  note: types.Note
} & types.OnDeleteButtonClick & BoxProps

export const Note = ({ note, onDeleteButtonClick, ...otherProps }: NoteProps) => {
  return (
    <Box width={1} p={0.15} {...otherProps}>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {note.subject}
          </Typography>
          <Typography variant="body1" component="p"> {/* TODO 改行が反映されない問題 */}
            {note.body}
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