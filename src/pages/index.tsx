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
const DELETE_NOTE = gql`
  mutation DeleteNote($id: ID) {
    deleteNote(input: {id: $id}) {
      errors
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

  // メモ作成ロジッのステート
  const [newNote, setNewNote] = useState(new types.Note())
  const [readOnlyNewNote, setReadOnlyNewNote] = useState(false)
  // メモ更新ロジックのステート
  const [noteBeforeChange, setNoteBeforeChange] = useState(new types.Note())
  const [noteAfterChange, setNoteAfterChange] = useState(new types.Note())
  const [openEditor, setOpenEditor] = useState(false)
  const [readOnlyEditor, setReadOnlyEditor] = useState(false)
  // その他のステート
  const [error, setError] = useState<string | undefined>(undefined) // 主にcreateNoteとupdateNoteのエラー処理用
  // GraphQL
  const { loading: fetchingNotes, error: noteFetchError, data, refetch: refetchNotes } = useQuery(FETCH_NOTES)
  const [createNote, { loading: creatingNote }] = useMutation(CREATE_NOTE)
  const [updateNote, { loading: updatingNote }] = useMutation(UPDATE_NOTE)
  const [deleteNote, { loading: deletingNote }] = useMutation(DELETE_NOTE)

  // useQueryで取得したメモデータをtypes.Noteでインスタンス化
  const notes: types.Note[] = data && data.notes ? data.notes.map((n: any) => new types.Note(n)) : []
  // メモの順序を反転
  notes.reverse() // TODO クライアント側のここでこの方法でやるのがベストか？

  // メモ作成ロジックのコールバック用の関数
  const onNewNoteChange = (note: types.Note) => {
    setNewNote(note)
  }
  const onCreateButtonClick = async () => {
    setReadOnlyNewNote(true)
    setError(undefined)
    if (!newNote.isEmpty()) {
      try {
        const res = await createNote({ variables: { note: newNote } })
        if (res && !res.errors) {
          console.log('note created:', newNote.subject, newNote.body)
          setNewNote(new types.Note())
          await refetchNotes()
        } else {
          setError("メモの作成に失敗しました。再度試してください。")
        }
      } catch (e) {
        setError("メモの作成に失敗しました。再度試してください。")
      }
    }
    setReadOnlyNewNote(false)
  }
  // メモ更新ロジックのコールバック用の関数
  const onNoteClick = (note: types.Note) => {
    setNoteBeforeChange(note)
    setNoteAfterChange(note)
    setReadOnlyEditor(false)
    setOpenEditor(true)
  }
  const onModalNoteChange = (note: types.Note) => {
    setNoteAfterChange(note)
  }
  const onNoteEditorClose = async () => {
    setReadOnlyEditor(true)
    setError(undefined)
    if (!noteBeforeChange.equals(noteAfterChange)) {
      try {
        const res = await updateNote({ variables: { note: noteAfterChange } })
        if (res && !res.errors) {
          console.log('note updated:', noteAfterChange.id, noteAfterChange.subject, noteAfterChange.body)
          setOpenEditor(false)
        } else {
          setError("メモの更新に失敗しました。再度試してください。")
        }
      } catch (e) {
        setError("メモの更新に失敗しました。再度試してください。")
      }
    } else {
      setOpenEditor(false)
    }
    setReadOnlyEditor(false)
  }
  // メモ削除ロジックのコールバック用の関数
  const onDeleteButtonClick = async (note: types.Note) => {
    try {
      const res = await deleteNote({ variables: { id: note.id } })
      if (res && !res.errors) {
        console.log("note deleted:", note.id)
        await refetchNotes()
      } else {
        setError("メモの削除に失敗しました。再度試してください。")
      }
    } catch (e) {
      setError("メモの削除に失敗しました。再度試してください。")
    }
  }
  // computed的な関数
  const loading = () => {
    return fetchingNotes || creatingNote || updatingNote || deletingNote
  }
  const fetchedNotes = () => {
    return !noteFetchError && !fetchingNotes
  }
  const errorOccurred = () => {
    return !!noteFetchError || !!error
  }
  const errorMessage = (): string => {
    switch (true) {
      case error !== undefined:
        return error as string; // errorの型はstring | undefinedだが、すぐ上でerrorがundefinedでないことを判定しているためここでは必ずstringとなる
      case !!noteFetchError:
        return "サーバからのメモデータの取得に失敗しました。リロードしてください。"
    }
    return ""
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
          onComplete={onNoteEditorClose}
          readOnly={readOnlyEditor} />

        <AppBar position="fixed" loading={loading()} />
        
        <Box className={classes.toolbar} /> {/* AppBarはfixedされているのでその分だけ高さを下げる用 */}
        <Box display="flex" justifyContent="center" m={2}>
          <Box width={1}>
            <Box display="flex" justifyContent="center" mb={2}>
              <NewNote
                width={0.7}
                maxWidth="400px" // レスポンシブにする
                mb={2}
                note={newNote}
                onComplete={onCreateButtonClick}
                onNoteChange={onNewNoteChange}
                readOnly={readOnlyNewNote} />
            </Box>
            { fetchedNotes() ? <NoteList notes={notes} onNoteClick={onNoteClick} onDeleteButtonClick={onDeleteButtonClick} /> : "" }
            <Snackbar open={errorOccurred()}>
              <Alert severity="error">
                { errorMessage() }
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