import * as React from 'react'
import TextField from '@material-ui/core/TextField'

interface Props {
}

interface State {
  body: string
}

export default class Note extends React.Component<Props, State> {
  constructor(props: any) {
    super(props)
    this.state = {
      body: ""
    }
  }
  render() {
    return (
      <TextField
        variant="outlined"
        multiline
        rows={5}
        fullWidth
        margin="normal"
        value={this.state.body}
        onChange={this.onChange}
      />
    )
  }
  onChange = e => {
    this.setState({
      body: e.target.value
    })
  }
}
