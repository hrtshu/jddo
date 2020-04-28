import * as React from 'react'
import { GridList, GridListTile } from '@material-ui/core'
import { Box, BoxProps } from '@material-ui/core'
import { Note } from '~/components'

export interface NoteListProps extends BoxProps {}

interface State {}

export class NoteList extends React.Component<NoteListProps, State> {
  render() {
    const { ...otherProps } = this.props
    return (
      <Box {...otherProps}>
        <GridList cols={3} cellHeight="auto">
          {[0, 1, 2, 3, 4].map(x => {
            return (
              <GridListTile key={x}>
                <Note note={{subject: "", body: ""}} />
              </GridListTile>
            )
          })}
        </GridList>
      </Box>
    )
  }
}

export default NoteList