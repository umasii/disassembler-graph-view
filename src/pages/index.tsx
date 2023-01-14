import { useState } from 'react'

import type { NextPage } from 'next'
import Head from 'next/head'

import Flow from 'components/Flow'

import styles from '../styles/Home.module.css'
import Nav from 'components/Nav'

import branches from '../constants/branches.json'
import functions from '../constants/functions.json'

const Home: NextPage = () => {
  const [selectedPointer, setSelectedPointer] = useState('')

  return (
    <div className={styles.container}>
      <Head>
        <title>Disassembly Explorer</title>
        <meta name="description" content="Displays the control flow of disassemled functions" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>Disassembly Explorer</header>
      <div className={styles.content}>
        <Nav functions={functions} selectedPointer={selectedPointer} setSelectedPointer={setSelectedPointer} />
        <Flow />
      </div>
    </div>
  )
}

export default Home
