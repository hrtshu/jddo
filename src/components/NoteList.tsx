import * as React from 'react'
import { Box, BoxProps, GridList, GridListTile, withWidth, WithWidth, isWidthUp } from '@material-ui/core'
import * as types from '~/types'
import { Note } from '~/components'

export type NoteListProps = {
  notes: types.Note[]
} & BoxProps & WithWidth

const NoteList = withWidth()((props: NoteListProps) => {
  const { notes, width, ...otherProps } = props

  const getCols = () => {
    switch (true) {
      case isWidthUp('xl', width):
        return 6
      case isWidthUp('lg', width):
        return 5
      case isWidthUp('md', width):
        return 4
      case isWidthUp('sm', width):
        return 3
      case isWidthUp('xs', width):
        return 2
      default:
        return 1
    }
  }

  return (
    <Box {...otherProps}>
      <GridList cols={getCols()} cellHeight="auto" spacing={15}>
        {notes.map((note, idx) => {
          return (
            <GridListTile key={idx}>
              <Note note={note} />
            </GridListTile>
          )
        })}
      </GridList>
    </Box>
  )
})

export { NoteList }
export default NoteList