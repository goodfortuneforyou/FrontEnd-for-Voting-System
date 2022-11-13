import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

import styles from "../styles/Home.module.css";
import Voting from "../components/Voting";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Decentralized Voting System</title>
        <meta name="description" content="Crud contracat" />
      </Head>
      <Header />
      <Voting />
      <Footer />
    </div>
  );
}
