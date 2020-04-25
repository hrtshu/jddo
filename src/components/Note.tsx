import * as React from 'react'
import TextField from '@material-ui/core/TextField'
import { Box, BoxProps } from '@material-ui/core'

export interface NoteProps extends BoxProps {}

interface State {
  body: string
}

export class Note extends React.Component<NoteProps, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      body: ""
    }
  }
  render() {
    return (
      <Box width={1} {...this.props}>
        <TextField
          variant="outlined"
          multiline
          rows={5}
          fullWidth
          value={this.state.body}
          onChange={this.onChange}
        />
      </Box>
    )
  }
  onChange = e => {
    this.setState({
      body: e.target.value
    })
  }
}

export default Note