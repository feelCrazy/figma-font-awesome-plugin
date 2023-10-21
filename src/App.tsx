import { useEffect } from "react"

import Container from "./components/Container"
import Header from "./components/Header"

export default function App() {
  const load = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "pluginLoaded",
        },
      },
      "*"
    )
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <main className='flex flex-col h-full overflow-scroll'>
      <Header />
      <section className='px-4'>
        <Container />
      </section>
    </main>
  )
}
