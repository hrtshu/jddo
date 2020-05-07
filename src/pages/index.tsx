import React from 'react'
import Head from 'next/head'
import { Box, Snackbar, CircularProgress, AppBar, Toolbar, IconButton, Typography, makeStyles, createStyles, Theme, CssBaseline } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { Menu as MenuIcon, Done as DoneIcon } from '@material-ui/icons'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import * as types from '~/types'
import { NewNote, NoteList } from '~/components'
  
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
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar
  }),
)

const Home = () => {
  const onCreateButtonClick = (note: types.Note) => {
    createNote({ variables: { subject: note.subject, body: note.body } })
    console.log('New note created:', note.subject, note.body)
  }
  
  const classes = useStyles();
  const [createNote, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_NOTE)
  const { loading: queryLoading, error: queryError, data } = useQuery(FETCH_NOTES)
  // TODO mutationErrorのハンドリング

  return (
    <div className="container">
      <Head>
        <title>Jddo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              JDDO
            </Typography>
            { queryLoading || mutationLoading ? <CircularProgress size={30} color="secondary" /> : <DoneIcon /> }
          </Toolbar>
        </AppBar>
        
        <Box className={classes.toolbar} /> {/* AppBarはfixedされているのでその分だけ高さを下げる用 */}
        <Box display="flex" justifyContent="center" m={2}>
          <Box width={1}>
            <Box display="flex" justifyContent="center" mb={2}>
              <NewNote width={0.7} maxWidth="400px" mb={2} onCreateButtonClick={onCreateButtonClick} />
            </Box>
            <Snackbar open={!!queryError}>
              <Alert severity="error"> { /* TODO エラー内容に応じて分岐 */ }
                サーバとの接続に失敗しました。リロードしてください。
              </Alert>
            </Snackbar>
            { queryError || queryLoading ? "" : <NoteList notes={data.notes} /> }
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