import React from 'react'
import Head from 'next/head'
import { Box } from '@material-ui/core'
import * as types from '~/types'
import { NewNote, NoteList } from '~/components'

export interface HomeProps {}

interface State {}

export class Home extends React.Component<HomeProps, State> {
  onCreateButtonClick = (note: types.Note) => {
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
              <NoteList />
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