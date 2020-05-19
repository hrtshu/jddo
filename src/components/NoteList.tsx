import * as React from 'react'
import { Box, BoxProps, GridList, GridListTile, withWidth, WithWidth, isWidthUp } from '@material-ui/core'
import * as types from '~/types'
import { Note } from '~/components'

type NoteListCoreProps = {
  notes: types.Note[],
  onNoteClick?(note: types.Note): void
}

type NoteListInnnerProps = NoteListCoreProps & WithWidth

// WithWidthのwidthとBoxPropsのwidthが競合しないようにするためのインナークラス
// ただし、NoteListへのBoxPropsはInnnerのBoxには引き継がれない
const NoteListInner = withWidth()((props: NoteListInnnerProps) => {
  const { notes, onNoteClick, width } = props

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
        {notes.map((note, idx) => {
          return (
            <GridListTile key={idx}> {/* TODO keyをnote.idに変える */}
              <Note note={note} onClick={() => onNoteClick && onNoteClick(note)} />
            </GridListTile>
          )
        })}
      </GridList>
    </Box>
  )
})

export type NoteListProps = NoteListCoreProps & BoxProps

export const NoteList = (props: NoteListProps) => {
  const { notes, onNoteClick, ...otherProps } = props

  return (
    <Box {...otherProps}>
      <NoteListInner notes={notes} onNoteClick={onNoteClick} />
    </Box>
  )
}

export default NoteList