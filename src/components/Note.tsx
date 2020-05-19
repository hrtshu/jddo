import * as React from 'react'
import { Box, BoxProps, Card, CardContent, Typography } from '@material-ui/core'
import * as types from '~/types'

export type NoteProps = {
  note: types.Note
} & BoxProps

export const Note = ({ note, ...otherProps }: NoteProps) => {
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
      </Card>
    </Box>
  )
}

export default Note