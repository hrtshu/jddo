import * as React from 'react'
import { Box, BoxProps, GridList, GridListTile, withWidth, WithWidth, isWidthUp } from '@material-ui/core'
import * as types from '~/types'
import { Note } from '~/components'

type NoteListCoreProps = {
  notes: types.Note[]
} & types.OnNoteClick & types.OnDeleteButtonClick

type NoteListInnnerProps = NoteListCoreProps & WithWidth

// WithWidthのwidthとBoxPropsのwidthが競合しないようにするためのインナークラス
// ただし、NoteListへのBoxPropsはInnnerのBoxには引き継がれない
const NoteListInner = withWidth()(({ notes, onNoteClick, onDeleteButtonClick, width }: NoteListInnnerProps) => {

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
    <Box>
      <GridList cols={getCols()} cellHeight="auto" spacing={15}>
        {notes.map(note => {
          return (
            <GridListTile key={note.id}>
              <Note note={note} onNoteClick={onNoteClick} onDeleteButtonClick={onDeleteButtonClick} />
            </GridListTile>
          )
        })}
      </GridList>
    </Box>
  )
})

export type NoteListProps = NoteListCoreProps & BoxProps

export const NoteList = (props: NoteListProps) => {
  const { notes, onNoteClick, onDeleteButtonClick, ...otherProps } = props

  return (
    <Box {...otherProps}>
      <NoteListInner notes={notes} onNoteClick={onNoteClick} onDeleteButtonClick={onDeleteButtonClick} />
    </Box>
  )
}

export default NoteList