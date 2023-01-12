import type { NextPage } from "next";
import Head from "next/head";

import Flow from "components/Flow";

import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Disassembly Explorer</title>
        <meta
          name="description"
          content="Displays the control flow of disassemled functions"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>Disassembly Explorer</header>
      <Flow />
    </div>
  );
};

export default Home;
