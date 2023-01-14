import { useState } from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'

import Flow from 'components/Flow'
import Nav from 'components/Nav'

import functions from '../constants/functions.json'

const Home: NextPage = () => {
  const [selectedPointer, setSelectedPointer] = useState('')

  return (
    <div className="h-full border-2 flex flex-col">
      <Head>
        <title>Disassembly Explorer</title>
        <meta name="description" content="Displays the control flow of disassemled functions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="h-[40px] flex items-center border-b-[1px] border-b-[#eee] px-4">Disassembly Explorer</header>
      <div className="h-[calc(100%-40px)] border-2 flex overflow-hidden">
        <Nav functions={functions} selectedPointer={selectedPointer} setSelectedPointer={setSelectedPointer} />
        <Flow selectedPointer={selectedPointer} />
      </div>
    </div>
  )
}

export default Home
