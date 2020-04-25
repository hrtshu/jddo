import Head from 'next/head'
import { NewNote } from '~/components'
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
          <Box width={1} maxWidth="500px">
            <NewNote />
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
