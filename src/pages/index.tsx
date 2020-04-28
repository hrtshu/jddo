import React from 'react'
import Head from 'next/head'
import { Box } from '@material-ui/core'
import { NewNote, NoteList } from '~/components'

export interface HomeProps {}

interface State {}

export class Home extends React.Component<HomeProps, State> {
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
                <NewNote width={0.7} maxWidth="400px" mb={2} onCreateButtonClick={(subject: string, body: string) => {console.log('New note created:', subject, body)}} />
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