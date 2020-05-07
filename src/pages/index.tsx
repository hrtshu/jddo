import React from 'react'
import Head from 'next/head'
import { Box, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import * as types from '~/types'
import { NewNote, NoteList } from '~/components'

export interface HomeProps {}
  
const FETCH_NOTES = gql`
  query {
    notes {
      id,
      subject,
      body
    }
  }
`

const CREATE_NOTE = gql`
  mutation CreateNote($subject: String!, $body: String!) {
    createNote(input: {subject: $subject, body: $body}) {
      note {
        id
        subject
        body
      }
    }
  }
`

const Home = (props: HomeProps) => {
  const onCreateButtonClick = (note: types.Note) => {
    createNote({ variables: { subject: note.subject, body: note.body } })
    console.log('New note created:', note.subject, note.body)
  }
  
  const [createNote, res] = useMutation(CREATE_NOTE)
  const { loading, error, data } = useQuery(FETCH_NOTES)
  // TODO resのloadingやerrorのハンドリング

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
            <Snackbar open={!!error}>
              <Alert severity="error">{ /* TODO エラー内容に応じて分岐 */ }
                サーバとの接続に失敗しました。リロードしてください。
              </Alert>
            </Snackbar>
            { error ? "" : (loading ? 'Loading...' : <NoteList notes={data.notes} />) }
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