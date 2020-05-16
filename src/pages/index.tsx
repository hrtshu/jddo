import React, { useState } from 'react'
import Head from 'next/head'
import { Box, Snackbar, makeStyles, createStyles, Theme } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import * as types from '~/types'
import { NewNote, NoteList, AppBar, ModalNoteEditor } from '~/components'

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

const UPDATE_NOTE = gql`
  mutation UpdateNote($note: NoteInput!) {
    updateNote(input: {note: $note}) {
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
  const [noteBeforeChange, setNoteBeforeChange] = useState(new types.Note())
  const [noteAfterChange, setNoteAfterChange] = useState(new types.Note())
  const [readOnlyEditor, setReadOnlyEditor] = useState(false)
  const [openEditor, setOpenEditor] = useState(false)
  const [createNote, { loading: creatingNote, error: noteCreationError }] = useMutation(CREATE_NOTE)
  const [updateNote, { loading: updatingNote, error: noteUpdatingError }] = useMutation(UPDATE_NOTE)
  const { loading: fetchingNotes, error: noteFetchError, data } = useQuery(FETCH_NOTES)
  // TODO noteCreationError, noteUpdatingErrorのハンドリング

  // useQueryで取得したメモデータをtypes.Noteでインスタンス化
  let notes: types.Note[] = data && data.notes ? data.notes.map((n: any) => new types.Note(n)) : []

  const onCreateButtonClick = (note: types.Note) => {
    createNote({ variables: { note } })
    console.log('note created:', note.subject, note.body)
  }

  const onNoteClick = (note: types.Note) => {
    setNoteBeforeChange(note)
    setNoteAfterChange(note)
    setReadOnlyEditor(false)
    setOpenEditor(true)
  }

  const onNoteEditorClose = () => {
    setReadOnlyEditor(true)
    if (!noteBeforeChange.equals(noteAfterChange)) {
      updateNote({ variables: { note: noteAfterChange } })
      console.log('note updated:', noteAfterChange.id, noteAfterChange.subject, noteAfterChange.body)
    }
    setOpenEditor(false)
    setReadOnlyEditor(false)
  }

  const onModalNoteChange = (note: types.Note) => {
    setNoteAfterChange(note)
  }

  return (
    <div className="container">
      <Head>
        <title>Jddo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.root}>
        <ModalNoteEditor
          note={noteAfterChange}
          onNoteChange={onModalNoteChange}
          open={openEditor}
          onClose={onNoteEditorClose}
          readOnly={readOnlyEditor} />

        <AppBar position="fixed" loading={fetchingNotes || creatingNote || updatingNote} />
        
        <Box className={classes.toolbar} /> {/* AppBarはfixedされているのでその分だけ高さを下げる用 */}
        <Box display="flex" justifyContent="center" m={2}>
          <Box width={1}>
            <Box display="flex" justifyContent="center" mb={2}>
              <NewNote width={0.7} maxWidth="400px" mb={2} onCreateButtonClick={onCreateButtonClick} />
            </Box>
            { noteFetchError || fetchingNotes ? "" : <NoteList notes={notes} onNoteClick={onNoteClick} />}
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