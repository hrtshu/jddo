import React from 'react'
import Head from 'next/head'
import { Box } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import * as types from '~/types'
import { NewNote, NoteList } from '~/components'

export interface HomeProps {}

const Home = (props: HomeProps) => {
  const onCreateButtonClick = (note: types.Note) => {
    this.setState({
      notes: [ note, ...this.state.notes ]
    })
    console.log('New note created:', note.subject, note.body)
  }
  
  const query = gql`
    query {
      notes {
        id,
        subject,
        body
      }
    }
  `
  const {loading, error, data } = useQuery(query)
  console.log(data)

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
              <NewNote width={0.7} maxWidth="400px" mb={2} onCreateButtonClick={onCreateButtonClick} />
            </Box>
            { loading ? 'Loading...' : <NoteList notes={data.notes} /> }
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

export default Home