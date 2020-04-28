import * as React from 'react'
import { GridList, GridListTile } from '@material-ui/core'
import { Box, BoxProps } from '@material-ui/core'
import * as types from '~/types'
import { Note } from '~/components'

export interface NoteListProps extends BoxProps {
  notes: types.Note[]
}

interface State {}

export class NoteList extends React.Component<NoteListProps, State> {
  render() {
    const { notes, ...otherProps } = this.props
    return (
      <Box {...otherProps}>
        <GridList cols={3} cellHeight="auto">
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
  }
}

export default NoteList