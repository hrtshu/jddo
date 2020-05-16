import React from 'react'
import Head from 'next/head'
import { Box, Snackbar, makeStyles, createStyles, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import * as types from '~/types'
import { NewNote, NoteList, AppBar } from '~/components'

const FETCH_NOTES = gql`
  query {
    notes {
      id
      subject
      body
    }
  }
`

const CREATE_NOTE = gql`
  mutation CreateNote($note: NoteInput!) {
    createNote(input: {note: $note}) {
      note {
        id
        subject
        body
      }
    }
  }
`

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar
  }),
)

const Home = () => {
  const classes = useStyles()
  const [createNote, { loading: creatingNote, error: noteCreationError }] = useMutation(CREATE_NOTE)
  const { loading: fetchingNotes, error: noteFetchError, data } = useQuery<{ notes: types.Note[] }, {}>(FETCH_NOTES)
  // TODO noteCreationErrorのハンドリング

  const onCreateButtonClick = (note: types.Note) => {
    createNote({ variables: { note } })
    console.log('New note created:', note.subject, note.body)
  }

  return (
    <div className="container">
      <Head>
        <title>Jddo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.root}>
        <AppBar position="fixed" loading={fetchingNotes || creatingNote} />
        
        <Box className={classes.toolbar} /> {/* AppBarはfixedされているのでその分だけ高さを下げる用 */}
        <Box display="flex" justifyContent="center" m={2}>
          <Box width={1}>
            <Box display="flex" justifyContent="center" mb={2}>
              <NewNote width={0.7} maxWidth="400px" mb={2} onCreateButtonClick={onCreateButtonClick} />
            </Box>
            { noteFetchError || fetchingNotes ? "" : <NoteList notes={!data ? [] : data.notes} onNoteClick={note => console.log(note)} />}
            <Snackbar open={!!noteFetchError}>
              <Alert severity="error"> { /* TODO エラー内容に応じて分岐 */ }
                サーバとの接続に失敗しました。リロードしてください。
              </Alert>
            </Snackbar>
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