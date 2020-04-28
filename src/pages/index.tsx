import React from 'react'
import Head from 'next/head'
import { Box } from '@material-ui/core'
import * as types from '~/types'
import { NewNote, NoteList } from '~/components'

export interface HomeProps {}

interface State {
  notes: types.Note[]
}

export class Home extends React.Component<HomeProps, State> {
  constructor(props: HomeProps) {
    super(props)
    this.state = {
      notes: []
    }
  }
  onCreateButtonClick = (note: types.Note) => {
    this.setState({
      notes: [ note, ...this.state.notes ]
    })
    console.log('New note created:', note.subject, note.body)
  }
  render() {
    return (
      <div className="container">
        <Head>
          <title>Jddo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <main>
          <Box display="flex" justifyContent="center" m={2}>
            <Box width={1} maxWidth="700px">
              <Box display="flex" justifyContent="center">
                <NewNote width={0.7} maxWidth="400px" mb={2} onCreateButtonClick={this.onCreateButtonClick} />
              </Box>
              <NoteList notes={this.state.notes} />
            </Box>
          </Box>
        </main>
  
        <footer>
        </footer>
  
        <style jsx>{`
        `}</style>
  
        <style jsx global>{`
        `}</style>
      </div>
    )
  }
}

export default Home