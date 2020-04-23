import Head from 'next/head'
import NewNoteView from '~/components/NewNoteView.tsx'

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Jddo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <NewNoteView />
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
