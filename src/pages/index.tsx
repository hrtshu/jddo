import Head from 'next/head'
import { NewNote, NoteList } from '~/components'
import { Box } from '@material-ui/core'

export default function Home() {
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
